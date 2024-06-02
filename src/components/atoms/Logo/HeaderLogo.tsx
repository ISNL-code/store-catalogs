import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { Color } from 'constants/colors';
import CustomLogo from './CustomLogo';
import useLogoNavigate from './useLogoNavigate';

interface Props {
    title: string;
    font?: string;
    imgUrl: string;
    custom?: boolean;
}

const specialWords = ['outlet', 'sale', 'sales', 'discount'];

const HeaderLogo = ({ title, imgUrl, custom = false }: Props) => {
    const handleLogoNavigate = useLogoNavigate();
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
                display: 'flex',
                alignItems: 'center',
                width: 48,
                cursor: 'pointer',
            }}
            onClick={() => {
                handleLogoNavigate();
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
                    }}
                    alt="img"
                />
            ) : (
                <Box>
                    <CircularProgress sx={{ color: Color?.SECONDARY }} thickness={1} />
                </Box>
            )}
            <Box
                ml={1}
                sx={{ width: 'fit-content', display: 'flex', alignItems: 'center', flexWrap: 'nowrap', gap: 1 }}
            >
                {titleComponents}
            </Box>
        </Box>
    );
};

export default HeaderLogo;
