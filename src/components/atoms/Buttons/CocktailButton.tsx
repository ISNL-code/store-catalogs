import { Box, Typography } from '@mui/material';
import { Color, Colors } from 'constants/colors';
import { useDevice } from 'hooks/useDevice';
import { useNavigate } from 'react-router-dom';

interface Size {
    small?: number;
    large?: number;
    imgSmall?: number;
    imgLarge?: number;
    textSmall?: number;
    textLarge?: number;
}

interface Props {
    path?: string;
    logoUrl: string;
    text?: string;
    externalUrl?: string;
    size?: Size;
    sendBotMessage?: () => void;
}

const CocktailButton = ({ path, logoUrl, text, externalUrl, size = {}, sendBotMessage }: Props) => {
    const { sx } = useDevice();
    const navigate = useNavigate();

    const handleClick = () => {
        if (externalUrl) {
            sendBotMessage && sendBotMessage();
            setTimeout(() => {
                window.location.href = externalUrl;
            }, 0);
        } else if (path) {
            navigate(path);
        }
    };

    return (
        <>
            <Box
                onClick={handleClick}
                className="sway"
                sx={{
                    zIndex: 5000,
                    position: 'relative',
                    width: text
                        ? sx
                            ? size.small ?? 70
                            : size.large ?? 90
                        : sx
                        ? size.small ?? 74
                        : size.large ?? 110,
                    height: text
                        ? sx
                            ? size.small ?? 70
                            : size.large ?? 90
                        : sx
                        ? size.small ?? 74
                        : size.large ?? 110,
                    background: Colors.GRAY_300,
                    borderRadius: '50%',
                    boxShadow: '0 0 4px 3px rgba(0, 0, 0, 0.164)',
                    cursor: 'pointer',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${Color?.SECONDARY_LIGHT}, ${Color.PRIMARY_LIGHT})`,
                        zIndex: -1,
                    },
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${logoUrl})`,
                        backgroundSize: `${
                            text
                                ? sx
                                    ? size?.imgSmall || 70
                                    : size?.imgLarge || 68
                                : sx
                                ? size?.imgSmall || 70
                                : size?.imgLarge || 90
                        }px`,
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
                                    left: sx ? size.textSmall ?? 36 : size.textLarge ?? 46,
                                    top: 0,
                                    transform: `rotate(${(index / array.length) * 190 + 270}deg)`,
                                    transformOrigin: sx ? `0 ${size.textSmall ?? 36}px` : `0 ${size.textLarge ?? 46}px`,
                                    fontFamily: 'Roboto',
                                    fontWeight: 400,
                                    fontSize: 10,
                                    color: Colors.BLACK,
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
                .sway {
                    animation: sway 8s ease-in-out infinite;
                }
                
                @keyframes sway {
                    0% { transform: rotate(0deg); }
                    15% { transform: rotate(330deg); }
                    25% { transform: rotate(-45deg); }
                    35% { transform: rotate(30deg); }
                    45% { transform: rotate(-25deg); }
                    55% { transform: rotate(15deg); }
                    65% { transform: rotate(-8deg); }
                    75% { transform: rotate(4deg); }
                    85% { transform: rotate(-2deg); }
                    100% { transform: rotate(0deg); }
                }
            `}
            </style>
        </>
    );
};

export default CocktailButton;
