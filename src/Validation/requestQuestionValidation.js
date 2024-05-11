import * as yup from 'yup';

const requestQuestionValidation = yup.object().shape({
    question: yup.string().required('required_field'),
    phone: yup
        .string()
        .required('enter_phone_number')
        .min(7, 'phone_length_minimum_7_characters')
        .max(14, 'phone_length_max_14_characters'),
    email: yup.string().required('enter_email').email('enter_valid_email'),
});

export default requestQuestionValidation;
