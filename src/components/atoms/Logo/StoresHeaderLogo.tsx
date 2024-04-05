import { Box, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { useNavigate } from 'react-router-dom';

const HomeHeaderLogo = () => {
    const navigate = useNavigate();
    const { xxs } = useDevice();
    return (
        <Box
            onClick={() => navigate('/')}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: xxs ? 0.75 : 1 }}
        >
            <Box sx={{ boxShadow: '0 0 4px 2px #ff0000', borderRadius: '50%', border: '2px solid #000' }}>
                <Box
                    sx={{
                        width: xxs ? 40 : 48,
                        height: xxs ? 40 : 48,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        border: '3px solid red',
                    }}
                >
                    <img
                        src={require('assets/img/logo.png')}
                        style={{
                            width: xxs ? 50 : 66,
                            height: xxs ? 50 : 66,
                            position: 'absolute',
                            top: '49.5%',
                            left: '50%',
                            transform: 'translate(-50%,-50%)',
                        }}
                        alt="logo"
                    />
                </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 0.1, alignItems: 'center', mt: 0.5 }}>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 32, fontWeight: 700, color: 'red' }}>
                    A
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 32, fontWeight: 700, color: '#000' }}>
                    L
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 32, fontWeight: 700, color: '#000' }}>
                    B
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 32, fontWeight: 700, color: '#000' }}>
                    E
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 32, fontWeight: 700, color: '#000' }}>
                    R
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 32, fontWeight: 700, color: '#000' }}>
                    T
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 32, fontWeight: 700, color: '#000' }}>
                    O
                </Typography>
                <Typography
                    sx={{
                        ml: 1,
                        fontFamily: 'Young Serif',
                        fontSize: xxs ? 28 : 32,
                        fontWeight: 700,
                        color: 'red',
                    }}
                >
                    B
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 32, fontWeight: 700, color: '#000' }}>
                    I
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 32, fontWeight: 700, color: '#000' }}>
                    N
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 28 : 32, fontWeight: 700, color: '#000' }}>
                    I
                </Typography>
            </Box>
        </Box>
    );
};

export default HomeHeaderLogo;
