import { useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { useOutletContext } from 'react-router-dom';
import MessageButton from 'components/atoms/Buttons/MessageButton';
import HomeImages from './HomeImages';
import CallBackButton from 'components/atoms/Buttons/CallBackButton';
import { HomeContextInterface } from 'types/outlet_context_models';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { STORE_ROUTE } from 'router/routes';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { scrollPage } from 'utils/scrollPage';
import InformationButton from 'components/atoms/Buttons/InformationButton';

const HomePage = () => {
    const { STORE_CODE } = STORE_CONFIG;
    const { appXPadding, footerMenuHeight, string, handleOpenDialog }: HomeContextInterface = useOutletContext();
    const { sx } = useDevice();

    useEffect(() => {
        scrollPage(0);
    }, []);

    return (
        <Box p={sx ? 2 : appXPadding} sx={{ pb: `${footerMenuHeight}px` }}>
            <MessageButton action={() => handleOpenDialog(DialogWindowType?.QUESTION)} />
            <CallBackButton path={STORE_ROUTE?.contacts(STORE_CODE)} />
            <InformationButton />
            <HomeImages />
            <Box
                className="HiddenScroll"
                mt={-5}
                sx={{
                    flexWrap: 'nowrap',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    maxWidth: '900px',
                    height: '90vh',
                    overflowY: 'scroll',
                    position: 'relative',
                    gap: 1,
                }}
            >
                {[1, 2, 3, 4, 5].map((_el, idx) => (
                    <Grid
                        key={idx}
                        item
                        px={sx ? 2 : 4}
                        py={2}
                        xs={12}
                        sx={{
                            backgroundColor: '#ffffff78',
                            zIndex: 2,
                            borderRadius: 1,
                            position: 'relative',
                            '&:last-child': { mb: sx ? '100vh' : 0 },
                        }}
                    >
                        <Box mb={0.5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography sx={{ color: '#000', zIndex: 1, fontSize: sx ? 18 : 26, fontWeight: 700 }}>
                                {string?.[`customer_title_${idx + 1}`]}
                            </Typography>
                        </Box>

                        <Typography sx={{ color: '#2c2c2c', zIndex: 1, fontWeight: 500, fontSize: sx ? 15 : 18 }}>
                            {string?.[`customer_description_${idx + 1}`]}
                        </Typography>
                    </Grid>
                ))}
            </Box>
        </Box>
    );
};

export default HomePage;
