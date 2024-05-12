import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import {
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useUserApi } from 'api/useUserApi';
import { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import ModalWindow from 'components/atoms/ModalWindow/ModalWindow';
import Loader from 'components/atoms/Loader/Loader';
import { useFormik } from 'formik';
import registerFormValidation from 'Validation/registerFormValidation';
import { STORE_CONFIG } from 'constants/stores_config';
import axios from 'axios';
import { TRANSLATED_COUNTRIES } from 'dataBase/COUNTRY_LIST';

export default function Register({ setAuth, lang, string, close, setOpenModalType }) {
    const { ACCESS_TOKEN_KEY, STORE_CODE, STORE_NAME } = STORE_CONFIG;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState<string | null>(null);
    const [error, setError] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const { mutateAsync: register, isLoading } = useUserApi().useCustomerRegister();

    const formik = useFormik({
        initialValues: {
            password: '',
            username: '',
            phoneNumber: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            country: null,
        } as any,
        validationSchema: registerFormValidation,
        onSubmit: values => {
            register({
                emailAddress: values.username,
                firstName: values.firstName,
                lastName: values.lastName,
                password: values.password,
                username: values.username,
                country: values.country,
                phone: values.phoneNumber,
                lang,
                storeCode: STORE_CODE,
            })
                .then(res => {
                    localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(res.data.token));
                    if (res.data.token) setAuth(true);
                    setOpenModalType(null);
                })
                .then(_ => {
                    try {
                        const token = '6904212535:AAGvPEjkJds0aayd-oD1YVMbhLKeKt72yaE';
                        const chatId = '480774886'; // Узнайте ваш Chat ID, написав своему боту /myid
                        const url = `https://api.telegram.org/bot${token}/sendMessage`;

                        axios.post(url, {
                            chat_id: chatId,
                            text: `${STORE_NAME} Регистрация страна:${values.country}, пользователь:${values.username} `,
                        });
                    } catch (error) {
                        console.error('Error sending message:', error);
                    }
                })
                .catch(err => {
                    setError(true);
                });
        },
    });

    useEffect(() => {
        formik.setValues({ password, username, phoneNumber, confirmPassword, firstName, lastName, country });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, username, phoneNumber, confirmPassword, firstName, lastName, country]);

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                formik.handleSubmit();
            }}
        >
            {isLoading && <Loader />}
            <ModalWindow
                title={string?.register}
                closeAction={
                    close
                        ? () => {
                              close();
                              setError(false);
                          }
                        : null
                }
            >
                {error && (
                    <Box mt={1} sx={{ width: '100%', textAlign: 'center' }}>
                        <Typography variant="body1" sx={{ color: 'red' }}>
                            {string?.already_registered}!
                        </Typography>
                    </Box>
                )}

                <TextField
                    size="small"
                    onChange={e => {
                        setUsername(e.target.value.trim());
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
                    error={!!(formik.errors.username && formik.touched.username)}
                    helperText={formik.errors.username && string?.[formik.errors.username as string]}
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
                    error={!!(formik.errors.password && formik.touched.password)}
                    helperText={formik.errors.password && string?.[formik.errors.password as string]}
                />
                <TextField
                    size="small"
                    onChange={e => {
                        setConfirmPassword(e.target.value);
                    }}
                    value={confirmPassword}
                    margin="dense"
                    id={'confirm_password'}
                    label={string?.confirm_password}
                    fullWidth
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    variant="outlined"
                    sx={{
                        '& label': {
                            color: '#898B9B',
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                sx={{ cursor: 'pointer' }}
                                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                position="end"
                            >
                                {confirmPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </InputAdornment>
                        ),
                    }}
                    error={!!(formik.errors.confirmPassword && formik.touched.confirmPassword)}
                    helperText={formik.errors.confirmPassword && string?.[formik.errors.confirmPassword as string]}
                />
                <TextField
                    size="small"
                    onChange={e => {
                        setFirstName(e.target.value.trim());
                    }}
                    value={firstName}
                    margin="dense"
                    id={'first_name'}
                    label={string?.first_name}
                    fullWidth
                    type="text"
                    variant="outlined"
                    sx={{
                        '& label': {
                            color: '#898B9B',
                        },
                    }}
                    error={!!(formik.errors.firstName && formik.touched.firstName)}
                    helperText={formik.errors.firstName && string?.[formik.errors.firstName as string]}
                />
                <TextField
                    size="small"
                    onChange={e => {
                        setLastName(e.target.value.trim());
                    }}
                    value={lastName}
                    margin="dense"
                    id={'last_name'}
                    label={string?.last_name}
                    fullWidth
                    type="text"
                    variant="outlined"
                    sx={{
                        '& label': {
                            color: '#898B9B',
                        },
                    }}
                    error={!!(formik.errors.lastName && formik.touched.lastName)}
                    helperText={formik.errors.lastName && string?.[formik.errors.lastName as string]}
                />
                <TextField
                    size="small"
                    value={phoneNumber}
                    margin="dense"
                    id={'phoneNumber'}
                    label={string?.phone_number}
                    fullWidth
                    onChange={e => {
                        if (
                            Number(e.target.value) ||
                            e.target.value === '+' ||
                            e.target.value.includes('0') ||
                            e.target.value.length < 1
                        )
                            setPhoneNumber(e.target.value.trim());
                    }}
                    type="tel"
                    variant="outlined"
                    sx={{
                        '& label': {
                            color: '#898B9B',
                        },
                    }}
                    error={!!(formik.errors.phoneNumber && formik.touched.phoneNumber)}
                    helperText={formik.errors.phoneNumber && string?.[formik.errors.phoneNumber as string]}
                />
                <FormControl
                    error={!!(formik.errors.country && formik.touched.country)}
                    fullWidth
                    sx={{ minWidth: 250, mt: 1, zIndex: 5000 }}
                    size="small"
                >
                    <InputLabel sx={{ color: '#696666' }} id="country-label">
                        {string?.country}
                    </InputLabel>
                    <Select
                        size="small"
                        id="country-select"
                        value={country}
                        onChange={e => {
                            setCountry(e.target.value);
                        }}
                        input={<OutlinedInput label={string?.country} />}
                        sx={{ zIndex: 5000 }}
                    >
                        {TRANSLATED_COUNTRIES.map(item => (
                            <MenuItem key={item.code} value={item.code} sx={{ zIndex: 5000 }}>
                                {string?.[item.country]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column' }}>
                    <Button
                        onClick={() => {
                            setOpenModalType('login');
                        }}
                    >
                        {string?.already_registered}
                    </Button>
                </DialogActions>
                <Box mt={1} pb={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button variant="contained" type="submit">
                        {string?.register}
                    </Button>
                </Box>
            </ModalWindow>
        </form>
    );
}
