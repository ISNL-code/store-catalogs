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

export default function Form({ values, isOpen = false, setIsOpen }) {
    const { string }: StoresContextInterface = useOutletContext();
    const [formValues, setFormValues] = React.useState({});
    const [open, setOpen] = React.useState(isOpen);

    React.useEffect(() => {
        setOpen(isOpen);
        console.log(formValues);
    }, [isOpen, formValues]);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setIsOpen(false);
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
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Замовлення:</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <FormControl error={false} fullWidth size="small" sx={{ mt: 1 }}>
                        <InputLabel sx={{ color: '#898B9B' }}>Я хочу</InputLabel>
                        <StyledSelect
                            variant="outlined"
                            value={'' || ''}
                            label="Я хочу"
                            onChange={e => {
                                setFormValues({});
                            }}
                            fullWidth
                        >
                            {['Замовити Каталог', 'Отримати Консультацiю', 'Замовити Зразок'].map((el, idx) => (
                                <MenuItem key={idx} value={el}>
                                    {el}
                                </MenuItem>
                            ))}
                        </StyledSelect>
                        {/* <FormHelperText>{formik.errors['role']}</FormHelperText> */}
                    </FormControl>
                    <FormControl error={false} fullWidth size="small" sx={{ mt: 1 }}>
                        <InputLabel sx={{ color: '#898B9B' }}>Тариф</InputLabel>
                        <StyledSelect
                            variant="outlined"
                            value={'' || ''}
                            label="Тариф"
                            onChange={e => {
                                setFormValues({});
                            }}
                            fullWidth
                        >
                            {['Start', 'Pro', 'Unlim'].map((el, idx) => (
                                <MenuItem key={idx} value={el}>
                                    {el}
                                </MenuItem>
                            ))}
                        </StyledSelect>
                        {/* <FormHelperText>{formik.errors['role']}</FormHelperText> */}
                    </FormControl>
                    <StyledTextField
                        value={'' || ''}
                        onChange={e => {
                            setFormValues({});
                        }}
                        label={string?.first_name}
                        size="small"
                        fullWidth
                        error={false}
                        helperText={''}
                    />
                    <StyledTextField
                        value={'' || ''}
                        onChange={e => {
                            setFormValues({});
                        }}
                        label={string?.phone_number}
                        size="small"
                        fullWidth
                        error={false}
                        helperText={''}
                    />
                    <StyledTextField
                        value={'' || ''}
                        onChange={e => {
                            setFormValues({});
                        }}
                        label="Email"
                        size="small"
                        fullWidth
                        error={false}
                        helperText={''}
                    />

                    <StyledTextField
                        value={'' || ''}
                        onChange={e => {
                            setFormValues({});
                        }}
                        label={'Коментар'}
                        size="small"
                        fullWidth
                        error={false}
                        helperText={''}
                        multiline
                        minRows={2}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{string?.cancel}</Button>
                    <Button type="submit">{string?.submit}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
