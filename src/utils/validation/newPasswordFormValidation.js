import * as yup from 'yup';

const newPasswordFormValidation = yup.object().shape({
    password: yup.string().required('enter_password').min(8, 'password_length_min_8_symbols'),
    confirmPassword: yup.string().test('passwords-match', 'passwords_do_not_match', function (value) {
        return this.parent.password === value;
    }),
});

export default newPasswordFormValidation;
