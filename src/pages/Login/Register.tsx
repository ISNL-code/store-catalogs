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
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ACCESS_TOKEN_KEY } from 'constants/constants';
import ModalWindow from 'components/atoms/ModalWindow/ModalWindow';
import Loader from 'components/atoms/Loader/Loader';
import { useParams } from 'react-router-dom';

export default function Register({ setAuth, lang, string, close, setOpenModalType }) {
    const { storeCode } = useParams();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('UA');
    const [validate, setValidate] = useState(false);
    const [error, setError] = useState(false);
    const countryList = [
        { code: 'CZ', country: string?.czechia },
        { code: 'IT', country: string?.italy },
        { code: 'KZ', country: string?.kazakhstan },
        { code: 'PL', country: string?.poland },
        { code: 'TR', country: string?.turkey },
        { code: 'UA', country: string?.ukraine },
    ];
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const { mutateAsync: register, isLoading } = useUserApi().useCustomerRegister();

    return (
        <>
            {isLoading && <Loader />}
            <ModalWindow
                type={''}
                title={string?.register}
                text={''}
                actionTitle={string?.register}
                secondaryTitle={null}
                closeAction={() => {
                    close();
                    setError(false);
                }}
                primaryAction={() => {
                    setValidate(true);
                    if (
                        !/\S+@\S+\.\S+/.test(username) ||
                        !username.length ||
                        password.length < 8 ||
                        password !== confirmPassword ||
                        !firstName ||
                        !lastName ||
                        !phoneNumber
                    )
                        return;
                    register({
                        emailAddress: username,
                        firstName: firstName,
                        lastName: lastName,
                        password: password,
                        username: username,
                        country: country,
                        phone: phoneNumber,
                        lang,
                        storeCode: storeCode || 'DEFAULT',
                    })
                        .then(res => {
                            localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(res.data.token));
                            if (res.data.token) setAuth(true);
                            setOpenModalType(null);
                        })
                        .catch(err => {
                            setError(true);
                        });
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
                    error={validate && password !== confirmPassword}
                    helperText={validate && password !== confirmPassword ? string?.passwords_do_not_match : ''}
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
                />
                <TextField
                    size="small"
                    onChange={e => {
                        setFirstName(e.target.value);
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
                    error={validate && !firstName}
                    helperText={validate && !firstName ? string?.enter_first_name : ''}
                />
                <TextField
                    size="small"
                    onChange={e => {
                        setLastName(e.target.value);
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
                    error={validate && !lastName}
                    helperText={validate && !lastName ? string?.enter_last_name : ''}
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
                            setPhoneNumber(e.target.value);
                    }}
                    type="tel"
                    variant="outlined"
                    sx={{
                        '& label': {
                            color: '#898B9B',
                        },
                    }}
                    error={validate && (!phoneNumber || phoneNumber.length < 7)}
                    helperText={
                        validate
                            ? phoneNumber.length < 7 && phoneNumber
                                ? string?.phone_length_minimum_7_characters
                                : string?.enter_phone_number
                            : ''
                    }
                />
                <FormControl fullWidth sx={{ minWidth: 250, mt: 1 }} size="small">
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
                    >
                        {countryList.map(item => (
                            <MenuItem key={item.code} value={item.code}>
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
            </ModalWindow>
        </>
    );
}
