import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useOutletContext } from 'react-router-dom';

export default function Image({ imgUrl, store, ref }) {
    return (
        <Grid
            xs={12}
            alignContent="center"
            sx={{
                height:
                    ((ref?.current?.clientWidth as number) / store?.productImagesOptions?.width) *
                    store?.productImagesOptions?.height,
            }}
        >
            <img
                src={imgUrl}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
                alt="broken img"
            />
        </Grid>
    );
}

export function EmptyImage() {
    const { string }: any = useOutletContext();
    return (
        <>
            <PhotoCameraIcon sx={{ fontSize: 56, opacity: 0.25, textAlign: 'center' }} />
            <Typography sx={{ width: 150, textAlign: 'center', opacity: 0.25 }}>{string?.image_not_loaded}</Typography>
        </>
    );
}
