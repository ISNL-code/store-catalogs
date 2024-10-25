import { Box, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import React from 'react';

const WelcomeLogo = () => {
    const { sx } = useDevice();

    return (
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
                    width: sx ? 100 : 130,
                    height: sx ? 100 : 130,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img src={require('assets/img/main_logo.webp')} style={{ height: sx ? 100 : 130 }} alt="img" />
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
                            fontSize: sx ? 40 : 54,
                            fontWeight: 600,
                            textShadow: '#0000006a 0 0 2px',
                            mr: 0.1,
                        }}
                    >
                        C
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Young Serif',
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            color: '#3f5370',
                        }}
                    >
                        o
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Young Serif',
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            color: '#3f5370',
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        c
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Young Serif',
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            color: '#3f5370',
                        }}
                    >
                        k
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Young Serif',
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            color: '#3f5370',
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        t
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Young Serif',
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            color: '#3f5370',
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        a
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Young Serif',
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            color: '#3f5370',
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        i
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Young Serif',
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            color: '#3f5370',
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        l
                    </Typography>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 1,
                            left: 0,
                            borderTop: `4px solid ${'#268eca'}`,
                            width: '100%',
                            color: '#3f5370',
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    ></Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: -3,
                            left: 0,
                            borderTop: `3px solid ${'#f5cb56'}`,
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
                            fontFamily: 'Young Serif',
                            fontSize: sx ? 40 : 54,
                            fontWeight: 600,
                            textShadow: '#0000006a 0 0 2px',
                        }}
                    >
                        C
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Young Serif',
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            color: '#3f5370',
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        a
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Young Serif',
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            color: '#3f5370',
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        t
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Young Serif',
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            color: '#3f5370',
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        a
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Young Serif',
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            color: '#3f5370',
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        l
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Young Serif',
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            color: '#3f5370',
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        o
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Young Serif',
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            color: '#3f5370',
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        g
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Young Serif',
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            color: '#3f5370',
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        s
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default WelcomeLogo;
