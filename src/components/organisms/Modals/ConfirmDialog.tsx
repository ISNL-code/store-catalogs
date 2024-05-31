import { useEffect, useState } from 'react';
import {
    Button,
    DialogActions,
    DialogTitle,
    Dialog,
    DialogContentText,
    Box,
    IconButton,
    ClickAwayListener,
} from '@mui/material';
import { Color, Colors } from 'constants/colors';
import CloseIcon from '@mui/icons-material/Close';

const getBackgroundColor = variant => {
    switch (variant) {
        case 'info':
            return Color.PRIMARY;
        case 'warning':
            return Colors.ORANGE;
        case 'error':
            return Color.ERROR;
        case 'success':
            return Color.PRIMARY;
        default:
            return Colors.GRAY;
    }
};

interface Props {
    variant: 'info' | 'warning' | 'error' | 'success';
    string;
    title: string | null;
    description: string | null;
    onClose: () => void;
    fullWidth: boolean;
    buttons: { type: 'link' | 'submit' | 'close' | 'action'; name?: string; action?: () => void }[];
    closeAvailable: boolean;
    onSubmit: () => void;
}

const ConfirmDialog = ({
    variant,
    string,
    title,
    description,
    onClose,
    fullWidth,
    buttons,
    closeAvailable,
    onSubmit,
}: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

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
                sx={{ zIndex: 4500 }}
                BackdropProps={{ style: { zIndex: 5000 } }}
                hideBackdrop
                open={open}
                fullWidth={fullWidth}
                onClose={() => {
                    if (closeAvailable) handleClose();
                }}
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
                        maxWidth: 440,
                    },
                }}
            >
                <Box
                    px={2}
                    py={0.5}
                    sx={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: getBackgroundColor(variant) }}
                >
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
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
                {title && <DialogTitle sx={{ fontSize: 20, color: 'gray' }}>{title} </DialogTitle>}
                {description && <DialogContentText sx={{ px: 3, mb: 4 }}>{description}</DialogContentText>}
                {buttons && (
                    <DialogActions sx={{ px: 3, pb: 2, flexWrap: 'wrap' }}>
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
            </Dialog>
        </ClickAwayListener>
    );
};

export default ConfirmDialog;
