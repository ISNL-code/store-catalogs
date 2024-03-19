import { Box, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { useNavigate } from 'react-router-dom';
import { PiMartiniLight } from 'react-icons/pi';

const StoresHeaderLogo = ({ headerHeight }) => {
    const navigate = useNavigate();
    const { xxs } = useDevice();
    return (
        <Box onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Box mt={1.8}>
                <PiMartiniLight fontSize={52} />
            </Box>

            <Box mt={1.2} sx={{ display: 'flex', gap: 0.25 }}>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 30, fontWeight: 600, color: '#DB4437' }}
                >
                    C
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 30, fontWeight: 600, color: '#4285F4' }}
                >
                    O
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 30, fontWeight: 600, color: '#FFA500' }}
                >
                    C
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 30, fontWeight: 600, color: '#673AB7' }}
                >
                    K
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 30, fontWeight: 600, color: '#0F9D58' }}
                >
                    T
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 30, fontWeight: 600, color: '#4285F4' }}
                >
                    A
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 30, fontWeight: 600, color: '#673AB7' }}
                >
                    I
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 30, fontWeight: 600, color: '#FFA500' }}
                >
                    L
                </Typography>
            </Box>
        </Box>
    );
};

export default StoresHeaderLogo;
