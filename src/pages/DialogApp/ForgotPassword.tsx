import { useEffect, useState } from 'react';
import { useUserApi } from 'api/useUserApi';
import { useFormik } from 'formik';
import emailFormValidations from 'utils/validation/emailFormValidations';
import { STORE_CONFIG } from 'store_constants/stores_config';
import FormDialog from 'components/organisms/Modals/FormDialog';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { RESET_PASSWORD_PATH, ROUTES } from 'router/routes';
import Loader from 'components/atoms/Loader/Loader';

export default function ForgotPasswordForm({ isOpen, setIsOpen, string, location }) {
    const { STORE_CODE } = STORE_CONFIG;
    const [email, setEmail] = useState('');
    const [isError, setIsError] = useState(false);

    const { mutateAsync: resetPassword, isLoading } = useUserApi().useResetCustomerPassword();

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: emailFormValidations,
        onSubmit: values => {
            resetPassword({
                username: values.email,
                resetLink: RESET_PASSWORD_PATH(STORE_CODE),
                storeCode: STORE_CODE,
            })
                .then(() => {
                    setIsOpen(DialogWindowType?.SUCCESS_MAIL_SENT);
                })
                .catch(() => setIsError(true));
        },
    });

    useEffect(() => {
        formik.setValues({ email });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    if (!isOpen) return null;

    return (
        <>
            {isLoading && <Loader />}
            <FormDialog
                link={{
                    name: string?.login,
                    action: () => {
                        setIsOpen(DialogWindowType?.LOGIN);
                    },
                }}
                variant="warning"
                string={string}
                title={string?.forgot_password}
                onClose={() => {
                    setIsOpen(null);
                    formik.resetForm(); // Reset form errors and values
                    setEmail('');
                    setIsError(true);
                }}
                onRefresh={() => {
                    formik.resetForm(); // Reset form errors and values
                    setEmail('');
                    setIsError(false);
                }}
                fullWidth
                buttons={[{ type: 'submit', name: string?.send }]}
                onSubmit={() => formik.handleSubmit()}
                description={
                    string?.please_enter_your_email_address_you_will_receive_a_link_to_create_a_new_password_via_email
                }
                closeAvailable={Boolean(!location.includes(ROUTES?.SECURITY))}
                error={{ text: string?.user_with_this_email_not_found, shown: isError }}
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
                ]}
            />
        </>
    );
}
