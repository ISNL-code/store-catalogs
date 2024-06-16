import { useEffect, useState } from 'react';
import { Dialog, ClickAwayListener, Box, IconButton, CircularProgress } from '@mui/material';
import { Color, Colors } from 'constants/colors';
import DialogContent from '@mui/material/DialogContent';
import { DialogStateInterface } from 'types/app_models';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    string; // Assuming `string` is used for the close button text
    onClose: () => void;
    closeAvailable: boolean;
    onSubmit: () => void;
    dialogState?: DialogStateInterface | null;
}

const TableSizeDialog = ({ string, onClose, closeAvailable, onSubmit, dialogState }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [imgLoaded, setImgLoaded] = useState(false);

    const handleClose = () => {
        setOpen(false);
        onClose();
        setImgLoaded(false);
    };

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <>
            {!imgLoaded && (
                <CircularProgress
                    sx={{
                        color: Color?.PRIMARY,
                        zIndex: 5000,
                        position: 'fixed',
                        top: '50%',
                        left: '46%',

                        p: 0,
                        m: 0,
                    }}
                    thickness={2}
                />
            )}

            <ClickAwayListener
                onClickAway={() => {
                    if (closeAvailable) handleClose();
                }}
                mouseEvent={false}
                touchEvent={false}
            >
                <>
                    <Dialog
                        sx={{
                            zIndex: 4500,
                            opacity: imgLoaded ? 1 : 0,
                        }}
                        open={open}
                        onClose={() => {
                            if (closeAvailable) handleClose();
                        }}
                        PaperProps={{
                            sx: {
                                borderRadius: 4,
                                overflow: 'hidden',
                                border: `0.5px solid ${Colors?.GRAY_300}`,
                                mx: 0.5,
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1, width: '100%' }}>
                            {closeAvailable && (
                                <IconButton
                                    sx={{
                                        backgroundColor: Colors?.WHITE,
                                        '&:hover': { backgroundColor: Colors?.WHITE },
                                        width: 26,
                                        height: 26,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        border: '1px solid #ccc',
                                        m: 1,
                                    }}
                                    onClick={() => {
                                        handleClose();
                                    }}
                                >
                                    <CloseIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                            )}
                        </Box>
                        <DialogContent
                            sx={{
                                p: 0,
                                display: 'flex',
                                alignItems: 'baseline',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                style={{ maxWidth: '100vw', width: '100%' }}
                                src={dialogState?.imageUrl}
                                alt="Loading..."
                                onLoad={event => {
                                    setImgLoaded(!event?.bubbles);
                                }}
                            />
                        </DialogContent>
                    </Dialog>
                </>
            </ClickAwayListener>
        </>
    );
};

export default TableSizeDialog;
