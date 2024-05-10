import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { StoresContextInterface } from 'types';
import { useOutletContext } from 'react-router-dom';
import { StyledTextField } from './StyledTextField';
import { useFormik } from 'formik';
import requestQuestionValidation from 'Validation/requestQuestionValidation';
import axios from 'axios';

export default function QuestionForm({ isOpen = false, setIsOpen, setOpenSuccessModal }) {
    const { string }: StoresContextInterface = useOutletContext();
    const [formValues, setFormValues] = React.useState<any>({
        subject: '',
        plan: '',
        name: '',
        phone: '',
        email: '',
        comment: '',
    });
    const [open, setOpen] = React.useState(isOpen);

    React.useEffect(() => {
        setOpen(isOpen);
        setFormValues({ ...formValues });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            comment: '',
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
                    text: `alberto_bini_europe|Вопрос, Привет, меня зовут ${
                        values.name || '<Заказчик>'
                    }, мои контакты: email: ${values.email || '<не указан>'}, тел: ${values.phone || '<не указан>'}, 
                     вопрос: ${values.comment || '<не оставил>'}`,
                });
                setOpenSuccessModal(true);
                console.log('Message sent successfully');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        },
    });

    React.useEffect(() => {
        formik.setValues(formValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues]);

    const handleClose = () => {
        setIsOpen(false);
        setFormValues({
            name: '',
            phone: '',
            email: '',
            comment: '',
        });
    };

    return (
        <React.Fragment>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        formik.handleSubmit();
                    },
                }}
            >
                <DialogTitle sx={{ fontSize: 20, color: 'gray' }}>{string?.support}</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <StyledTextField
                        value={formValues.name || ''}
                        onChange={e => {
                            setFormValues(prev => {
                                return { ...prev, name: e.target.value };
                            });
                        }}
                        label={string?.first_name}
                        size="small"
                        fullWidth
                        error={false}
                        helperText={''}
                        sx={{ mt: 1 }}
                    />
                    <StyledTextField
                        value={formValues.phone || ''}
                        onChange={e => {
                            setFormValues(prev => {
                                return { ...prev, phone: e.target.value };
                            });
                        }}
                        label={string?.phone_number}
                        size="small"
                        fullWidth
                        error={Boolean(formik.errors.phone && formik.touched.phone)}
                        helperText={string?.phone_length_minimum_7_characters}
                        type="number"
                    />
                    <StyledTextField
                        value={formValues.email || ''}
                        onChange={e => {
                            setFormValues(prev => {
                                return { ...prev, email: e.target.value };
                            });
                        }}
                        label={string?.email}
                        size="small"
                        fullWidth
                        error={Boolean(formik.errors.email && formik.touched.email)}
                        helperText={string?.enter_valid_email}
                    />

                    <StyledTextField
                        value={formValues.comment || ''}
                        onChange={e => {
                            setFormValues(prev => {
                                return { ...prev, comment: e.target.value };
                            });
                        }}
                        label={string?.ask_question}
                        size="small"
                        fullWidth
                        error={Boolean(formik.errors.comment && formik.touched.comment)}
                        helperText={''}
                        multiline
                        minRows={1}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        {string?.cancel}
                    </Button>
                    <Button type="submit">{string?.submit}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
