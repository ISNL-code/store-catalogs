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
import { Colors } from 'colors';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const SuccessComponent = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 100 }} color="success" />
    </Box>
);

const ErrorComponent = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <WarningAmberIcon sx={{ fontSize: 100 }} color="error" />
    </Box>
);

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
    fullWidth: boolean;
    closeAvailable: boolean;
    onSubmit: () => void;
    component: 'success request' | 'bad request';
}

const InfoDialog = ({
    variant,
    string,
    title,
    description,
    onClose,
    fullWidth,
    closeAvailable,
    onSubmit,
    component,
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
                        maxWidth: 440,
                    },
                }}
            >
                <Box
                    px={2}
                    py={0.5}
                    sx={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: getBackgroundColor(variant) }}
                >
                    <Box>
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
                {title && <DialogTitle sx={{ fontSize: 20, color: 'gray', py: 0, my: 0 }}>{title} </DialogTitle>}
                {component === 'success request' && <SuccessComponent />}
                {component === 'bad request' && <ErrorComponent />}
                {description && (
                    <DialogContentText sx={{ py: 0, my: 0, px: 3, textAlign: 'center' }}>
                        {description}
                    </DialogContentText>
                )}

                <DialogActions sx={{ py: 2, my: 0, px: 3, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                        <Button variant="contained" onClick={handleClose}>
                            {string?.ok}
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </ClickAwayListener>
    );
};

export default InfoDialog;
