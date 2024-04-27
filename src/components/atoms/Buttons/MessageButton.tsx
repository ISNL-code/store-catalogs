import { Box, Fab, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';

const MessageButton = ({ from = 'catalog', action }) => {
    const { string }: any = useOutletContext();
    const { sx, s } = useDevice();

    return (
        <Box
            sx={{
                opacity: 0.85,
                zIndex: 2000,
                position: 'fixed',
                right: sx ? '75px' : '40px',
                bottom: sx ? 80 : 75,
                width: 'fit-content',
                border: sx ? 'none' : '1px solid #3486d8',
                backgroundColor: sx ? 'none' : '#5396da',
                borderRadius: 50,
                p: s ? 0 : 0.25,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
            }}
            onClick={() => {
                action();
            }}
        >
            {!sx && (
                <Typography
                    m={0.75}
                    sx={{ fontSize: 12, fontWeight: '700', color: '#fff', minWidth: 80, textAlign: 'center' }}
                >
                    {string?.message}
                </Typography>
            )}
            <Fab
                size={sx || from === 'landing' ? 'medium' : 'small'}
                sx={{
                    p: 2,
                    backgroundColor: '#ffffff',
                    animation: `fadeIn 4s infinite ease`,
                    border: '1px solid #ccc',
                    boxShadow: '0 0 5px 2px #1976d2',
                }}
            >
                <SendIcon color="primary" />
            </Fab>
        </Box>
    );
};

export default MessageButton;
