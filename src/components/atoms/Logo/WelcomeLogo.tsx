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
                flexDirection: 'column',
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
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: '1px solid #ccc',
                    width: sx ? 160 : 200,
                    height: sx ? 100 : 140,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img src={require('assets/img/kremen.webp')} style={{ height: sx ? 120 : 160 }} alt="img" />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    gap: 2,
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
                            fontSize: sx ? 40 : 54,
                            fontWeight: 600,
                            textShadow: '#0000006a 0 0 2px',
                            mr: 0.1,
                        }}
                    >
                        K
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                        }}
                    >
                        R
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        E
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                        }}
                    >
                        M
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        E
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        N
                    </Typography>
                </Box>
                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: sx ? 40 : 54,
                            fontWeight: 600,
                            textShadow: '#0000006a 0 0 2px',
                        }}
                    >
                        B
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        E
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        L
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        T
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: sx ? 40 : 54,
                            fontWeight: 500,
                            textShadow: '#2c4974 0 0 2.25px',
                        }}
                    >
                        S
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default WelcomeLogo;
