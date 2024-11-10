import React from 'react';
import { Box, Typography } from '@mui/material';

const BlackFriday = ({ price, discountPrice }) => {
    const discountPercentage = Math.floor(((price - discountPrice) / price) * 100);

    if (!discountPercentage) return null;

    return (
        <>
            <Box
                className="BlackFriday"
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    zIndex: 1,
                    width: 22,
                    height: '100%',
                    background: 'linear-gradient(135deg, #ff0000 10%, #000000 80%)',

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                    animation: 'fadeIn 1.5s ease-in-out',
                    '@keyframes fadeIn': {
                        '0%': { opacity: 0 },
                        '100%': { opacity: 1 },
                    },
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        transform: 'rotate(-90deg)', // Поворачиваем текст боком
                        fontSize: 15,
                        color: '#fff',
                        whiteSpace: 'nowrap',
                        fontWeight: 500,
                    }}
                >
                    Black _ Friday
                </Typography>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    left: 6,
                    bottom: 5,
                    zIndex: 1,
                    width: 44,
                    height: 28,
                    background: 'linear-gradient(25deg, #a0a0a0 10%, #000000 50%)',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                    animation: 'fadeIn 1.5s ease-in-out',
                    '@keyframes fadeIn': {
                        '0%': { opacity: 0 },
                        '100%': { opacity: 1 },
                    },
                    border: '2px solid #fff',
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: 16,
                        color: '#fff',
                        whiteSpace: 'nowrap',
                        fontWeight: 700,
                    }}
                >
                    -{discountPercentage}%
                </Typography>
            </Box>
        </>
    );
};

export default BlackFriday;
