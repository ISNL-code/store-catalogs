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
                zIndex: 2000,
                position: 'fixed',
                right: 24,
                bottom: sx && from !== 'landing' ? 80 : 80,
                width: 'fit-content',
                border: sx ? 'none' : '1px solid #1976d2',
                backgroundColor: sx ? 'none' : '#1976d2',
                borderRadius: 50,
                p: s ? 0 : 0.25,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                opacity: 0.75,
            }}
            onClick={() => {
                action();
            }}
        >
            {!sx && (
                <Typography m={0.75} sx={{ fontSize: 12, fontWeight: '700', color: '#fff' }}>
                    {string?.question}
                </Typography>
            )}
            <Fab
                size={sx || from === 'landing' ? 'medium' : 'small'}
                sx={{
                    p: 2,
                    backgroundColor: '#ffffff',
                    // '@keyframes fadeIn': {
                    //     '0%': { transform: 'translate(2px,2px)' },
                    //     '1%': { transform: 'translate(-2px,2px)' },
                    //     '2%': { transform: 'translate(2px,2px)' },
                    //     '3%': { transform: 'translate(-2px,-2px)' },
                    //     '5%': { transform: 'translate(2px,-2px)' },
                    //     '7%': { transform: 'translate(2px,2px)' },
                    //     '9%': { transform: 'translate(2px,-2px)' },
                    //     '12%': { transform: 'translate(2px,0)' },
                    //     '14%': { transform: 'translate(0,0)' },
                    //     '100%': { transform: 'translate(0,0)' },
                    // },

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
