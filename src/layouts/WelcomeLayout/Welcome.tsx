import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useDevice } from 'hooks/useDevice';
import { useNavigate } from 'react-router-dom';

export default function WelcomePage({ handleRedirect }) {
    const { sx } = useDevice();
    const navigate = useNavigate();

    const redirectToStartPath = () => {
        const startPath = handleRedirect();
        navigate(startPath);
    };

    setTimeout(redirectToStartPath, 3000);

    return (
        <>
            <CssBaseline />

            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    minWidth: '100vw',
                    minHeight: '90vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    className="WelcomeLogo"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        animation: `fadeIn 2200ms linear forwards`,
                        transformOrigin: 'center',
                        '@keyframes fadeIn': {
                            '0%': { transform: 'scaleY(0)' },
                            '30%': { transform: 'scaleY(1)' },
                            '75%': { transform: 'scaleY(1)', opacity: 1 },
                            '100%': { opacity: 0 },
                        },
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '1px solid #fff',
                            width: sx ? 70 : 100,
                            height: sx ? 70 : 100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img src={require('assets/img/logo.webp')} style={{ height: sx ? 70 : 100 }} alt="img" />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            cursor: 'pointer',
                            flexDirection: 'column',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                display: 'flex',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'Young Serif',
                                    fontSize: sx ? 23 : 40,
                                    fontWeight: 600,
                                    // color: Color?.PRIMARY,
                                    textShadow: '#0000006a 0 0 2px',
                                    mr: 0.1,
                                }}
                            >
                                C
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Young Serif',
                                    fontSize: sx ? 23 : 40,
                                    fontWeight: 500,
                                    color: '#268eca',
                                    textShadow: '#043f61 0 0 2.25px',
                                }}
                            >
                                o
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Young Serif',
                                    fontSize: sx ? 23 : 40,
                                    fontWeight: 500,
                                    color: '#2c4974',
                                    textShadow: '#043f61 0 0 2.25px',
                                }}
                            >
                                C
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Young Serif',
                                    fontSize: sx ? 23 : 40,
                                    fontWeight: 500,
                                    // color: '#2c4974',
                                    textShadow: '#043f61 0 0 2.25px',
                                }}
                            >
                                K
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Young Serif',
                                    fontSize: sx ? 23 : 40,
                                    fontWeight: 500,
                                    color: '#f5cb56',
                                    textShadow: '#000000 0 0 3.25px',
                                }}
                            >
                                T
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Young Serif',
                                    fontSize: sx ? 23 : 40,
                                    fontWeight: 500,
                                    // color: '#2c4974',
                                    textShadow: '#043f61 0 0 2.25px',
                                }}
                            >
                                A
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Young Serif',
                                    fontSize: sx ? 23 : 40,
                                    fontWeight: 500,
                                    color: '#2c4974',
                                    textShadow: '#043f61 0 0 2.25px',
                                }}
                            >
                                i
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Young Serif',
                                    fontSize: sx ? 23 : 40,
                                    fontWeight: 500,
                                    color: '#2c4974',
                                    textShadow: '#043f61 0 0 2.25px',
                                }}
                            >
                                L
                            </Typography>

                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 1,
                                    left: 0,
                                    borderTop: `2px solid ${'#268eca'}`,
                                    width: '100%',
                                    boxShadow: '0 0 2px #7c7c7c',
                                }}
                            ></Box>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: -3,
                                    left: 0,
                                    borderTop: `2px solid ${'#f5cb56'}`,
                                    width: '100%',
                                    boxShadow: '0 0 1px  #7c7c7c6f',
                                }}
                            ></Box>
                        </Box>
                        <Box
                            sx={{
                                position: 'relative',
                                display: 'flex',
                            }}
                        >
                            <Typography
                                sx={{
                                    ml: 1,
                                    fontFamily: 'Young Serif',
                                    fontSize: sx ? 23 : 40,
                                    fontWeight: 600,
                                    // color: Color?.PRIMARY,
                                    textShadow: '#0000006a 0 0 2px',
                                    mr: 0.1,
                                }}
                            >
                                C
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Young Serif',
                                    fontSize: sx ? 23 : 40,
                                    fontWeight: 500,
                                    color: '#2c4974',
                                    textShadow: '#043f61 0 0 2.25px',
                                }}
                            >
                                A
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Young Serif',
                                    fontSize: sx ? 23 : 40,
                                    fontWeight: 500,
                                    color: '#f5cb56',
                                    textShadow: '#000000 0 0 3.25px',
                                }}
                            >
                                T
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Young Serif',
                                    fontSize: sx ? 23 : 40,
                                    fontWeight: 500,
                                    color: '#2c4974',
                                    textShadow: '#043f61 0 0 2.25px',
                                }}
                            >
                                A
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Young Serif',
                                    fontSize: sx ? 23 : 40,
                                    fontWeight: 500,
                                    // color: Color?.PRIMARY,
                                    textShadow: '#0000006a 0 0 2px',
                                }}
                            >
                                L
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Young Serif',
                                    fontSize: sx ? 23 : 40,
                                    fontWeight: 500,
                                    color: '#268eca',
                                    textShadow: '#043f61 0 0 2.25px',
                                }}
                            >
                                o
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Young Serif',
                                    fontSize: sx ? 23 : 40,
                                    fontWeight: 500,
                                    // color: '#2c4974',
                                    textShadow: '#043f61 0 0 2.25px',
                                }}
                            >
                                G
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Young Serif',
                                    fontSize: sx ? 23 : 40,
                                    fontWeight: 500,
                                    color: '#2c4974',
                                    textShadow: '#043f61 0 0 2.25px',
                                }}
                            >
                                S
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
