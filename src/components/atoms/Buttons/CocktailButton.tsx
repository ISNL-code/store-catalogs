import { Box, Typography } from '@mui/material';
import { Color, Colors } from 'constants/colors';

interface Props {
    logoUrl: string;
}

const CocktailButton = ({ logoUrl }: Props) => {
    //     window.location.href = "https://cocktail-catalogs-shop.com";

    return (
        <>
            <Box
                className="sway"
                sx={{
                    zIndex: 5000,
                    position: 'relative',
                    width: 76,
                    height: 76,
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
                        backgroundSize: 54,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                >
                    {Array.from('Cocktail Shop').map((char, index, array) => (
                        <Typography
                            key={'Cocktail Shop'}
                            sx={{
                                position: 'absolute',
                                left: 38,
                                top: 0,
                                transform: `rotate(${(index / array.length) * 190 + 280}deg)`,
                                transformOrigin: `0 ${39}px`,
                                fontFamily: 'Roboto',
                                fontWeight: 500,
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
