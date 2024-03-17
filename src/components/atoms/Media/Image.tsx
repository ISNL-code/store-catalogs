import Grid from '@mui/material/Unstable_Grid2';

const Image = ({ imgUrl, store, ref }) => {
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
};

export default Image;
