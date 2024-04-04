import { Box, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { useNavigate } from 'react-router-dom';

const HomeHeaderLogo = () => {
    const navigate = useNavigate();
    const { xxs } = useDevice();
    return (
        <Box onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <img
                src={require('assets/img/logo.png')}
                style={{ width: xxs ? 45 : 60, height: xxs ? 45 : 60 }}
                alt="logo"
            />

            <Box sx={{ display: 'flex', gap: 0.1, alignItems: 'center', mt: 0.5 }}>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 22 : 32, fontWeight: 700, color: 'red' }}>
                    A
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 22 : 32, fontWeight: 700, color: '#000' }}>
                    L
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 22 : 32, fontWeight: 700, color: '#000' }}>
                    B
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 22 : 32, fontWeight: 700, color: '#000' }}>
                    E
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 22 : 32, fontWeight: 700, color: '#000' }}>
                    R
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 22 : 32, fontWeight: 700, color: '#000' }}>
                    T
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 22 : 32, fontWeight: 700, color: '#000' }}>
                    O
                </Typography>
                <Typography
                    sx={{
                        ml: 1,
                        fontFamily: 'Young Serif',
                        fontSize: xxs ? 22 : 32,
                        fontWeight: 700,
                        color: 'red',
                    }}
                >
                    B
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 22 : 32, fontWeight: 700, color: '#000' }}>
                    I
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 22 : 32, fontWeight: 700, color: '#000' }}>
                    N
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 22 : 32, fontWeight: 700, color: '#000' }}>
                    I
                </Typography>
            </Box>
        </Box>
    );
};

export default HomeHeaderLogo;
