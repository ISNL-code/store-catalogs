import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { Colors } from 'colors';
import CustomLogo from './CustomLogo';

interface Props {
    title: string;
    font?: string;
    imgUrl: string;
    custom?: boolean;
}

const specialWords = ['outlet', 'sale', 'sales', 'discount'];

const HeaderLogo = ({ title, font = 'Roboto', imgUrl, custom = false }: Props) => {
    const { xxxs } = useDevice();
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
            setImgLoaded(true);
        };
        img.onerror = () => {
            setImgLoaded(true);
            setImgError(true);
        };

        img.onload = () => {
            setImgLoaded(true);
        };

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [imgUrl]);

    if (custom) return <CustomLogo />;

    const words = title?.split(' ');

    const titleComponents = words?.map((word, index) => {
        const isSpecial = specialWords?.includes(word.toLowerCase());

        return (
            <Typography
                key={index}
                component="span"
                sx={{
                    fontFamily: font,
                    fontSize: xxxs ? 18 : 24,
                    fontWeight: 700,
                    lineHeight: 1,
                    color: isSpecial ? 'red' : 'black',
                }}
            >
                {word}{' '}
            </Typography>
        );
    });

    return (
        <Box
            sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                transition: 'opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                gap: 1,
                width: 50,
            }}
        >
            {imgLoaded && !imgError ? (
                <img
                    src={imgUrl}
                    style={{
                        width: '100%',
                        height: 'auto',
                        border: '1px solid #ccc',
                        borderRadius: 8,
                        padding: '0 2px',
                    }}
                    alt="img"
                />
            ) : (
                <CircularProgress sx={{ color: Colors?.GRAY }} thickness={1} />
            )}

            {titleComponents}
        </Box>
    );
};

export default HeaderLogo;
