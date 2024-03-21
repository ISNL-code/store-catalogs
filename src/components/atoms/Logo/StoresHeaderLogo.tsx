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
                    S
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 30, fontWeight: 600, color: '#4285F4' }}
                >
                    A
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 30, fontWeight: 600, color: '#4285F4' }}
                >
                    L
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 30, fontWeight: 600, color: '#4285F4' }}
                >
                    E
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 30, fontWeight: 600, color: '#4285F4' }}
                >
                    S
                </Typography>
                <Typography
                    ml={1}
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 30, fontWeight: 600, color: '#DB4437' }}
                >
                    N
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 30, fontWeight: 600, color: '#4285F4' }}
                >
                    E
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 30, fontWeight: 600, color: '#4285F4' }}
                >
                    S
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 30, fontWeight: 600, color: '#4285F4' }}
                >
                    T
                </Typography>
            </Box>
        </Box>
    );
};

export default StoresHeaderLogo;
