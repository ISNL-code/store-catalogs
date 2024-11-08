import { useUserApi } from 'api/useUserApi';
import { useEffect, useState } from 'react';
import Loader from 'components/atoms/Loader/Loader';
import { useFormik } from 'formik';
import loginFormValidations from 'utils/validation/loginFormValidations';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import FormDialog from 'components/organisms/Modals/FormDialog';
import { ROUTES } from 'router/routes';
import { STORAGE_KEYS } from 'constants/local_storage_keys';
import { setStorageItem } from 'utils/storageUtils';
import { telegramSender } from 'utils/telegramSender';

interface Props {
    setApiToken?: (token: string | null) => void;
    isOpen;
    setIsOpen;
    string;
    location;
    setAuth;
}

export default function Login({ isOpen, setIsOpen, string, location, setAuth, setApiToken }: Props) {
    const { STORE_CODE, STORE_NAME } = STORE_CONFIG;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);

    const { mutateAsync: loginCustomer, isLoading } = useUserApi().useCustomerLogin();

    const formik = useFormik({
        initialValues: { password: '', email: '' },
        validationSchema: loginFormValidations,
        onSubmit: values => {
            loginCustomer({ ...values, storeCode: STORE_CODE })
                .then(res => {
                    if (res.data.token) {
                        telegramSender({
                            action: `LOGIN`,
                            name: 'login',
                            contacts: `email: ${values.email},`,
                        });
                        setStorageItem(STORAGE_KEYS?.ACCESS_TOKEN_KEY, JSON.stringify(res.data.token));
                        setApiToken && setApiToken(res.data.token);
                        setIsOpen(null);
                        setAuth(true);
                    }
                })
                .catch(() => setIsError(true));
        },
    });

    useEffect(() => {
        formik.setValues({ password, email });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, email]);

    if (!isOpen) return null;

    return (
        <>
            {isLoading && <Loader />}
            <FormDialog
                variant="info"
                link={{
                    name: string?.forgot_password,
                    action: () => {
                        setIsOpen(DialogWindowType?.RESET_PASSWORD);
                    },
                }}
                string={string}
                onRefresh={() => {
                    formik.resetForm();
                    setIsError(false);
                    setPassword('');
                    setEmail('');
                }}
                onClose={() => {
                    setIsOpen(null);
                    formik.resetForm();
                    setIsError(false);
                    setPassword('');
                    setEmail('');
                }}
                title={string?.login + ' ' + string?.in + ' ' + string?.catalog} // eslint-disable-line
                fullWidth
                buttons={[
                    {
                        type: 'action',
                        name: string?.register,
                        action: () => {
                            setIsOpen(DialogWindowType?.REGISTER);
                        },
                    },
                    { type: 'submit', name: string?.login },
                ]}
                onSubmit={() => formik.handleSubmit()}
                description={null}
                error={{
                    text: string?.wrong_password_or_user_not_registered_in + ' ' + STORE_NAME,
                    shown: isError,
                }}
                closeAvailable={Boolean(!location.includes(ROUTES?.SECURITY))}
                fields={[
                    {
                        component: 'textfield',
                        type: 'email',
                        label: string?.email,
                        value: email || '',
                        onChange: val => setEmail(val),
                        error: formik.errors.email && formik.touched.email,
                        helperText: string?.[formik.errors.email || ''],
                        trim: true,
                    },
                    {
                        component: 'textfield',
                        type: 'password',
                        label: string?.password,
                        value: password || '',
                        onChange: val => setPassword(val),
                        error: formik.errors.password && formik.touched.password,
                        helperText: string?.[formik.errors.password || ''],
                        trim: false,
                    },
                ]}
            />
        </>
    );
}
