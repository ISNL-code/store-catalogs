import { Box, Fab, Typography } from '@mui/material';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';

const ContactsButton = () => {
    const { string }: any = useOutletContext();
    const { sx, s } = useDevice();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                zIndex: 2000,
                position: 'fixed',
                right: sx ? '24px' : '40px',
                bottom: sx ? 80 : 20,
                width: 'fit-content',
                border: sx ? 'none' : '1px solid #44a041',
                backgroundColor: sx ? 'none' : 'green',
                borderRadius: 50,
                p: s ? 0 : 0.25,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
            }}
            onClick={() => {
                navigate(`/ALBERTO_BINI/alberto-bini/contacts`);
            }}
        >
            {!sx && (
                <Typography m={0.75} sx={{ fontSize: 14, fontWeight: '700', color: '#fff' }}>
                    {string?.contacts}
                </Typography>
            )}
            <Fab
                size={sx ? 'medium' : 'small'}
                sx={{
                    backgroundColor: '#ffffff',
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

                    animation: `fadeIn 4s infinite ease`,
                    border: '1px solid #ccc',
                }}
            >
                <PhoneCallbackIcon color="success" />
            </Fab>
        </Box>
    );
};

export default ContactsButton;
