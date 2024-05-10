import * as yup from 'yup';

const requestQuestionValidation = yup.object().shape({
    comment: yup.string().required('required'),
    phone: yup.string().required('required').min(7, 'not valid'),
    email: yup.string().required('required').email('not valid'),
});

export default requestQuestionValidation;
