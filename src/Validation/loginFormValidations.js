import * as yup from 'yup';

const loginFormValidations = yup.object().shape({
    email: yup.string().required('enter_email').email('enter_valid_email'),
    password: yup.string().required('enter_password').min(8, 'password_length_min_8_symbols'),
});

export default loginFormValidations;
