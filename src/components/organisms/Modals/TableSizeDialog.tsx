import { useEffect, useState } from 'react';
import { Button, DialogActions, Dialog, Box, IconButton, ClickAwayListener } from '@mui/material';
import { Color, Colors } from 'colors';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';

interface Props {
    string; // Assuming `string` is used for the close button text
    onClose: () => void;
    fullWidth: boolean;
    closeAvailable: boolean;
    onSubmit: () => void;
}

const TableSizeDialog = ({ string, onClose, fullWidth, closeAvailable, onSubmit }: Props) => {
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
                        width: 'fit-content',
                        maxWidth: '100vh',
                    },
                }}
            >
                <DialogContent sx={{ p: 0 }}>
                    <img
                        style={{ width: 'auto', maxHeight: '80vh' }} // Set image width to 100% of content area
                        src={require(`assets/img/table_sizes_eg.png`)}
                        alt="Broken Img"
                    />
                </DialogContent>
                <DialogActions sx={{ py: 2, my: 0, px: 3, flexWrap: 'wrap' }}>
                    <Button variant="contained" type="submit">
                        {string?.close}
                    </Button>
                </DialogActions>
            </Dialog>
        </ClickAwayListener>
    );
};

export default TableSizeDialog;
