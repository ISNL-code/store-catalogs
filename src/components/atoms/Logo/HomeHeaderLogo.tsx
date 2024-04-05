import { Box, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';

const HomeHeaderLogo = () => {
    const { xs } = useDevice();
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: xs ? 0.25 : 0.25 }}>
            <Box sx={{ boxShadow: '0 0 5px 1px #414141c5', borderRadius: '50%', border: '2px solid #161616' }}>
                <Box
                    sx={{
                        width: xs ? 45 : 55,
                        height: xs ? 45 : 55,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    <img
                        src={require('assets/img/logo.png')}
                        style={{
                            width: xs ? 70 : 78,
                            height: xs ? 70 : 78,
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50.5%,-51.5%)',
                        }}
                        alt="logo"
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    pt: 0.3,
                    display: 'flex',
                    gap: 0.15,
                    alignItems: 'center',
                    mt: 0.5,
                    borderBottom: '1px solid #5e5e5e',
                    // borderTop: '1px solid #5e5e5e',
                    px: 0.25,
                    // boxShadow: '0 2px 5px 1px #414141c5',
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 23 : 32,
                        fontWeight: 600,
                        color: '#161616',
                    }}
                >
                    A
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 20 : 32,
                        fontWeight: 600,
                        color: '#5e5e5e',
                        textShadow:
                            '-1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000,0px 1px 0 #000,0px -1px 0 #000,-1px 0px 0 #000,  1px 0px 0 #000, -1px 1px 0 #000,  --1px 1px 0 #000, 1px -1px 0 #000,  -1px -1px 0 #000,  0px 1px 0 #000,  0px -1px 0 #000,  -1px 0px 0 #000,  1px 0px 0 #000,  -1px 1px 0 #000,  --1px 1px 0 #000,  1px -1px 0 #000,  -1px -1px 0 #000,  -1px 1px 0 #000,  --1px 1px 0 #000, 1px -1px 0 #000,  -1px -1px 0 #000',
                    }}
                >
                    L
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 20 : 32,
                        fontWeight: 600,
                        color: '#5e5e5e',
                        textShadow:
                            '-1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000,0px 1px 0 #000,0px -1px 0 #000,-1px 0px 0 #000,  1px 0px 0 #000, -1px 1px 0 #000,  --1px 1px 0 #000, 1px -1px 0 #000,  -1px -1px 0 #000,  0px 1px 0 #000,  0px -1px 0 #000,  -1px 0px 0 #000,  1px 0px 0 #000,  -1px 1px 0 #000,  --1px 1px 0 #000,  1px -1px 0 #000,  -1px -1px 0 #000,  -1px 1px 0 #000,  --1px 1px 0 #000, 1px -1px 0 #000,  -1px -1px 0 #000',
                    }}
                >
                    B
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 20 : 32,
                        fontWeight: 600,
                        color: '#5e5e5e',
                        textShadow:
                            '-1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000,0px 1px 0 #000,0px -1px 0 #000,-1px 0px 0 #000,  1px 0px 0 #000, -1px 1px 0 #000,  --1px 1px 0 #000, 1px -1px 0 #000,  -1px -1px 0 #000,  0px 1px 0 #000,  0px -1px 0 #000,  -1px 0px 0 #000,  1px 0px 0 #000,  -1px 1px 0 #000,  --1px 1px 0 #000,  1px -1px 0 #000,  -1px -1px 0 #000,  -1px 1px 0 #000,  --1px 1px 0 #000, 1px -1px 0 #000,  -1px -1px 0 #000',
                    }}
                >
                    E
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 20 : 32,
                        fontWeight: 600,
                        color: '#5e5e5e',
                        textShadow:
                            '-1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000,0px 1px 0 #000,0px -1px 0 #000,-1px 0px 0 #000,  1px 0px 0 #000, -1px 1px 0 #000,  --1px 1px 0 #000, 1px -1px 0 #000,  -1px -1px 0 #000,  0px 1px 0 #000,  0px -1px 0 #000,  -1px 0px 0 #000,  1px 0px 0 #000,  -1px 1px 0 #000,  --1px 1px 0 #000,  1px -1px 0 #000,  -1px -1px 0 #000,  -1px 1px 0 #000,  --1px 1px 0 #000, 1px -1px 0 #000,  -1px -1px 0 #000',
                    }}
                >
                    R
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 20 : 32,
                        fontWeight: 600,
                        color: '#5e5e5e',
                        textShadow:
                            '-1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000,0px 1px 0 #000,0px -1px 0 #000,-1px 0px 0 #000,  1px 0px 0 #000, -1px 1px 0 #000,  --1px 1px 0 #000, 1px -1px 0 #000,  -1px -1px 0 #000,  0px 1px 0 #000,  0px -1px 0 #000,  -1px 0px 0 #000,  1px 0px 0 #000,  -1px 1px 0 #000,  --1px 1px 0 #000,  1px -1px 0 #000,  -1px -1px 0 #000,  -1px 1px 0 #000,  --1px 1px 0 #000, 1px -1px 0 #000,  -1px -1px 0 #000',
                    }}
                >
                    T
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 20 : 32,
                        fontWeight: 600,
                        color: '#5e5e5e',
                        textShadow:
                            '-1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000,0px 1px 0 #000,0px -1px 0 #000,-1px 0px 0 #000,  1px 0px 0 #000, -1px 1px 0 #000,  --1px 1px 0 #000, 1px -1px 0 #000,  -1px -1px 0 #000,  0px 1px 0 #000,  0px -1px 0 #000,  -1px 0px 0 #000,  1px 0px 0 #000,  -1px 1px 0 #000,  --1px 1px 0 #000,  1px -1px 0 #000,  -1px -1px 0 #000,  -1px 1px 0 #000,  --1px 1px 0 #000, 1px -1px 0 #000,  -1px -1px 0 #000',
                    }}
                >
                    O
                </Typography>
                <Typography
                    sx={{
                        ml: 0.75,
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 23 : 32,
                        fontWeight: 600,
                        color: '#161616',
                    }}
                >
                    B
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 20 : 32,
                        fontWeight: 600,
                        color: '#5e5e5e',
                        textShadow:
                            '-1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000,0px 1px 0 #000,0px -1px 0 #000,-1px 0px 0 #000,  1px 0px 0 #000, -1px 1px 0 #000,  --1px 1px 0 #000, 1px -1px 0 #000,  -1px -1px 0 #000,  0px 1px 0 #000,  0px -1px 0 #000,  -1px 0px 0 #000,  1px 0px 0 #000,  -1px 1px 0 #000,  --1px 1px 0 #000,  1px -1px 0 #000,  -1px -1px 0 #000,  -1px 1px 0 #000,  --1px 1px 0 #000, 1px -1px 0 #000,  -1px -1px 0 #000',
                    }}
                >
                    I
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 20 : 32,
                        fontWeight: 600,
                        color: '#5e5e5e',
                        textShadow:
                            '-1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000,0px 1px 0 #000,0px -1px 0 #000,-1px 0px 0 #000,  1px 0px 0 #000, -1px 1px 0 #000,  --1px 1px 0 #000, 1px -1px 0 #000,  -1px -1px 0 #000,  0px 1px 0 #000,  0px -1px 0 #000,  -1px 0px 0 #000,  1px 0px 0 #000,  -1px 1px 0 #000,  --1px 1px 0 #000,  1px -1px 0 #000,  -1px -1px 0 #000,  -1px 1px 0 #000,  --1px 1px 0 #000, 1px -1px 0 #000,  -1px -1px 0 #000',
                    }}
                >
                    N
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 20 : 32,
                        fontWeight: 600,
                        color: '#5e5e5e',
                        textShadow:
                            '-1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000,0px 1px 0 #000,0px -1px 0 #000,-1px 0px 0 #000,  1px 0px 0 #000, -1px 1px 0 #000,  --1px 1px 0 #000, 1px -1px 0 #000,  -1px -1px 0 #000,  0px 1px 0 #000,  0px -1px 0 #000,  -1px 0px 0 #000,  1px 0px 0 #000,  -1px 1px 0 #000,  --1px 1px 0 #000,  1px -1px 0 #000,  -1px -1px 0 #000,  -1px 1px 0 #000,  --1px 1px 0 #000, 1px -1px 0 #000,  -1px -1px 0 #000',
                    }}
                >
                    I
                </Typography>
            </Box>
        </Box>
    );
};

export default HomeHeaderLogo;
