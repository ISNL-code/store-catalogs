import * as yup from 'yup';

const pricingValidation = yup.object().shape({
    email: yup.string().required('enter_email').email('enter_valid_email'),
});

export default pricingValidation;
