import * as yup from 'yup';

const emailFormValidations = yup.object().shape({
    username: yup.string().required('enter_email').email('enter_valid_email'),
});

export default emailFormValidations;
