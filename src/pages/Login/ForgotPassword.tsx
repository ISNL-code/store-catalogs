import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useUserApi } from 'api/useUserApi';
import Loader from 'components/atoms/Loader/Loader';
import ModalWindow from 'components/atoms/ModalWindow/ModalWindow';
import { useFormik } from 'formik';
import emailFormValidations from 'Validation/emailFormValidations';
import { STORE_CONFIG } from 'constants/stores_config';

export default function ForgotPasswordForm({ string, close, setOpenModalType }) {
    const { STORE_CODE } = STORE_CONFIG;
    const [successReset, setSuccessReset] = useState(false);
    const [username, setUsername] = useState('');
    const [error, setError] = useState(false);

    const { mutateAsync: resetPassword, isLoading } = useUserApi().useResetCustomerPassword();

    const formik = useFormik({
        initialValues: { username: '' },
        validationSchema: emailFormValidations,
        onSubmit: values => {
            resetPassword({ username: values.username, storeCode: STORE_CODE })
                .then(() => {
                    setSuccessReset(true);
                })
                .catch(() => setError(true));
        },
    });

    useEffect(() => {
        formik.setValues({ username });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    if (successReset)
        return (
            <>
                {isLoading && <Loader />}
                <ModalWindow
                    type={'success'}
                    title={string?.sended}
                    text={string?.an_email_with_a_link_has_been_sent_to_your_email}
                    closeAction={() => {
                        close();
                    }}
                >
                    <Box mt={2} pb={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button variant="contained" onClick={() => setOpenModalType('login')}>
                            {string?.login}
                        </Button>
                    </Box>
                </ModalWindow>
            </>
        );

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                formik.handleSubmit();
            }}
        >
            {isLoading && <Loader />}
            <ModalWindow
                type={'warning'}
                title={string?.forgot_password}
                text={
                    string?.please_enter_your_email_address_you_will_receive_a_link_to_create_a_new_password_via_email
                }
                closeAction={() => {
                    close();
                }}
            >
                {error && (
                    <Box mt={1} sx={{ width: '100%', textAlign: 'center' }}>
                        <Typography variant="body1" sx={{ color: 'red' }}>
                            {string?.user_with_this_email_not_found}!
                        </Typography>
                    </Box>
                )}

                <TextField
                    size="small"
                    onChange={e => {
                        setUsername(e.target.value);
                    }}
                    value={username}
                    margin="dense"
                    id="name"
                    label={string?.email}
                    fullWidth
                    variant="outlined"
                    sx={{
                        '& label': {
                            color: '#898B9B',
                        },
                        mt: 4,
                    }}
                    error={!!(formik.errors.username && formik.touched.username)}
                    helperText={formik.errors.username && string[formik.errors.username]}
                />

                <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column' }}>
                    <Button
                        onClick={() => {
                            setOpenModalType('login');
                        }}
                    >
                        {string?.login}
                    </Button>
                </DialogActions>
                <Box mt={2} pb={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button variant="contained" type="submit">
                        {string?.reset_password}
                    </Button>
                </Box>
            </ModalWindow>
        </form>
    );
}
