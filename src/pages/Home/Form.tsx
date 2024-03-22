import * as React from 'react';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel, MenuItem, FormControl } from '@mui/material';
import { StyledSelect } from './StyledSelect';
import { StoresContextInterface } from 'types';
import { useOutletContext } from 'react-router-dom';
import { StyledTextField } from './StyledTextField';
import { useFormik } from 'formik';
import requestCatalogValidation from 'Validation/requestCatalogValidation';
import { ACCESS_TOKEN_KEY } from 'constants/constants';

export default function Form({ values, isOpen = false, setIsOpen, setPlan }) {
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
        setPlan({ subject: '', plan: '' });
    };

    const handleSend = async event => {
        Email.send({
            Host: 'smtp.elasticemail.com',
            Username: 'username',
            Password: 'password',
            To: 'them@website.com',
            From: 'you@isp.com',
            Subject: 'This is the subject',
            Body: 'And this is the body',
        }).then(message => alert(message));
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
                        handleSend(event);
                    },
                }}
            >
                <DialogTitle sx={{ fontSize: 24 }}>{string?.request}:</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <FormControl
                        error={Boolean(formik.errors.subject && formik.touched.subject)}
                        fullWidth
                        size="small"
                        sx={{ mt: 1 }}
                    >
                        <InputLabel sx={{ color: '#898B9B' }}>{string?.i_want}</InputLabel>
                        <StyledSelect
                            variant="outlined"
                            value={formValues.subject || ''}
                            onChange={e => {
                                setFormValues(prev => {
                                    return { ...prev, subject: e.target.value };
                                });
                            }}
                            label={string?.i_want}
                            fullWidth
                        >
                            {[string?.request_catalog, string?.consultation, string?.request_example].map((el, idx) => (
                                <MenuItem key={idx} value={el}>
                                    {el}
                                </MenuItem>
                            ))}
                        </StyledSelect>
                    </FormControl>
                    <FormControl error={false} fullWidth size="small" sx={{ mt: 1 }}>
                        <InputLabel sx={{ color: '#898B9B' }}>{string?.plan}</InputLabel>
                        <StyledSelect
                            variant="outlined"
                            label={string?.plan}
                            value={formValues.plan || ''}
                            onChange={e => {
                                setFormValues(prev => {
                                    return { ...prev, plan: e.target.value };
                                });
                            }}
                            fullWidth
                        >
                            {['Start', 'Pro', 'Unlim'].map((el, idx) => (
                                <MenuItem key={idx} value={el}>
                                    {el}
                                </MenuItem>
                            ))}
                        </StyledSelect>
                    </FormControl>
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
                        helperText={''}
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
                        error={false}
                        helperText={''}
                    />

                    <StyledTextField
                        value={formValues.comment || ''}
                        onChange={e => {
                            setFormValues(prev => {
                                return { ...prev, comment: e.target.value };
                            });
                        }}
                        label={string?.comment}
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
