import { useFormik } from 'formik';
import requestQuestionValidation from 'Validation/requestQuestionValidation';
import axios from 'axios';
import { STORE_CONFIG } from 'store_constants/stores_config';
import FormDialog from 'components/organisms/Modals/FormDialog';
import { Fragment, useEffect, useState } from 'react';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { DialogStateInterface } from 'types/app_models';

interface Props {
    isOpen: boolean;
    setIsOpen;
    string;
    dialogState?: DialogStateInterface | null;
}

export default function QuestionForm({ isOpen, setIsOpen, string, dialogState }: Props) {
    const { STORE_NAME } = STORE_CONFIG;
    const [formValues, setFormValues] = useState<any>({
        subject: '',
        plan: '',
        name: '',
        phone: '',
        email: '',
        question: '',
    });

    useEffect(() => {
        setFormValues({ ...formValues });
    }, [isOpen]); // eslint-disable-line

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            question: '',
        },
        validationSchema: requestQuestionValidation,
        onSubmit: values => {
            handleClose();
            try {
                const token = '6904212535:AAGvPEjkJds0aayd-oD1YVMbhLKeKt72yaE';
                const chatId = '480774886'; // Узнайте ваш Chat ID, написав своему боту /myid
                const url = `https://api.telegram.org/bot${token}/sendMessage`;

                axios.post(url, {
                    chat_id: chatId,
                    text: `${dialogState?.note || STORE_NAME}|Вопрос, Привет, меня зовут ${
                        values.name || '<Заказчик>'
                    }, мои контакты: email: ${values.email}, тел: ${values.phone}, 
                     вопрос: ${values.question}`,
                });
                setIsOpen(DialogWindowType?.SUCCESS_REQUEST);
            } catch (error) {}
        },
    });

    useEffect(() => {
        formik.setValues(formValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues]);

    const handleClose = () => {
        setIsOpen(false);
        setFormValues({
            name: '',
            phone: '',
            email: '',
            question: '',
        });
    };

    if (!isOpen) return null;

    return (
        <Fragment>
            <FormDialog
                link={null}
                variant="info"
                string={string}
                title={null}
                onClose={() => setIsOpen(null)}
                onRefresh={() => {
                    formik.resetForm(); // Reset form errors and values
                    setFormValues({
                        name: '',
                        phone: '',
                        email: '',
                        question: '',
                    });
                }}
                fullWidth
                buttons={[{ type: 'submit', name: string?.send }]}
                onSubmit={() => formik.handleSubmit()}
                description={string?.question_form_message}
                closeAvailable
                error={null}
                fields={[
                    {
                        component: 'textfield',
                        type: 'text',
                        label: string?.first_name,
                        value: formValues.name || '',
                        onChange: val =>
                            setFormValues(prev => {
                                return { ...prev, name: val };
                            }),
                        trim: true,
                        error: null,
                        helperText: null,
                    },
                    {
                        component: 'textfield',
                        label: string?.phone_number,
                        value: formValues.phone || '',
                        onChange: val =>
                            setFormValues(prev => {
                                return { ...prev, phone: val };
                            }),
                        type: 'tel',
                        error: formik.errors.phone && formik.touched.phone,
                        helperText: string?.[formik.errors.phone || ''],
                        trim: true,
                    },
                    {
                        component: 'textfield',
                        type: 'email',
                        label: string?.email,
                        value: formValues.email || '',
                        onChange: val =>
                            setFormValues(prev => {
                                return { ...prev, email: val };
                            }),
                        error: formik.errors.email && formik.touched.email,
                        helperText: string?.[formik.errors.email || ''],
                        trim: true,
                    },
                    {
                        component: 'textfield',
                        type: 'text',
                        label: string?.question,
                        value: formValues.question || '',
                        onChange: val =>
                            setFormValues(prev => {
                                return { ...prev, question: val };
                            }),
                        error: formik.errors.question && formik.touched.question,
                        helperText: string?.[formik.errors.question || ''],
                        trim: false,
                    },
                ]}
            />
        </Fragment>
    );
}
