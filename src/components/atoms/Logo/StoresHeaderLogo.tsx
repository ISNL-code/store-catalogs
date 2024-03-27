import { Box, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { useNavigate } from 'react-router-dom';
// import { PiMartiniLight } from 'react-icons/pi';

const StoresHeaderLogo = ({ headerHeight }) => {
    const navigate = useNavigate();
    const { xs } = useDevice();
    return (
        <Box onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            {/* <Box mt={2}>
                <PiMartiniLight fontSize={48} />
            </Box> */}

            <Box mt={1} sx={{ display: 'flex', gap: 0.15 }}>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xs ? 24 : 30, fontWeight: 600, color: '#DB4437' }}
                >
                    S
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xs ? 24 : 30, fontWeight: 600, color: '#4285F4' }}
                >
                    a
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xs ? 24 : 30, fontWeight: 600, color: '#4285F4' }}
                >
                    l
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xs ? 24 : 30, fontWeight: 600, color: '#4285F4' }}
                >
                    e
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xs ? 24 : 30, fontWeight: 600, color: '#4285F4' }}
                >
                    s
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xs ? 24 : 30, fontWeight: 600, color: '#DB4437' }}
                >
                    N
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xs ? 24 : 30, fontWeight: 600, color: '#4285F4' }}
                >
                    e
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xs ? 24 : 30, fontWeight: 600, color: '#4285F4' }}
                >
                    s
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xs ? 24 : 30, fontWeight: 600, color: '#4285F4' }}
                >
                    t
                </Typography>
            </Box>
        </Box>
    );
};

export default StoresHeaderLogo;
