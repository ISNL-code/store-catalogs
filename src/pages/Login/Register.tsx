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

export default function Register({ setAuth, lang, string, close, setOpenModalType }) {
    const { ACCESS_TOKEN_KEY, STORE_NAME } = STORE_CONFIG;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('UA');
    const [error, setError] = useState(false);
    const countryList = [
        { code: 'CZ', country: string?.czechia },
        { code: 'IT', country: string?.italy },
        { code: 'KZ', country: string?.kazakhstan },
        { code: 'PL', country: string?.poland },
        { code: 'TR', country: string?.turkey },
        { code: 'UA', country: string?.ukraine },
        { code: 'AL', country: 'Albania' },
        { code: 'AD', country: 'Andorra' },
        { code: 'AM', country: 'Armenia' },
        { code: 'AT', country: 'Austria' },
        { code: 'AZ', country: 'Azerbaijan' },
        { code: 'BY', country: 'Belarus' },
        { code: 'BE', country: 'Belgium' },
        { code: 'BA', country: 'Bosnia and Herzegovina' },
        { code: 'BG', country: 'Bulgaria' },
        { code: 'HR', country: 'Croatia' },
        { code: 'CY', country: 'Cyprus' },
        { code: 'DK', country: 'Denmark' },
        { code: 'EE', country: 'Estonia' },
        { code: 'FO', country: 'Faroe Islands' },
        { code: 'FI', country: 'Finland' },
        { code: 'FR', country: 'France' },
        { code: 'GE', country: 'Georgia' },
        { code: 'DE', country: 'Germany' },
        { code: 'GI', country: 'Gibraltar' },
        { code: 'GR', country: 'Greece' },
        { code: 'GG', country: 'Guernsey' },
        { code: 'HU', country: 'Hungary' },
        { code: 'IS', country: 'Iceland' },
        { code: 'IE', country: 'Ireland' },
        { code: 'IM', country: 'Isle of Man' },
        { code: 'JE', country: 'Jersey' },
        { code: 'XK', country: 'Kosovo' },
        { code: 'LV', country: 'Latvia' },
        { code: 'LI', country: 'Liechtenstein' },
        { code: 'LT', country: 'Lithuania' },
        { code: 'LU', country: 'Luxembourg' },
        { code: 'MT', country: 'Malta' },
        { code: 'MD', country: 'Moldova' },
        { code: 'MC', country: 'Monaco' },
        { code: 'ME', country: 'Montenegro' },
        { code: 'NL', country: 'Netherlands' },
        { code: 'MK', country: 'North Macedonia' },
        { code: 'NO', country: 'Norway' },
        { code: 'PT', country: 'Portugal' },
        { code: 'RO', country: 'Romania' },
        { code: 'RU', country: 'Russia' },
        { code: 'SM', country: 'San Marino' },
        { code: 'RS', country: 'Serbia' },
        { code: 'SK', country: 'Slovakia' },
        { code: 'SI', country: 'Slovenia' },
        { code: 'ES', country: 'Spain' },
        { code: 'SJ', country: 'Svalbard and Jan Mayen' },
        { code: 'SE', country: 'Sweden' },
        { code: 'GB', country: 'United Kingdom' },
        { code: 'VA', country: 'Vatican City' },
    ];
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
            country: '',
        },
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
                storeCode: STORE_NAME,
            })
                .then(res => {
                    localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(res.data.token));
                    if (res.data.token) setAuth(true);
                    setOpenModalType(null);
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
                closeAction={() => {
                    close();
                    setError(false);
                }}
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
                    helperText={formik.errors.password && string[formik.errors.password]}
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
                    helperText={formik.errors.confirmPassword && string[formik.errors.confirmPassword]}
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
                    helperText={formik.errors.firstName && string[formik.errors.firstName]}
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
                    helperText={formik.errors.lastName && string[formik.errors.lastName]}
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
                    helperText={formik.errors.phoneNumber && string[formik.errors.phoneNumber]}
                />
                <FormControl fullWidth sx={{ minWidth: 250, mt: 1, zIndex: 5000 }} size="small">
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
                        {countryList.map(item => (
                            <MenuItem key={item.code} value={item.code} sx={{ zIndex: 5000 }}>
                                {item.country}
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
