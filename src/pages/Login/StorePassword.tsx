import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { InputAdornment, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useUserApi } from 'api/useUserApi';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ACCESS_TOKEN_KEY } from 'constants/constants';
import ModalWindow from 'components/atoms/ModalWindow/ModalWindow';
import Loader from 'components/atoms/Loader/Loader';

export default function StorePassword({ setAuth, string, close, setOpenModalType }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState(false);
    const [error, setError] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { mutateAsync: loginCustomer, isLoading } = useUserApi().useCustomerLogin();

    return (
        <>
            {isLoading && <Loader />}
            <ModalWindow
                type={''}
                title={string?.login}
                text={''}
                actionTitle={string?.login}
                secondaryTitle={string?.register}
                secondaryAction={() => {
                    setOpenModalType('register');
                }}
                closeAction={() => {
                    close();
                    setError(false);
                }}
                primaryAction={() => {
                    setValidate(true);
                    if (!/\S+@\S+\.\S+/.test(username) || !username.length || password.length < 8) return;
                    loginCustomer({ username, password, storeCode: 'DEFAULT' })
                        .then(res => {
                            localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(res.data.token));
                            if (res.data.token) setAuth(true);
                            setError(false);
                            setOpenModalType(null);
                        })
                        .catch(() => {
                            setError(true);
                        });
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
                    error={validate && password.length < 8}
                    helperText={
                        validate &&
                        (password.length < 1
                            ? string?.enter_password
                            : password.length < 8
                            ? string?.password_length_min_8_symbols
                            : '')
                    }
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

                <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column' }}>
                    <Button
                        onClick={() => {
                            setOpenModalType('forgot-password');
                        }}
                    >
                        {string?.forgot_password}
                    </Button>
                </DialogActions>
            </ModalWindow>
        </>
    );
}
