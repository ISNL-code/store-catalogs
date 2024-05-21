import { useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { useOutletContext } from 'react-router-dom';
import MessageButton from 'components/atoms/Buttons/MessageButton';
import { motion } from 'framer-motion';
import HomeImages from './HomeImages';
import CallBackButton from 'components/atoms/Buttons/CallBackButton';
import { HomeContextInterface } from 'types';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { STORE_ROUTE } from 'constants/routes';
import { STORE_CONFIG } from 'store_constants/stores_config';

const HomePage = () => {
    const { STORE_CODE } = STORE_CONFIG;
    const { appXPadding, footerMenuHeight, string, headerHeight, handleOpenDialog }: HomeContextInterface =
        useOutletContext();
    const { sx } = useDevice();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    }, []);

    const variants = num => {
        return { hidden: { opacity: sx ? 0 : 1, y: sx ? 100 * num : 0 }, visible: { opacity: 1, y: 0 } };
    };

    return (
        <Box p={sx ? 2 : appXPadding} pb={footerMenuHeight}>
            <MessageButton action={() => handleOpenDialog(DialogWindowType?.QUESTION)} />
            <CallBackButton path={STORE_ROUTE?.contacts(STORE_CODE)} />
            <HomeImages />
            <Grid item container xs={12} mt={-2} sx={{ mb: sx ? '100vh' : 2 }}>
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
                item
                xs={12}
                mb={1}
                container
                sx={{
                    flexWrap: 'wrap',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    minHeight: `calc(100vh - ${headerHeight}px - ${footerMenuHeight} - 16px)`,
                }}
            >
                {[1, 2, 2, 2].map((el, idx) => (
                    <motion.div
                        key={idx}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        variants={variants(el)}
                        style={{ maxWidth: '1000px', zIndex: 2 }}
                    >
                        <Grid
                            item
                            px={sx ? 2 : 4}
                            py={sx ? 1 : 2}
                            container
                            xs={12}
                            mt={1.2}
                            sx={{ backgroundColor: '#ffffff78', zIndex: 2, borderRadius: 1, position: 'relative' }}
                        >
                            <Typography sx={{ color: '#000', zIndex: 1, fontSize: sx ? 23 : 36 }}>
                                {string?.[`customer_title_${idx + 1}`]}
                            </Typography>
                            <Typography sx={{ color: '#2c2c2c', zIndex: 1, fontWeight: 500, fontSize: sx ? 15 : 24 }}>
                                {string?.[`customer_description_${idx + 1}`]}
                            </Typography>
                        </Grid>
                    </motion.div>
                ))}
            </Grid>
        </Box>
    );
};

export default HomePage;
