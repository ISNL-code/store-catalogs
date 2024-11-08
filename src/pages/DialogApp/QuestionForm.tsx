import { useFormik } from 'formik';
import requestQuestionValidation from 'utils/validation/requestQuestionValidation';
import FormDialog from 'components/organisms/Modals/FormDialog';
import { Fragment, useEffect, useState } from 'react';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { DialogStateInterface } from 'types/app_models';
import { telegramSender } from 'utils/telegramSender';

interface Props {
    isOpen: boolean;
    setIsOpen;
    string;
    dialogState?: DialogStateInterface | null;
}

export default function QuestionForm({ isOpen, setIsOpen, string }: Props) {
    const [formValues, setFormValues] = useState<any>({
        contacts: '',
        email: '',
        question: '',
    });

    useEffect(() => {
        setFormValues({ ...formValues });
    }, [isOpen]); // eslint-disable-line

    const formik = useFormik({
        initialValues: {
            contacts: '',
            email: '',
            question: '',
        },
        validationSchema: requestQuestionValidation,
        onSubmit: values => {
            handleClose();
            telegramSender({
                action: `ФОРМА ОБРАТНОЙ СВЯЗИ`,
                name: 'feedback_form',
                contacts: `email:${values.email}, other_contacts: ${values.contacts}`,
                text: `question: ${values.question}`,
            });
            setIsOpen(DialogWindowType?.SUCCESS_REQUEST);
        },
    });

    useEffect(() => {
        formik.setValues(formValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues]);

    const handleClose = () => {
        setIsOpen(false);
        setFormValues({
            contacts: '',
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
                        contacts: '',
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
                        type: 'email',
                        label: string?.email + '*',
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
                        label: string?.contacts,
                        value: formValues.phone || '',
                        onChange: val =>
                            setFormValues(prev => {
                                return { ...prev, phone: val };
                            }),
                        type: 'tel',
                        error: formik.errors.contacts && formik.touched.contacts,
                        helperText: string?.[formik.errors.contacts || ''],
                        trim: false,
                    },
                    {
                        component: 'textfield',
                        type: 'text',
                        label: string?.question + '*',
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
