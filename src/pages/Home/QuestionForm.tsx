import * as React from 'react';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel, MenuItem, FormControl, InputAdornment } from '@mui/material';
import { StyledSelect } from './StyledSelect';
import { StoresContextInterface } from 'types';
import { useOutletContext } from 'react-router-dom';
import { StyledTextField } from './StyledTextField';
import { useFormik } from 'formik';
import requestCatalogValidation from 'Validation/requestCatalogValidation';
import axios from 'axios';

export default function QuestionForm({ values, isOpen = false, setIsOpen, setOpenSuccessModal }) {
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
        setFormValues({ ...formValues, ...values });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, values]);

    const formik = useFormik({
        initialValues: {
            subject: '',
            plan: '',
            name: '',
            phone: '',
            email: '',
            comment: '',
        },
        validationSchema: requestCatalogValidation,
        onSubmit: values => {
            handleClose();
            try {
                const token = '6904212535:AAGvPEjkJds0aayd-oD1YVMbhLKeKt72yaE';
                const chatId = '480774886'; // Узнайте ваш Chat ID, написав своему боту /myid
                const url = `https://api.telegram.org/bot${token}/sendMessage`;

                axios.post(url, {
                    chat_id: chatId,
                    text: `Вопрос, Привет, меня зовут ${values.name || '<Заказчик>'}, мои контакты: email:${
                        values.email || '<не указан>'
                    }, тел: ${values.phone || '<не указан>'}, я хочу ${values.subject} по тарифу ${
                        values.plan || '<не указан>'
                    }, вопрос: ${values.comment || '<не оставил>'}`,
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
            subject: '',
            plan: '',
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
                <DialogTitle sx={{ fontSize: 24 }}>{string?.ask_question}:</DialogTitle>
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
                        error={Boolean(formik.errors.phone && formik.touched.phone)}
                        helperText={string?.enter_valid_email}
                    />

                    <StyledTextField
                        value={formValues.comment || ''}
                        onChange={e => {
                            setFormValues(prev => {
                                return { ...prev, comment: e.target.value };
                            });
                        }}
                        label={string?.question}
                        size="small"
                        fullWidth
                        error={false}
                        helperText={''}
                        multiline
                        minRows={2}
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
