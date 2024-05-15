import { useUserApi } from 'api/useUserApi';
import { useEffect, useState } from 'react';
import Loader from 'components/atoms/Loader/Loader';
import { useFormik } from 'formik';
import loginFormValidations from 'Validation/loginFormValidations';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import FormDialog from 'components/organisms/Modals/FormDialog';

export default function Login({ isOpen, setIsOpen, string, location, setAuth }) {
    const { ACCESS_TOKEN_KEY, STORE_NAME, STORE_CODE } = STORE_CONFIG;

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
                        localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(res.data.token));
                        setAuth(true);
                        setIsOpen(null);
                    }
                })
                .catch(() => {
                    setIsError(true);
                });
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
                title={string?.login + ' ' + string?.in + ' ' + `"${STORE_NAME}"` + ' ' + string?.catalog} // eslint-disable-line
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
                closeIcon
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
