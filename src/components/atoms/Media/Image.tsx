import React, { useState, useEffect } from 'react';
import { CircularProgress, Box } from '@mui/material';

import { Color } from 'constants/colors';

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
        }, [imgUrl]); // eslint-disable-line

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
        }, [imgUrl]); // eslint-disable-line

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
                        src={imgUrl}
                        style={{
                            width: '100%',
                            height: imgHeight,
                        }}
                        alt="Loading..."
                        ref={ref}
                    />
                ) : (
                    <CircularProgress sx={{ color: Color?.PRIMARY }} thickness={2} />
                )}
            </Box>
        );
    }
);

export default ImageComponent;
