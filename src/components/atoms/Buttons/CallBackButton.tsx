import { Box, Fab, Typography } from '@mui/material';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import { Colors } from 'colors';

const CallBackButton = ({ animated = false, path }) => {
    const { string }: any = useOutletContext();
    const { sx, s } = useDevice();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: sx ? 'fit-content' : 140,
                zIndex: 2000,
                position: 'fixed',
                right: sx ? '24px' : '40px',
                bottom: sx ? 90 : 10,
                border: sx ? 'none' : '1px solid ',
                borderColor: Colors?.GREEN,
                backgroundColor: sx ? 'none' : Colors?.GREEN,
                opacity: 0.75,
                borderRadius: 50,
                p: s ? 0 : 0.25,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
            }}
            onClick={() => {
                navigate(`${path}contacts`);
            }}
        >
            {!sx && (
                <Typography
                    m={0.75}
                    sx={{ fontSize: 12, fontWeight: '700', color: '#fff', minWidth: 80, textAlign: 'center' }}
                >
                    {string?.contacts}
                </Typography>
            )}
            <Fab
                size={sx ? 'medium' : 'small'}
                sx={{
                    p: 2,
                    backgroundColor: Colors?.WHITE,
                    animation: animated ? `fadeIn 4s infinite ease` : '',
                    border: '1px solid #ccc',
                    boxShadow: `0 0 5px 2px ${Colors?.GREEN}`,
                    '@keyframes fadeIn': {
                        '0%': { transform: 'translate(2px,2px)' },
                        '1%': { transform: 'translate(-2px,2px)' },
                        '2%': { transform: 'translate(2px,2px)' },
                        '3%': { transform: 'translate(-2px,-2px)' },
                        '5%': { transform: 'translate(2px,-2px)' },
                        '7%': { transform: 'translate(2px,2px)' },
                        '9%': { transform: 'translate(2px,-2px)' },
                        '12%': { transform: 'translate(2px,0)' },
                        '14%': { transform: 'translate(0,0)' },
                        '100%': { transform: 'translate(0,0)' },
                    },
                }}
            >
                <PhoneCallbackIcon color="success" />
            </Fab>
        </Box>
    );
};

export default CallBackButton;
