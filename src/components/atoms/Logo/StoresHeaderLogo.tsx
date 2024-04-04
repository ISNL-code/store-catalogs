import { Box, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { useNavigate } from 'react-router-dom';
// import { PiMartiniLight } from 'react-icons/pi';

const StoresHeaderLogo = ({ headerHeight }) => {
    const navigate = useNavigate();
    const { xs } = useDevice();
    return (
        <Box onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 0.75 }}>
            <Box sx={{ width: xs ? 46 : 50, height: xs ? 42 : 46 }}>
                <img style={{ width: xs ? 46 : 50, height: xs ? 42 : 46 }} src={require('./logo.png')} alt="" />
            </Box>

            <Box sx={{ display: 'flex', gap: 0.15 }}>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xs ? 26 : 34, fontWeight: 600, color: '#DB4437' }}
                >
                    S
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xs ? 26 : 34, fontWeight: 600, color: '#5499d1' }}
                >
                    a
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xs ? 26 : 34, fontWeight: 600, color: '#5499d1' }}
                >
                    l
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xs ? 26 : 34, fontWeight: 600, color: '#5499d1' }}
                >
                    e
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xs ? 26 : 34, fontWeight: 600, color: '#5499d1' }}
                >
                    s
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xs ? 26 : 34, fontWeight: 600, color: '#DB4437' }}
                >
                    N
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xs ? 26 : 34, fontWeight: 600, color: '#5499d1' }}
                >
                    e
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xs ? 26 : 34, fontWeight: 600, color: '#5499d1' }}
                >
                    s
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xs ? 26 : 34, fontWeight: 600, color: '#5499d1' }}
                >
                    t
                </Typography>
            </Box>
        </Box>
    );
};

export default StoresHeaderLogo;
