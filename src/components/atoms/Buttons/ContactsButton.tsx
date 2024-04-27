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
                opacity: 0.85,
                zIndex: 2000,
                position: 'fixed',
                right: sx ? '16px' : '40px',
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
                    zIndex: 2000,
                    backgroundColor: '#ffffff',
                    animation: `fadeIn 4s infinite ease`,
                    border: '1px solid #ccc',
                    boxShadow: '0 0 5px 2px #19d219',
                }}
            >
                <PhoneCallbackIcon color="success" sx={{ zIndex: 2000 }} />
            </Fab>
        </Box>
    );
};

export default ContactsButton;
