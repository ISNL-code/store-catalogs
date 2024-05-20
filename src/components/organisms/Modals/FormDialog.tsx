import { useEffect, useState } from 'react';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Dialog,
    DialogContentText,
    Box,
    IconButton,
    ClickAwayListener,
    InputAdornment,
    Autocomplete,
    TextField,
    Divider,
    Typography,
} from '@mui/material';
import { Colors } from 'colors';
import CloseIcon from '@mui/icons-material/Close';
import { StyledTextField } from 'components/molecules/StyledComponents/StyledTextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RefreshIcon from '@mui/icons-material/Refresh';

const getBackgroundColor = variant => {
    switch (variant) {
        case 'info':
            return Colors.BLUE;
        case 'warning':
            return Colors.ORANGE;
        case 'error':
            return Colors.RED;
        case 'success':
            return Colors.GREEN;
        default:
            return Colors.GRAY;
    }
};

interface Props {
    variant: 'info' | 'warning' | 'error' | 'success';
    string;
    link: { name: string; action: () => void } | null;
    title: string | null;
    description: string | null;
    onClose: () => void;
    onRefresh: () => void;
    fullWidth: boolean;
    error: { text: string; shown: boolean } | null;
    fields:
        | {
              type: 'text' | 'tel' | 'number' | 'password' | 'email';
              component: 'textfield' | 'autocomplete';
              label: string | null;
              value: string | null;
              onChange: (val) => void;
              error?: string | boolean | null;
              helperText: string | null;
              trim: boolean;
              options?: { value: string; label: string }[];
          }[]
        | null;
    buttons: { type: 'link' | 'submit' | 'close' | 'action'; name?: string; action?: () => void }[] | null;
    closeAvailable: boolean;
    onSubmit: () => void;
}

