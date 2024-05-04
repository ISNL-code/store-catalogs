import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useOutletContext } from 'react-router-dom';
import React from 'react';

interface ImageProps {
    imgUrl: string;
    store: {
        productImagesOptions: {
            width: number;
            height: number;
        };
    };
}

const ImageComponent = React.forwardRef<HTMLImageElement, ImageProps>(({ imgUrl, store }, ref) => (
    <Grid
        xs={12}
        sx={{
            display: 'flex',
            alignItems: 'center',
            height: (ref as React.MutableRefObject<HTMLDivElement>)?.current?.clientWidth
                ? ((ref as React.MutableRefObject<HTMLDivElement>)?.current.clientWidth /
                      store?.productImagesOptions?.width) *
                  store?.productImagesOptions?.height
                : 'auto',
        }}
    >
        <img
            loading="lazy"
            src={imgUrl}
            style={{
                width: '100%',
            }}
            alt="Display"
            ref={ref}
        />
    </Grid>
));

export const Image = ImageComponent;

export function EmptyImage() {
    const { string }: any = useOutletContext();
    return (
        <>
            <PhotoCameraIcon sx={{ fontSize: 56, opacity: 0.25, textAlign: 'center' }} />
            <Typography sx={{ width: 150, textAlign: 'center', opacity: 0.25 }}>{string?.image_not_loaded}</Typography>
        </>
    );
}
