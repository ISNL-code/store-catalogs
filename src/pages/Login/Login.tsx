import Button from '@mui/material/Button';
import { InputAdornment, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useUserApi } from 'api/useUserApi';
import { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import ModalWindow from 'components/atoms/ModalWindow/ModalWindow';
import Loader from 'components/atoms/Loader/Loader';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import loginFormValidations from 'Validation/loginFormValidations';
import { STORE_CONFIG } from 'constants/stores_config';

export default function Login({ setAuth, string, close, setOpenModalType }) {
    const { ACCESS_TOKEN_KEY } = STORE_CONFIG;
    const { storeCode } = useParams();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { mutateAsync: loginCustomer, isLoading } = useUserApi().useCustomerLogin();

    const formik = useFormik({
        initialValues: { password: '', username: '' },
        validationSchema: loginFormValidations,
        onSubmit: values => {
            loginCustomer({ ...values, storeCode: storeCode })
                .then(res => {
                    if (res.data.token) {
                        localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(res.data.token));
                        setAuth(true);
                        setOpenModalType(null);
                    }
                })
                .catch(() => {
                    setError(true);
                });
        },
    });

    useEffect(() => {
        formik.setValues({ password, username });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, username]);

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                formik.handleSubmit();
            }}
        >
            {isLoading && <Loader />}
            <ModalWindow
                title={string?.login}
                closeAction={() => {
                    close();
                    setError(false);
                }}
            >
                {error && (
                    <Box mt={1} sx={{ width: '100%', textAlign: 'center' }}>
                        <Typography variant="body1" sx={{ color: 'red' }}>
                            {string?.wrong_login_or_password}!
                        </Typography>
                    </Box>
                )}

                <TextField
                    size="small"
                    onChange={e => {
                        setUsername(e.target.value.trim());
                    }}
                    value={username || ''}
                    margin="dense"
                    id="name"
                    label={string?.email}
                    fullWidth
                    variant="outlined"
                    sx={{
                        '& label': {
                            color: '#898B9B',
                        },
                    }}
                    error={!!(formik.errors.username && formik.touched.username)}
                    helperText={formik.errors.username && string[formik.errors.username]}
                />
                <TextField
                    size="small"
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                    value={password}
                    margin="dense"
                    id={'password'}
                    label={string?.password}
                    fullWidth
                    type={passwordVisible ? 'text' : 'password'}
                    variant="outlined"
                    sx={{
                        '& label': {
                            color: '#898B9B',
                        },
                    }}
                    error={!!(formik.errors.password && formik.touched.password)}
                    helperText={formik.errors.password && string[formik.errors.password]}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                sx={{ cursor: 'pointer' }}
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                position="end"
                            >
                                {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </InputAdornment>
                        ),
                    }}
                />

                {/* <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column' }}>
                    <Button
                        onClick={() => {
                            setOpenModalType('forgot-password');
                        }}
                    >
                        {string?.forgot_password}
                    </Button>
                </DialogActions> */}
                <Box mt={1} pb={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setOpenModalType('register');
                        }}
                    >
                        {string?.register}
                    </Button>

                    <Button variant="contained" type="submit">
                        {string?.login}
                    </Button>
                </Box>
            </ModalWindow>
        </form>
    );
}
