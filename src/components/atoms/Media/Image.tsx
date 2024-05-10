import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useOutletContext } from 'react-router-dom';
import { Colors } from 'colors';

interface ImageProps {
    imgUrl: string;
    height?;
    imgHeight?;
    loadControl?;
}

const ImageComponent = React.forwardRef<HTMLImageElement, ImageProps>(
    ({ imgUrl, height = '100%', imgHeight = 'auto', loadControl = () => {} }, ref) => {
        const [imgLoaded, setImgLoaded] = useState(false);
        const [imgError, setImgError] = useState(false);

        useEffect(() => {
            setImgLoaded(false);
            loadControl(true);
        }, [imgUrl]);

        useEffect(() => {
            const img = new Image();
            img.src = imgUrl;
            img.onload = () => {
                setImgLoaded(true);
                loadControl(false);
            };
            img.onerror = () => {
                loadControl(false);
                setImgLoaded(true);
                setImgError(true); // Handle error case
            };

            return () => {
                // Clean up if the component unmounts before the image is loaded
                img.onload = null;
                img.onerror = null;
            };
        }, [imgUrl]);

        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: height,
                }}
            >
                {imgLoaded && !imgError ? (
                    <img
                        loading="lazy"
                        src={imgUrl}
                        style={{
                            width: '100%',
                            height: imgHeight,
                        }}
                        alt="Loading..."
                        ref={ref}
                    />
                ) : (
                    <CircularProgress sx={{ color: Colors?.GRAY }} thickness={2} />
                )}
            </Box>
        );
    }
);

export default ImageComponent;

export function EmptyImage({ height }: { height? }) {
    const { string }: any = useOutletContext();
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: height,
                flexDirection: 'column',
            }}
        >
            <PhotoCameraIcon sx={{ fontSize: 56, opacity: 0.25, textAlign: 'center' }} />
            <Typography sx={{ width: 150, textAlign: 'center', opacity: 0.25 }}>{string?.image_not_loaded}</Typography>
        </Box>
    );
}
