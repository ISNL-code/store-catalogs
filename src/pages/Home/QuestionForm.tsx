import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { StoresContextInterface } from 'types';
import { useOutletContext } from 'react-router-dom';
import { useFormik } from 'formik';
import requestQuestionValidation from 'Validation/requestQuestionValidation';
import axios from 'axios';
import { StyledTextField } from 'components/molecules/StyledComponents/StyledTextField';
import { STORE_CONFIG } from 'constants/stores_config';

export default function QuestionForm({ isOpen = false, setIsOpen, setOpenSuccessModal }) {
    const { STORE_NAME } = STORE_CONFIG;
    const { string }: StoresContextInterface = useOutletContext();
    const [formValues, setFormValues] = React.useState<any>({
        subject: '',
        plan: '',
        name: '',
        phone: '',
        email: '',
        question: '',
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
                    text: `${STORE_NAME}|Вопрос, Привет, меня зовут ${
                        values.name || '<Заказчик>'
                    }, мои контакты: email: ${values.email}, тел: ${values.phone}, 
                     вопрос: ${values.question}`,
                });
                setOpenSuccessModal(true);
            } catch (error) {}
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
            question: '',
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
                <DialogTitle sx={{ fontSize: 20, color: 'gray' }}>{string?.message}: </DialogTitle>
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
                        helperText={formik.errors.phone && string[formik.errors.phone]}
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
                        helperText={formik.errors.email && string[formik.errors.email]}
                    />

                    <StyledTextField
                        value={formValues.question || ''}
                        onChange={e => {
                            setFormValues(prev => {
                                return { ...prev, question: e.target.value };
                            });
                        }}
                        label={string?.question}
                        size="small"
                        fullWidth
                        error={Boolean(formik.errors.question && formik.touched.question)}
                        helperText={formik.errors.question && string[formik.errors.question]}
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
                    <Button type="submit">{string?.send}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
