import { Box, Fab, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import { Colors } from 'colors';

const MessageButton = ({ from = 'catalog', action }) => {
    const { string }: any = useOutletContext();
    const { sx, s } = useDevice();

    return (
        <Box
            sx={{
                width: sx ? 'fit-content' : 140,
                zIndex: 2000,
                position: 'fixed',
                right: sx ? '80px' : '40px',
                bottom: sx ? 90 : 60,
                border: sx ? 'none' : '1px solid',
                borderColor: Colors?.BLUE,
                backgroundColor: sx ? 'none' : Colors?.BLUE,
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
                    border: '1px solid #ccc',
                    boxShadow: `0 0 5px 2px ${Colors?.BLUE}`,
                }}
            >
                <SendIcon color="primary" />
            </Fab>
        </Box>
    );
};

export default MessageButton;
