import { Box, Typography } from '@mui/material';
import ContactsButton from 'components/atoms/Buttons/ContactsButton';
import { useDevice } from 'hooks/useDevice';
import Marquee from 'react-fast-marquee';
import Grid from '@mui/material/Unstable_Grid2';
import { useOutletContext } from 'react-router-dom';
import { CatalogContextInterface } from 'types';

const HomePage = () => {
    const { appXPadding }: CatalogContextInterface = useOutletContext();
    const { sx, s } = useDevice();

    return (
        <>
            <Box sx={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
                <ContactsButton />
                <Box style={{ overflow: 'hidden', maxHeight: '100vh', background: '#ccc' }}>
                    <Marquee
                        autoFill
                        loop={10}
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
                        />{' '}
                        <img
                            style={{ maxHeight: '100vh', overflow: 'hidden' }}
                            src={require(`./images/${3}.jpg`)}
                            alt={`Loading ...`}
                        />{' '}
                        <img
                            style={{ maxHeight: '100vh', overflow: 'hidden' }}
                            src={require(`./images/${4}.jpg`)}
                            alt={`Loading ...`}
                        />{' '}
                        <img
                            style={{ maxHeight: '100vh', overflow: 'hidden' }}
                            src={require(`./images/${5}.jpg`)}
                            alt={`Loading ...`}
                        />{' '}
                        <img
                            style={{ maxHeight: '100vh', overflow: 'hidden' }}
                            src={require(`./images/${6}.jpg`)}
                            alt={`Loading ...`}
                        />
                    </Marquee>
                </Box>
            </Box>
            <Grid container xs={12} sx={{ px: appXPadding, mt: 10 }}>
                <Typography
                    sx={{ color: '#fff', zIndex: 1, textShadow: '#000000 1px 1px 2px', fontSize: sx ? 48 : 72 }}
                >
                    Alberto Bini: Elegance in Outerwear
                </Typography>
            </Grid>
        </>
    );
};
export default HomePage;
