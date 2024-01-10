import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useUserApi } from 'api/useUserApi';
import Loader from 'components/atoms/Loader/Loader';
import ModalWindow from 'components/atoms/ModalWindow/ModalWindow';

export default function ForgotPasswordForm({ string, close, setOpenModalType }) {
    const [successReset, setSuccessReset] = useState(false);
    const [username, setUsername] = useState('');
    const [validate, setValidate] = useState(false);
    const [error, setError] = useState(false);

    const { mutateAsync: resetPassword, isLoading } = useUserApi().useResetCustomerPassword();

    if (successReset)
        return (
            <>
                <ModalWindow
                    type={'success'}
                    title={string?.sended}
                    text={string?.an_email_with_a_link_has_been_sent_to_your_email}
                    actionTitle={string?.login}
                    secondaryTitle={null}
                    closeAction={() => {
                        close();
                    }}
                    primaryAction={() => {
                        setOpenModalType('login');
                    }}
                >
                    <></>
                </ModalWindow>
            </>
        );

    return (
        <>
            {isLoading && <Loader />}
            <ModalWindow
                type={'warning'}
                title={string?.forgot_password}
                text={
                    string?.please_enter_your_email_address_you_will_receive_a_link_to_create_a_new_password_via_email
                }
                actionTitle={string?.reset_password}
                secondaryTitle={null}
                closeAction={() => {
                    setOpenModalType(null);
                }}
                primaryAction={() => {
                    setValidate(true);
                    if (!/\S+@\S+\.\S+/.test(username) || !username.length) return;
                    resetPassword({ username })
                        .then(() => {
                            setSuccessReset(true);
                        })
                        .catch(() => setError(true));
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
                    error={validate && (!/\S+@\S+\.\S+/.test(username) || !username.length)}
                    helperText={
                        validate &&
                        (username.length < 1
                            ? string?.enter_email
                            : !/\S+@\S+\.\S+/.test(username)
                            ? string?.enter_valid_email
                            : '')
                    }
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
            </ModalWindow>
        </>
    );
}
