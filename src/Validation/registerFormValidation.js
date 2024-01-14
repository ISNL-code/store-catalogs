import * as yup from 'yup';

const registerFormValidation = yup.object().shape({
    username: yup.string().required('enter_email').email('enter_valid_email'),
    password: yup.string().required('enter_password').min(8, 'password_length_min_8_symbols'),
    confirmPassword: yup.string().test('passwords-match', 'passwords_do_not_match', function (value) {
        return this.parent.password === value;
    }),
    phoneNumber: yup.string().required('enter_phone_number').min(7, 'phone_length_minimum_7_characters'),
    firstName: yup.string().required('enter_first_name'),
    lastName: yup.string().required('enter_last_name'),
    country: yup.string().required(),
});

export default registerFormValidation;
