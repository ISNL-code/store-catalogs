import { Box, Typography } from '@mui/material';
import ContactsButton from 'components/atoms/Buttons/ContactsButton';
import { useDevice } from 'hooks/useDevice';
import Marquee from 'react-fast-marquee';
import Grid from '@mui/material/Unstable_Grid2';
import { useOutletContext } from 'react-router-dom';

const HomePage = () => {
    const { string }: any = useOutletContext();
    const { sx, s } = useDevice();

    return (
        <>
            <Box sx={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
                <ContactsButton />
                <Box style={{ overflow: 'hidden', maxHeight: '100vh', background: '#ccc', maxWidth: '100vw' }}>
                    <Marquee
                        // autoFill
                        loop={0}
                        speed={65}
                        gradient
                        gradientColor="#6666664e"
                        gradientWidth={s ? 100 : 300}
                    >
                        <img
                            style={{ maxHeight: '100vh', overflow: 'hidden' }}
                            src={require(`./images/${1}.jpg`)}
                            alt={`Loading...`}
                        />
                        <img
                            style={{ maxHeight: '100vh', overflow: 'hidden' }}
                            src={require(`./images/${2}.jpg`)}
                            alt={`Loading ...`}
                        />
                        <img
                            style={{ maxHeight: '100vh', overflow: 'hidden' }}
                            src={require(`./images/${3}.jpg`)}
                            alt={`Loading ...`}
                        />
                        <img
                            style={{ maxHeight: '100vh', overflow: 'hidden' }}
                            src={require(`./images/${4}.jpg`)}
                            alt={`Loading ...`}
                        />
                        <img
                            style={{ maxHeight: '100vh', overflow: 'hidden' }}
                            src={require(`./images/${5}.jpg`)}
                            alt={`Loading ...`}
                        />
                        <img
                            style={{ maxHeight: '100vh', overflow: 'hidden' }}
                            src={require(`./images/${6}.jpg`)}
                            alt={`Loading ...`}
                        />
                        <img
                            style={{ maxHeight: '100vh', overflow: 'hidden' }}
                            src={require(`./images/${7}.jpg`)}
                            alt={`Loading ...`}
                        />
                        <img
                            style={{ maxHeight: '100vh', overflow: 'hidden' }}
                            src={require(`./images/${8}.jpg`)}
                            alt={`Loading ...`}
                        />
                        <img
                            style={{ maxHeight: '100vh', overflow: 'hidden' }}
                            src={require(`./images/${9}.jpg`)}
                            alt={`Loading ...`}
                        />
                        <img
                            style={{ maxHeight: '100vh', overflow: 'hidden' }}
                            src={require(`./images/${10}.jpg`)}
                            alt={`Loading ...`}
                        />
                        <img
                            style={{ maxHeight: '100vh', overflow: 'hidden' }}
                            src={require(`./images/${11}.jpg`)}
                            alt={`Loading ...`}
                        />
                        <img
                            style={{ maxHeight: '100vh', overflow: 'hidden' }}
                            src={require(`./images/${12}.jpg`)}
                            alt={`Loading ...`}
                        />
                    </Marquee>
                </Box>
            </Box>
            <Grid container xs={12} mt={-5}>
                <Typography
                    variant="h1"
                    sx={{ color: '#fff', zIndex: 1, textShadow: '#000000 0 0 5px', fontSize: sx ? 56 : 96 }}
                >
                    Elegance in Outerwear
                </Typography>
            </Grid>
            <Grid
                xs={12}
                container
                mt={sx ? 1 : 3}
                sx={{
                    flexWrap: 'wrap',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '900px',
                }}
            >
                <Grid
                    p={sx ? 1 : 4}
                    py={sx ? 1 : 2}
                    container
                    xs={12}
                    mt={2}
                    sx={{ backgroundColor: '#ffffff78', zIndex: 2, borderRadius: 1 }}
                >
                    <Typography sx={{ color: '#000', zIndex: 1, fontSize: sx ? 24 : 38 }}>
                        {string?.customer_title_1}
                    </Typography>
                    <Typography sx={{ color: '#2c2c2c', zIndex: 1, fontWeight: 500, fontSize: sx ? 18 : 26 }}>
                        {string?.customer_description_1}
                    </Typography>
                </Grid>
                <Grid
                    p={sx ? 1 : 4}
                    py={sx ? 1 : 2}
                    container
                    xs={12}
                    mt={2}
                    sx={{ backgroundColor: '#ffffff78', zIndex: 2, borderRadius: 1 }}
                >
                    <Typography sx={{ color: '#000', zIndex: 1, fontSize: sx ? 24 : 38 }}>
                        {string?.customer_title_2}
                    </Typography>
                    <Typography sx={{ color: '#2c2c2c', zIndex: 1, fontWeight: 500, fontSize: sx ? 18 : 26 }}>
                        {string?.customer_description_2}
                    </Typography>
                </Grid>
                <Grid
                    p={sx ? 1 : 4}
                    py={sx ? 1 : 2}
                    container
                    xs={12}
                    mt={2}
                    sx={{ backgroundColor: '#ffffff78', zIndex: 2, borderRadius: 1 }}
                >
                    <Typography sx={{ color: '#000', zIndex: 1, fontSize: sx ? 24 : 38 }}>
                        {string?.customer_title_3}
                    </Typography>
                    <Typography sx={{ color: '#2c2c2c', zIndex: 1, fontWeight: 500, fontSize: sx ? 18 : 26 }}>
                        {string?.customer_description_3}{' '}
                    </Typography>
                </Grid>
                <Grid
                    p={sx ? 1 : 4}
                    py={sx ? 1 : 2}
                    container
                    xs={12}
                    mt={2}
                    sx={{ backgroundColor: '#ffffff78', zIndex: 2, borderRadius: 1 }}
                >
                    <Typography sx={{ color: '#000', zIndex: 1, fontSize: sx ? 24 : 38 }}>
                        {string?.customer_title_4}
                    </Typography>
                    <Typography sx={{ color: '#2c2c2c', zIndex: 1, fontWeight: 500, fontSize: sx ? 18 : 26 }}>
                        {string?.customer_description_4}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};
export default HomePage;