const FormDialog = ({
    link,
    variant,
    string,
    title,
    description,
    onClose,
    fullWidth,
    fields,
    buttons,
    closeAvailable,
    onSubmit,
    error,
    onRefresh,
}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    useEffect(() => {
        if (!open) return () => onRefresh();
    }, [open]);

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <ClickAwayListener
            onClickAway={() => {
                if (closeAvailable) handleClose();
            }}
            mouseEvent={false}
            touchEvent={false}
        >
            <Dialog
                sx={{ zIndex: 2000 }}
                BackdropProps={{ style: { zIndex: 5000 } }}
                open={open}
                fullWidth={fullWidth}
                onClose={() => {
                    if (closeAvailable) handleClose();
                }}
                hideBackdrop
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        onSubmit();
                    },
                    sx: {
                        borderRadius: 4,
                        overflow: 'hidden',
                        border: `0.5px solid ${Colors?.GRAY_300}`,
                        maxWidth: 550,
                    },
                }}
            >
                <Box
                    px={2}
                    py={0.5}
                    sx={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: getBackgroundColor(variant) }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
                        {onRefresh && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IconButton
                                    sx={{
                                        backgroundColor: Colors?.WHITE,
                                        '&:hover': { backgroundColor: Colors?.WHITE },
                                        width: 26,
                                        height: 26,
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                    onClick={() => {
                                        onRefresh();
                                    }}
                                >
                                    <RefreshIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                                <Typography sx={{ color: Colors?.WHITE }}>{string?.clear_form}</Typography>
                            </Box>
                        )}
                        {closeAvailable && (
                            <IconButton
                                sx={{
                                    backgroundColor: Colors?.WHITE,
                                    '&:hover': { backgroundColor: Colors?.WHITE },
                                    width: 26,
                                    height: 26,
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                                onClick={() => {
                                    handleClose();
                                }}
                            >
                                <CloseIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                        )}
                    </Box>
                </Box>
                {title && (
                    <DialogTitle sx={{ fontSize: 20, color: 'gray', pb: description ? 0 : 2 }}>{title} </DialogTitle>
                )}
                {description && (
                    <DialogContentText sx={{ px: 3, pt: 3, pb: buttons ? 0 : 3 }}>{description}</DialogContentText>
                )}
                {error?.shown && (
                    <DialogContentText sx={{ px: 6, mt: 1, textAlign: 'center', color: Colors?.RED }}>
                        {error?.text}
                    </DialogContentText>
                )}
                {fields?.length && (
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {fields?.map((item, idx) => {
                            if (item?.component === 'textfield')
                                return (
                                    <Box key={idx} pt={1}>
                                        <StyledTextField
                                            value={item?.value || ''}
                                            onChange={e => {
                                                if (item?.trim) {
                                                    item?.onChange(e?.target?.value.trim() as string);
                                                } else item?.onChange(e?.target?.value as string);
                                            }}
                                            type={
                                                item?.type === 'password'
                                                    ? passwordVisible
                                                        ? 'text'
                                                        : 'password'
                                                    : item?.type || 'text'
                                            }
                                            label={item?.label}
                                            size="small"
                                            fullWidth
                                            error={Boolean(item?.error)}
                                            helperText={item?.error && item?.helperText}
                                            InputProps={{
                                                endAdornment:
                                                    item?.type === 'password' ? (
                                                        <InputAdornment
                                                            sx={{ cursor: 'pointer' }}
                                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                                            position="end"
                                                        >
                                                            {passwordVisible ? (
                                                                <VisibilityOffIcon />
                                                            ) : (
                                                                <VisibilityIcon />
                                                            )}
                                                        </InputAdornment>
                                                    ) : (
                                                        <></>
                                                    ),
                                            }}
                                        />
                                    </Box>
                                );
                            if (item?.component === 'autocomplete' && item.options) {
                                return (
                                    <Box key={idx} pt={1}>
                                        <Autocomplete
                                            isOptionEqualToValue={(option, value) => option === value || value === ''}
                                            size="small"
                                            disablePortal
                                            value={item?.value}
                                            options={item.options?.map(el => el.value)}
                                            getOptionLabel={option =>
                                                item?.options?.find(el => el.value === option)?.label || ''
                                            }
                                            renderInput={params => (
                                                <TextField
                                                    {...params}
                                                    label={item?.label}
                                                    error={Boolean(item?.error)}
                                                    helperText={item?.error && item?.helperText}
                                                />
                                            )}
                                            onChange={(_e, newValue) => {
                                                const autocomplete = item?.options?.find(
                                                    el => el.label === newValue
                                                )?.value;

                                                item?.onChange(autocomplete || newValue);
                                            }}
                                            onInputChange={(_e, newValue) => {
                                                const autocomplete = item?.options?.find(
                                                    el => el.label === newValue
                                                )?.value;

                                                item?.onChange(autocomplete || newValue);
                                            }}
                                            fullWidth
                                            slotProps={{
                                                popper: {
                                                    autoSave: 'false',
                                                    placement: 'top-start',
                                                    modifiers: [
                                                        {
                                                            name: 'preventOverflow',
                                                            enabled: true,
                                                            options: {
                                                                boundaries: 'viewport',
                                                                tether: true,
                                                            },
                                                        },
                                                    ],
                                                },
                                            }}
                                        />
                                    </Box>
                                );
                            }
                            return null;
                        })}
                    </DialogContent>
                )}

                {buttons && (
                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                            {buttons?.map((item, idx) => {
                                if (item?.type === 'close') {
                                    return (
                                        <Button
                                            variant="outlined"
                                            key={idx}
                                            onClick={() => {
                                                handleClose();
                                            }}
                                            sx={{ flexGrow: 1 }}
                                        >
                                            {string?.cancel}
                                        </Button>
                                    );
                                }
                                if (item?.type === 'action') {
                                    return (
                                        <Button
                                            variant="outlined"
                                            key={idx}
                                            onClick={() => {
                                                handleClose();
                                                if (item?.action) item?.action();
                                            }}
                                            sx={{ flexGrow: 1 }}
                                        >
                                            {item?.name}
                                        </Button>
                                    );
                                }
                                if (item?.type === 'submit') {
                                    return (
                                        <Button variant="contained" key={idx} type="submit">
                                            {item?.name || string?.submit}
                                        </Button>
                                    );
                                }

                                return null;
                            })}
                        </Box>
                    </DialogActions>
                )}
                {link && (
                    <>
                        <Divider />
                        <DialogActions sx={{ px: 3, py: 0.5, width: '100%', justifyContent: 'center' }}>
                            <Button
                                onClick={() => {
                                    link.action();
                                }}
                            >
                                {link?.name}
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </ClickAwayListener>
    );
};

export default FormDialog;
