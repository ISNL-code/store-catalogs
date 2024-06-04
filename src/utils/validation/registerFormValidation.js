import * as yup from 'yup';

const registerFormValidation = yup.object().shape({
    email: yup.string().required('enter_email').email('enter_valid_email'),
    password: yup.string().required('enter_password').min(4, 'password_length_min_4_symbols'),
    phoneNumber: yup
        .string()
        .required('enter_phone_number')
        .matches(/^[\d\+\-\(\) ]+$/, 'enter_phone_number') // eslint-disable-line
        .min(7, 'phone_length_minimum_7_characters')
        .max(14, 'phone_length_max_14_characters'),
    country: yup.string().required(),
});

export default registerFormValidation;
