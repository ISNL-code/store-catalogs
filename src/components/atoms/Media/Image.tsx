import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
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

const ImageComponent = React.forwardRef<HTMLImageElement, ImageProps>(({ imgUrl, store }, ref) => {
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
        <Grid
            xs={12}
            sx={{
                display: 'flex',
                alignItems: 'center',
                height: (ref as React.MutableRefObject<HTMLDivElement>)?.current?.clientWidth
                    ? ((ref as React.MutableRefObject<HTMLDivElement>)?.current?.clientWidth /
                          store?.productImagesOptions?.width) *
                      store?.productImagesOptions?.height
                    : 'auto',
                justifyContent: 'center',
            }}
        >
            {imgLoaded && !imgError ? (
                <img
                    loading="lazy"
                    src={imgUrl}
                    style={{
                        width: '100%',
                    }}
                    alt="Display"
                    ref={ref}
                />
            ) : (
                <Box style={{ textAlign: 'center', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    {imgError ? (
                        <>
                            <PhotoCameraIcon sx={{ fontSize: 56, opacity: 0.25 }} />
                            <Typography sx={{ opacity: 0.25 }}>Error loading image</Typography>
                        </>
                    ) : (
                        <CircularProgress sx={{ color: Colors?.GRAY }} />
                    )}
                </Box>
            )}
        </Grid>
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
