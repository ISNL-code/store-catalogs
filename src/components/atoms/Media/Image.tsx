import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useOutletContext } from 'react-router-dom';
import { Colors } from 'colors';

interface ImageProps {
    imgUrl: string;
    store: {
        productImagesOptions: {
            width: number;
            height: number;
        };
    };
}

const ImageComponent = React.forwardRef<HTMLImageElement, ImageProps>(({ imgUrl }, ref) => {
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

        return () => {
            // Clean up if the component unmounts before the image is loaded
            img.onload = null;
            img.onerror = null;
        };
    }, [imgUrl]);

    return (
        <>
            {imgLoaded && !imgError ? (
                <img
                    loading="lazy"
                    src={imgUrl}
                    style={{
                        width: '100%',
                    }}
                    alt="Loading..."
                    ref={ref}
                />
            ) : (
                <CircularProgress sx={{ color: Colors?.GRAY }} />
            )}
        </>
    );
});

export default ImageComponent;

export function EmptyImage() {
    const { string }: any = useOutletContext();
    return (
        <>
            <PhotoCameraIcon sx={{ fontSize: 56, opacity: 0.25, textAlign: 'center' }} />
            <Typography sx={{ width: 150, textAlign: 'center', opacity: 0.25 }}>{string?.image_not_loaded}</Typography>
        </>
    );
}
