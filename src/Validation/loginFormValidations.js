import * as yup from 'yup';

const loginFormValidations = yup.object().shape({
    email: yup.string().required('enter_email').email('enter_valid_email'),
    password: yup.string().required('enter_password').min(4, 'password_length_min_4_symbols'),
});

export default loginFormValidations;
