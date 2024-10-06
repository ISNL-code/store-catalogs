import { Fragment, useEffect, useState } from 'react';
import {
    Button,
    DialogActions,
    DialogTitle,
    Dialog,
    DialogContentText,
    Box,
    IconButton,
    ClickAwayListener,
    Divider,
    Typography,
} from '@mui/material';
import { Color, Colors } from 'constants/colors';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import LinkIcon from '@mui/icons-material/Link';

const SuccessComponent = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 100 }} color="success" />
    </Box>
);

const ErrorComponent = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
        <WarningAmberIcon sx={{ fontSize: 100 }} color="error" />
    </Box>
);

const WarnComponent = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
        <RemoveShoppingCartIcon sx={{ fontSize: 100 }} color="error" />
    </Box>
);

const getBackgroundColor = variant => {
    switch (variant) {
        case 'info':
            return Color.PRIMARY;
        case 'warning':
            return Colors.ORANGE;
        case 'error':
            return Color?.ERROR;
        case 'success':
            return Color?.SUCCESS;
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
    component: 'success request' | 'bad request' | 'warning ordering' | 'content';
    content?: { title: string; description: string; link: string | null }[] | null;
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
    link,
    content,
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
                {title && <DialogTitle sx={{ fontSize: 20, py: 0, my: 2, color: '#000' }}>{title} </DialogTitle>}
                {component === 'success request' && <SuccessComponent />}
                {component === 'bad request' && <ErrorComponent />}
                {component === 'warning ordering' && <WarnComponent />}
                {description && (
                    <DialogContentText sx={{ py: 0, my: 0, px: 3, textAlign: 'center' }}>
                        {description}
                    </DialogContentText>
                )}
                {component === 'content' && (
                    <Box sx={{ px: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {content?.map((el, idx) => {
                            return (
                                <Box key={idx}>
                                    <Typography sx={{ color: '#000' }}>
                                        {idx + 1}
                                        {'. '}
                                        {el?.title}
                                    </Typography>
                                    <Box pl={2.2} mt={0.5}>
                                        <Typography sx={{ color: '#3a3a3a', fontSize: 14 }}>
                                            {el?.description}
                                        </Typography>
                                    </Box>
                                    {el?.link && (
                                        <IconButton
                                            onMouseDown={() => window.open(el?.link ? el?.link : '', '_blank')}
                                            component="span"
                                            size="small"
                                            sx={{
                                                '&:hover': { backgroundColor: Colors?.WHITE },
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <LinkIcon sx={{ color: Color.PRIMARY, fontSize: 24, fontWeight: 700 }} />
                                            <span
                                                style={{
                                                    color: Color.PRIMARY,
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                Cocktail E-Catalogs
                                            </span>
                                        </IconButton>
                                    )}
                                </Box>
                            );
                        })}
                    </Box>
                )}

                <DialogActions sx={{ py: 2, my: 0, px: 3, flexWrap: 'wrap' }}>
                    <Button variant="contained" type="submit">
                        {string?.ok}
                    </Button>
                </DialogActions>
                {link && (
                    <>
                        <Divider />
                        <DialogActions sx={{ px: 3, py: 0.5, width: '100%', justifyContent: 'center' }}>
                            <Button
                                onClick={() => {
                                    link.action();
                                }}
                                startIcon={<LinkIcon />}
                                sx={{ textTransform: 'uppercase', lineHeight: 1 }}
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

export default InfoDialog;
