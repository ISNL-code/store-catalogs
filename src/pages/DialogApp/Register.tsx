import { useUserApi } from 'api/useUserApi';
import { useEffect, useState } from 'react';
import Loader from 'components/atoms/Loader/Loader';
import { useFormik } from 'formik';
import registerFormValidation from 'Validation/registerFormValidation';
import { STORE_CONFIG } from 'store_constants/stores_config';
import axios from 'axios';
import { TRANSLATED_COUNTRIES } from 'dataBase/COUNTRY_LIST';
import FormDialog from 'components/organisms/Modals/FormDialog';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';

const INITIAL_VALUES = {
    password: '',
    email: '',
    phoneNumber: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    country: '',
};

export default function Register({ isOpen, setIsOpen, string, location, setAuth }) {
    const { ACCESS_TOKEN_KEY, STORE_CODE, STORE_NAME, LANGUAGE_KEY, SUPPORTED_COUNTRIES } = STORE_CONFIG;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [isError, setIsError] = useState(false);

    const { mutateAsync: register, isLoading } = useUserApi().useCustomerRegister();

    const formik = useFormik({
        initialValues: INITIAL_VALUES,
        validationSchema: registerFormValidation,
        onSubmit: values => {
            register({
                emailAddress: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                password: values.password,
                username: values.email,
                country: values.country,
                phone: values.phoneNumber,
                lang: JSON.parse(localStorage.getItem(LANGUAGE_KEY) || 'en'),
                storeCode: STORE_CODE,
            })
                .then(res => {
                    localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(res.data.token));
                    setAuth(true);
                    setIsOpen(null);
                })
                .then(_ => {
                    try {
                        const token = '6904212535:AAGvPEjkJds0aayd-oD1YVMbhLKeKt72yaE';
                        const chatId = '480774886'; // Узнайте ваш Chat ID, написав своему боту /myid
                        const url = `https://api.telegram.org/bot${token}/sendMessage`;

                        axios.post(url, {
                            chat_id: chatId,
                            text: `${STORE_NAME} Регистрация страна:${values.country}, пользователь:${values.email} `,
                        });
                    } catch (error) {
                        console.error('Error sending message:', error);
                    }
                })
                .catch(_err => {
                    setIsError(true);
                });
        },
    });

    useEffect(() => {
        formik.setValues({
            password,
            email,
            phoneNumber,
            confirmPassword,
            firstName,
            lastName,
            country,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, email, phoneNumber, confirmPassword, firstName, lastName, country]);

    if (!isOpen) return null;

    const setInitialValue = () => {
        formik.resetForm();
        setIsError(false);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhoneNumber('');
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setCountry('');
    };

    const handleTranslateCountry = val => {
        return string?.[val];
    };

    return (
        <>
            {isLoading && <Loader />}
            <FormDialog
                variant="info"
                link={{
                    name: string?.already_registered,
                    action: () => {
                        setIsOpen(DialogWindowType?.LOGIN);
                    },
                }}
                string={string}
                onRefresh={() => {
                    setInitialValue();
                }}
                onClose={() => {
                    setIsOpen(null);
                    setInitialValue();
                }}
                title={string?.register + ' ' + string?.in + ' ' + `"${STORE_NAME}"` + ' ' + string?.catalog} // eslint-disable-line
                fullWidth
                buttons={[
                    {
                        type: 'close',
                    },
                    { type: 'submit', name: string?.register },
                ]}
                onSubmit={() => formik.handleSubmit()}
                description={null}
                error={{
                    text: string?.already_registered,
                    shown: isError,
                }}
                closeIcon
                fields={[
                    {
                        component: 'textfield',
                        type: 'email',
                        label: string?.email,
                        value: email || '',
                        onChange: val => setEmail(val),
                        error: Boolean(formik.errors.email && formik.touched.email),
                        helperText: string?.[formik.errors.email ? formik.errors.email : ''] || '',
                        trim: true,
                    },
                    {
                        component: 'textfield',
                        type: 'password',
                        label: string?.password,
                        value: password || '',
                        onChange: val => setPassword(val),
                        error: Boolean(formik.errors.password && formik.touched.password),
                        helperText: string?.[formik.errors.password ? formik.errors.password : ''] || '',
                        trim: false,
                    },
                    {
                        component: 'textfield',
                        type: 'password',
                        label: string?.confirm_password,
                        value: confirmPassword || '',
                        onChange: val => setConfirmPassword(val),
                        error: Boolean(formik.errors.confirmPassword && formik.touched.confirmPassword),
                        helperText: string?.[formik.errors.confirmPassword ? formik.errors.confirmPassword : ''] || '',
                        trim: false,
                    },
                    {
                        component: 'textfield',
                        type: 'text',
                        label: string?.first_name,
                        value: firstName || '',
                        onChange: val => setFirstName(val),
                        error: Boolean(formik.errors.firstName && formik.touched.firstName),
                        helperText: string?.[formik.errors.firstName ? formik.errors.firstName : ''] || '',
                        trim: false,
                    },
                    {
                        component: 'textfield',
                        type: 'text',
                        label: string?.last_name,
                        value: lastName || '',
                        onChange: val => setLastName(val),
                        error: Boolean(formik.errors.lastName && formik.touched.lastName),
                        helperText: string?.[formik.errors.lastName ? formik.errors.lastName : ''] || '',
                        trim: false,
                    },
                    {
                        component: 'textfield',
                        type: 'tel',
                        label: string?.phone_number,
                        value: phoneNumber || '',
                        onChange: val => setPhoneNumber(val),
                        error: Boolean(formik.errors.phoneNumber && formik.touched.phoneNumber),
                        helperText: string?.[formik.errors.phoneNumber ? formik.errors.phoneNumber : ''] || '',
                        trim: false,
                    },
                    {
                        component: 'autocomplete',
                        type: 'text',
                        label: string?.country,
                        value: country || '',
                        onChange: val => setCountry(val),
                        error: Boolean(formik.errors.country && formik.touched.country),
                        helperText: string?.[formik.errors.country ? formik.errors.country : ''] || '',
                        trim: false,
                        options: (SUPPORTED_COUNTRIES || TRANSLATED_COUNTRIES).map(el => {
                            return { value: el?.code, label: handleTranslateCountry(el?.country) };
                        }),
                    },
                ]}
            />
        </>
    );
}
