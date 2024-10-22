import { Box, Typography } from '@mui/material';
import { Color, Colors } from 'constants/colors';
import { useDevice } from 'hooks/useDevice';
import { useNavigate } from 'react-router-dom';

interface Props {
    path: string;
    logoUrl: string;
    text: string;
}

const CocktailButton = ({ path, logoUrl, text }: Props) => {
    const { sx } = useDevice();
    const navigate = useNavigate();

    return (
        <>
            <Box
                onClick={() => navigate(path)}
                className="sway" // Добавляем класс для анимации
                sx={{
                    position: 'relative',
                    width: text ? (sx ? 140 : 160) : sx ? 120 : 135,
                    height: text ? (sx ? 140 : 160) : sx ? 120 : 135,
                    background: Colors?.GRAY_300,
                    borderRadius: '50%',
                    boxShadow: '0 0 2px 4px rgba(0, 0, 0, 0.247)',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${Color?.PRIMARY_DARK}, ${Color?.PRIMARY_LIGHT})`,
                        zIndex: -1,
                    },
                    cursor: 'pointer',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${logoUrl})`,
                        backgroundSize: sx ? 110 : 125,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                >
                    {text &&
                        Array.from(text).map((char, index, array) => (
                            <Typography
                                key={index}
                                sx={{
                                    position: 'absolute',
                                    left: sx ? 70 : 80,
                                    top: 0,
                                    transform: `rotate(${(index / array.length) * 190 + 270}deg)`,
                                    transformOrigin: sx ? '0 70px' : '0 80px',
                                    fontFamily: 'Roboto',
                                    fontWeight: 400,
                                    fontSize: sx ? 14 : 16,
                                    color: Colors?.BLACK,
                                    textShadow: '#000000 0 0 2px',
                                }}
                            >
                                {char}
                            </Typography>
                        ))}
                </Box>
            </Box>
            <style>
                {`
                @keyframes gradient-1 {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
    
                @keyframes gradient-2 {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
    
                @keyframes gradient-3 {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
    
                .sway {
                    animation: sway 8s ease-in-out infinite; /* Длительная анимация, плавное замедление */
                }
                
                @keyframes sway {
                    0% {
                        transform: rotate(0deg); /* Старт с 0 */
                    }
                    15% {
                        transform: rotate(330deg); /* Быстрое вращение по часовой стрелке на 360 градусов */
                    }
                    25% {
                        transform: rotate(-45deg); /* Большое раскачивание обратно */
                    }
                    35% {
                        transform: rotate(30deg); /* В противоположную сторону */
                    }
                    45% {
                        transform: rotate(-25deg); /* Меньшее раскачивание обратно */
                    }
                    55% {
                        transform: rotate(15deg); /* Еще меньшее раскачивание */
                    }
                    65% {
                        transform: rotate(-8deg); /* Почти остановка */
                    }
                    75% {
                        transform: rotate(4deg); /* Ещё меньшее раскачивание */
                    }
                    85% {
                        transform: rotate(-2deg); /* Последние колебания */
                    }
                    100% {
                        transform: rotate(0deg); /* Полная остановка */
                    }
                }
            }       
            `}
            </style>
        </>
    );
};

export default CocktailButton;
