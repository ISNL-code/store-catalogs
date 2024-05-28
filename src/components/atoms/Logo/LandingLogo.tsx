import { Box, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import useLogoNavigate from './useLogoNavigate';

const LandingLogo = () => {
    const handleLogoNavigate = useLogoNavigate();
    const { sx } = useDevice();

    return (
        <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
            onClick={() => {
                handleLogoNavigate();
            }}
        >
            <Box sx={{ boxShadow: '0 0 5px 1px #414141c5', borderRadius: '50%', border: '2.2px solid #383838' }}>
                <Box
                    sx={{
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    <img
                        src={require(`assets/img/logo.png`)}
                        style={{
                            width: 43,
                            height: 43,
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50.1%,-51.2%)',
                        }}
                        alt="logo"
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: sx ? 20 : 28,
                        fontWeight: 600,
                        color: '#161616',
                        textShadow: '#0000006a 0 0 2px',
                        mr: 0.1,
                        mt: 0.1,
                    }}
                >
                    S
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: sx ? 20 : 28,
                        fontWeight: 500,
                        color: '#616161c6',
                        textShadow: '#000000 0 0 1.25px',
                    }}
                >
                    A
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: sx ? 20 : 28,
                        fontWeight: 500,
                        color: '#616161c6',
                        textShadow: '#000000 0 0 1.25px',
                    }}
                >
                    L
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: sx ? 20 : 28,
                        fontWeight: 500,
                        color: '#616161c6',
                        textShadow: '#000000 0 0 1.25px',
                    }}
                >
                    E
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: sx ? 20 : 28,
                        fontWeight: 500,
                        color: '#616161c6',
                        textShadow: '#000000 0 0 1.25px',
                    }}
                >
                    S
                </Typography>

                <Typography
                    sx={{
                        ml: 1,
                        fontFamily: 'Young Serif',
                        fontSize: sx ? 20 : 28,
                        fontWeight: 600,
                        color: '#161616',
                        textShadow: '#0000006a 0 0 2px',
                        mr: 0.1,
                        mt: 0.1,
                    }}
                >
                    N
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: sx ? 20 : 28,
                        fontWeight: 500,
                        color: '#616161c6',
                        textShadow: '#000000 0 0 1.25px',
                    }}
                >
                    E
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: sx ? 20 : 28,
                        fontWeight: 500,
                        color: '#616161c6',
                        textShadow: '#000000 0 0 1.25px',
                    }}
                >
                    S
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: sx ? 20 : 28,
                        fontWeight: 500,
                        color: '#616161c6',
                        textShadow: '#000000 0 0 1.25px',
                    }}
                >
                    T
                </Typography>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 1,
                        left: 0,
                        borderTop: '0.1px solid #272727',
                        width: '100%',
                        boxShadow: '0 0 2px #7c7c7c',
                    }}
                ></Box>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: -3,
                        left: 0,
                        borderBottom: '0.1px solid #6d6d6d',
                        width: '100%',
                        boxShadow: '0 0 1px  #7c7c7c6f',
                    }}
                ></Box>
            </Box>
        </Box>
    );
};

export default LandingLogo;
