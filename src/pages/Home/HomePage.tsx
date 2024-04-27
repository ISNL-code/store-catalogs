import { Box, Typography } from '@mui/material';
import ContactsButton from 'components/atoms/Buttons/ContactsButton';
import { useDevice } from 'hooks/useDevice';
import Marquee from 'react-fast-marquee';
import Grid from '@mui/material/Unstable_Grid2';
import { useOutletContext } from 'react-router-dom';
import MessageButton from 'components/atoms/Buttons/MessageButton';
import { motion } from 'framer-motion';

const HomePage = () => {
    const { string }: any = useOutletContext();
    const { sx, s } = useDevice();

    const variants = num => {
        return { hidden: { opacity: sx ? 0 : 1, y: sx ? 100 * num : 0 }, visible: { opacity: 1, y: 0 } };
    };

    return (
        <>
            <MessageButton action={() => {}} />
            <ContactsButton />
            <Box sx={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
                <Box style={{ overflow: 'hidden', maxHeight: '100vh', background: '#ccc', maxWidth: '100vw' }}>
                    <Marquee loop={0} speed={65} gradient gradientColor="#6666664e" gradientWidth={s ? 100 : 300}>
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
            <Grid container xs={12} mt={-4} sx={{ position: 'fixed' }}>
                <Typography
                    variant="h1"
                    sx={{
                        color: '#fff',
                        zIndex: 1,
                        textShadow: '#000000 0 0 5px',
                        fontSize: sx ? 48 : 96,
                    }}
                >
                    Elegance in Outerwear
                </Typography>
            </Grid>
            <Grid
                mb={sx ? 18 : 0}
                xs={12}
                container
                mt={sx ? '90vh' : 5}
                sx={{
                    flexWrap: 'wrap',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '900px',
                }}
            >
                {[1, 2, 2, 2].map(el => (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        variants={variants(el)}
                        style={{ width: '100%', zIndex: 2 }}
                    >
                        <Grid
                            p={sx ? 1 : 4}
                            py={sx ? 1 : 1.75}
                            container
                            xs={12}
                            mt={1.2}
                            sx={{ backgroundColor: '#ffffff78', zIndex: 2, borderRadius: 1, position: 'relative' }}
                        >
                            <Typography sx={{ color: '#000', zIndex: 1, fontSize: sx ? 23 : 36 }}>
                                {string?.[`customer_title_${el}`]}
                            </Typography>
                            <Typography sx={{ color: '#2c2c2c', zIndex: 1, fontWeight: 500, fontSize: sx ? 15 : 24 }}>
                                {string?.[`customer_description_${el}`]}
                            </Typography>
                        </Grid>
                    </motion.div>
                ))}
            </Grid>
        </>
    );
};
export default HomePage;
