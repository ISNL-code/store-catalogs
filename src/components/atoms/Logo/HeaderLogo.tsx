import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import { STORE_CONFIG } from 'constants/stores_config';
import { Colors } from 'colors';

interface Props {
    title: string;
    font?: string;
    imgUrl: string;
    headerHeight: string | number;
}

const specialWords = ['outlet', 'sale', 'sales', 'discount'];

const HeaderLogo = ({ title, font = 'Roboto', imgUrl, headerHeight }: Props) => {
    const { STORE_CODE, STORE_NAME } = STORE_CONFIG;
    const navigate = useNavigate();
    const { xxxs, xxs } = useDevice();
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
            setImgError(true); // Handle error case
        };

        img.onload = () => {
            setImgLoaded(true); // Сигнализирует об успешной загрузке изображения
        };

        return () => {
            // Clean up if the component unmounts before the image is loaded
            img.onload = null;
            img.onerror = null;
        };
    }, [imgUrl]);

    const words = title?.split(' ');

    const titleComponents = words.map((word, index) => {
        const isSpecial = specialWords.includes(word.toLowerCase());

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
            }}
            onClick={() => {
                navigate(`/catalog/${STORE_CODE}/${STORE_NAME.replaceAll(' ', '-').toLowerCase()}`);
            }}
        >
            {(!imgLoaded || imgError) && <CircularProgress sx={{ color: Colors?.GRAY }} thickness={1} />}
            <img
                src={imgUrl}
                style={{
                    height: xxs ? Number(headerHeight) - 12 : Number(headerHeight) - 6,
                    border: '1px solid #ccc',
                    borderRadius: 8,
                    padding: '0 2px',
                    display: !imgLoaded || imgError ? 'none' : 'block',
                }}
                alt="img"
            />
            {titleComponents}
        </Box>
    );
};

export default HeaderLogo;
