import { useEffect, useState } from 'react';
import { Dialog, ClickAwayListener, IconButton, CircularProgress, Box, Typography } from '@mui/material';
import { Color, Colors } from 'constants/colors';
import DialogContent from '@mui/material/DialogContent';
import { DialogStateInterface } from 'types/app_models';
import CloseIcon from '@mui/icons-material/Close';
import SizesIndicatorButton from 'components/atoms/SizesIndicatorButton/SizesIndicatorButton';
import { useDevice } from 'hooks/useDevice';

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
    const { sm } = useDevice();

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
                                position: 'relative',
                            },
                        }}
                    >
                        {closeAvailable && (
                            <IconButton
                                sx={{
                                    backgroundColor: Colors?.WHITE,
                                    '&:hover': { backgroundColor: Colors?.WHITE },

                                    display: 'flex',
                                    justifyContent: 'center',
                                    border: '1px solid #ccc',
                                    m: 1,
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                }}
                                onClick={() => {
                                    handleClose();
                                }}
                                size="small"
                            >
                                <CloseIcon sx={{ fontSize: 20 }} />
                            </IconButton>
                        )}
                        <Box
                            sx={{
                                width: '100%',
                                backgroundColor: Color?.PRIMARY_LIGHT,
                            }}
                        >
                            <Box sx={{ width: 'fit-content', px: 1 }}>
                                <Typography
                                    sx={{
                                        color: Color?.SECONDARY_DARK,
                                        py: 0.25,
                                        my: 0.25,
                                        px: 0.5,
                                        fontSize: 12,
                                        fontWeight: 700,
                                        backgroundColor: Colors?.WHITE,
                                        width: 'fit-content',
                                        borderRadius: 1,
                                    }}
                                >
                                    {string?.available_sizes}
                                </Typography>
                                <Box sx={{ display: 'flex', pb: 0.5, gap: 0.25 }}>
                                    {dialogState?.availableSizes?.map((el, idx) => (
                                        <SizesIndicatorButton
                                            key={idx}
                                            size={sm ? 28 : 38}
                                            selected={false}
                                            disabled={true}
                                            label={el?.name || el?.code || ''}
                                        />
                                    ))}
                                </Box>
                            </Box>
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
