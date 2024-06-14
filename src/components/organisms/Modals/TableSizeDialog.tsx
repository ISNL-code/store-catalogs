import { useEffect, useState } from 'react';
import { Button, DialogActions, Dialog, ClickAwayListener } from '@mui/material';
import { Colors } from 'constants/colors';
import DialogContent from '@mui/material/DialogContent';
import { useDevice } from 'hooks/useDevice';
import { DialogStateInterface } from 'types/app_models';

interface Props {
    string; // Assuming `string` is used for the close button text
    onClose: () => void;
    closeAvailable: boolean;
    onSubmit: () => void;
    dialogState?: DialogStateInterface | null;
}

const TableSizeDialog = ({ string, onClose, closeAvailable, onSubmit, dialogState }: Props) => {
    const { sx } = useDevice();
    const [open, setOpen] = useState<boolean>(false);
    const [imgLoaded, setImgLoaded] = useState(false);

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
                sx={{ zIndex: 4500, width: '100vw', opacity: imgLoaded ? 1 : 0 }}
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
                        maxWidth: '90vw',
                        m: 0,
                    },
                }}
            >
                <DialogContent sx={{ p: 0 }}>
                    <img
                        style={{ width: 'auto', maxHeight: sx ? '55vh' : '75vh' }} // Set image width to 100% of content area
                        src={dialogState?.imageUrl}
                        alt="Loading..."
                        onLoad={event => {
                            setImgLoaded(!event?.bubbles);
                        }}
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
