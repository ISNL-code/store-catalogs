import { Box, ClickAwayListener, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Colors } from 'colors';

interface Props {
    children?;
    type?;
    title;
    text?;
    closeAction;
}

const ModalWindow = ({ children, type = '', title, text = '', closeAction = null }: Props) => {
    const headerColor = () => {
        if (type === 'warning') return 'linear-gradient(to right , #ed6c02 40%, #f08c52 65%, #ffb388);';
        if (type === 'error') return 'linear-gradient(to right , #ed2502 40%, #f07252 65%, #ffa088);';
        if (type === 'success') return 'linear-gradient(to right , green 40%, #30a72c 65%, #07c500);';
        return 'linear-gradient(to right , #1976d2 40%, #5ea1e4 65%, #5daeff);';
    };

    return (
        <ClickAwayListener
            disableReactTree
            onClickAway={() => {
                if (closeAction) closeAction();
            }}
            mouseEvent={false}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'fixed',
                    zIndex: 1001,
                    left: 0,
                    top: 0,
                    backgroundColor: '#cccccc0',
                }}
                onClick={e => {
                    e.stopPropagation();
                    if (closeAction) closeAction();
                }}
            >
                <Box
                    onClick={e => {
                        e.stopPropagation();
                        if (closeAction) closeAction();
                    }}
                    pb={4}
                    sx={{
                        width: '100%',
                        maxWidth: 500,
                        display: 'flex',
                        alignItems: 'center',
                        px: 3,
                    }}
                >
                    <Box
                        onClick={e => {
                            e.stopPropagation();
                        }}
                        sx={{
                            backgroundColor: '#fff',
                            width: '100%',
                            maxWidth: 500,
                            borderRadius: 4,
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            boxShadow: Colors?.SHADOW,
                            overflow: 'hidden',
                            border: `0.5px solid ${Colors?.GRAY_300}`,
                        }}
                    >
                        <Box
                            p={1.5}
                            px={2}
                            sx={{
                                width: '100%',
                                height: 34,
                                background: headerColor(),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                borderBottom: '1px solid #ccc',
                                overflow: 'hidden',
                            }}
                        >
                            {closeAction && (
                                <IconButton
                                    sx={{
                                        p: 0.25,
                                        border: '1px solid #ccc',
                                        background: '#fff',
                                        '&:hover': {
                                            backgroundColor: 'white',
                                        },
                                    }}
                                    onClick={() => {
                                        if (closeAction) closeAction();
                                    }}
                                    size="small"
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Box>
                        {(text || title) && (
                            <Box p={1.5} px={2} sx={{ flexGrow: 1 }}>
                                {title && (
                                    <Typography mb={2} variant="h3">
                                        {title}
                                    </Typography>
                                )}
                                {text && <Typography variant="h4">{text}</Typography>}
                                {children}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </ClickAwayListener>
    );
};

export default ModalWindow;
