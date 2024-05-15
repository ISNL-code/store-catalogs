import { useEffect, useState } from 'react';
import { useUserApi } from 'api/useUserApi';
import { useFormik } from 'formik';
import emailFormValidations from 'Validation/emailFormValidations';
import { STORE_CONFIG } from 'store_constants/stores_config';
import FormDialog from 'components/organisms/Modals/FormDialog';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';

export default function ForgotPasswordForm({ isOpen, setIsOpen, string, location }) {
    const { STORE_CODE } = STORE_CONFIG;
    // const [successReset, setSuccessReset] = useState(false);
    const [email, setEmail] = useState('');
    const [isError, setIsError] = useState(false);

    const { mutateAsync: resetPassword, isLoading } = useUserApi().useResetCustomerPassword();

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: emailFormValidations,
        onSubmit: values => {
            resetPassword({ username: values.email, storeCode: STORE_CODE })
                .then(() => {
                    // setSuccessReset(true);
                })
                .catch(() => setIsError(true));
        },
    });
    console.log(isLoading);
    useEffect(() => {
        formik.setValues({ email });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    // if (successReset)
    //     return (
    //         <>
    //             {isLoading && <Loader />}
    //             <ModalWindow
    //                 type={'success'}
    //                 title={string?.sended}
    //                 text={string?.an_email_with_a_link_has_been_sent_to_your_email}
    //                 closeAction={() => {
    //                     close();
    //                 }}
    //             >
    //                 <Box mt={2} pb={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
    //                     <Button variant="contained" onClick={() => setOpenModalType('login')}>
    //                         {string?.login}
    //                     </Button>
    //                 </Box>
    //             </ModalWindow>
    //         </>
    //     );

    if (!isOpen) return null;

    return (
        <FormDialog
            link={null}
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
            buttons={[
                { type: 'action', action: () => setIsOpen(DialogWindowType?.LOGIN), name: string?.cancel },
                { type: 'submit', name: string?.send },
            ]}
            onSubmit={() => formik.handleSubmit()}
            description={
                string?.please_enter_your_email_address_you_will_receive_a_link_to_create_a_new_password_via_email
            }
            closeIcon
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
        // <form
        //     onSubmit={e => {
        //         e.preventDefault();
        //         formik.handleSubmit();
        //     }}
        // >
        //     {isLoading && <Loader />}
        //     <ModalWindow
        //         type={'warning'}
        //         title={string?.forgot_password}
        //         text={
        //             string?.please_enter_your_email_address_you_will_receive_a_link_to_create_a_new_password_via_email
        //         }
        //         closeAction={() => {
        //             close();
        //         }}
        //     >
        //         {error && (
        //             <Box mt={1} sx={{ width: '100%', textAlign: 'center' }}>
        //                 <Typography variant="body1" sx={{ color: 'red' }}>
        //                     {string?.user_with_this_email_not_found}!
        //                 </Typography>
        //             </Box>
        //         )}

        //         <TextField
        //             size="small"
        //             onChange={e => {
        //                 setUsername(e.target.value);
        //             }}
        //             value={username}
        //             margin="dense"
        //             id="name"
        //             label={string?.email}
        //             fullWidth
        //             variant="outlined"
        //             sx={{
        //                 '& label': {
        //                     color: '#898B9B',
        //                 },
        //                 mt: 4,
        //             }}
        //             error={!!(formik.errors.username && formik.touched.username)}
        //             helperText={formik.errors.username && string[formik.errors.username]}
        //         />

        //         <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column' }}>
        //             <Button
        //                 onClick={() => {
        //                     setOpenModalType('login');
        //                 }}
        //             >
        //                 {string?.login}
        //             </Button>
        //         </DialogActions>
        //         <Box mt={2} pb={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        //             <Button variant="contained" type="submit">
        //                 {string?.reset_password}
        //             </Button>
        //         </Box>
        //     </ModalWindow>
        // </form>
    );
}
