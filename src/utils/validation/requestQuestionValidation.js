import * as yup from 'yup';

const requestQuestionValidation = yup.object().shape({
    question: yup.string().required('required_field'),
    email: yup.string().required('enter_email').email('enter_valid_email'),
});

export default requestQuestionValidation;
