import * as yup from 'yup';

const registerFormValidation = yup.object().shape({
    subject: yup.string().required('required'),
    phone: yup.string().required('required').min(7, 'not valid'),
});

export default registerFormValidation;
