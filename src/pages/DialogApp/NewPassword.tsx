import { useUserApi } from 'api/useUserApi';
import Loader from 'components/atoms/Loader/Loader';
import FormDialog from 'components/organisms/Modals/FormDialog';
import { useFormik } from 'formik';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import newPasswordFormValidation from 'utils/validation/newPasswordFormValidation';

const NewPassword = ({ isOpen, setIsOpen, string }) => {
    const { storeCode, tokenId } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { mutateAsync: updatePassword, isLoading } = useUserApi().useUpdateCustomerPassword();

    const formik = useFormik({
        initialValues: { password: '', confirmPassword: '' },
        validationSchema: newPasswordFormValidation,
        onSubmit: values => {
            updatePassword({
                password: values.password,
                resetToken: tokenId as string,
                storeCode: storeCode as string,
                repeatPassword: values.confirmPassword,
            })
                .then(_res => {
                    setIsOpen(DialogWindowType?.SUCCESS_PASSWORD_CHANGE);
                })
                .catch(_err => {
                    setIsOpen(DialogWindowType?.WENT_WRONG);
                });
        },
    });

    useEffect(() => {
        formik.setValues({
            password,
            confirmPassword,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, confirmPassword]);

    const setInitialValue = () => {
        formik.resetForm();
        setPassword('');
        setConfirmPassword('');
    };

    if (!isOpen) return null;

    return (
        <>
            {isLoading && <Loader />}
            <FormDialog
                variant="info"
                link={null}
                string={string}
                onRefresh={() => {
                    setInitialValue();
                }}
                onClose={() => {}}
                title={string?.enter_new_password} // eslint-disable-line
                fullWidth
                buttons={[{ type: 'submit', name: string?.confirm }]}
                onSubmit={() => formik.handleSubmit()}
                description={null}
                error={null}
                closeAvailable={false}
                fields={[
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
                ]}
            />
        </>
    );
};

export default NewPassword;
