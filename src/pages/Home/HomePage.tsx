import { useEffect } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { useNavigate, useOutletContext } from 'react-router-dom';
import MessageButton from 'components/atoms/Buttons/MessageButton';
import HomeImages from './HomeImages';
import CallBackButton from 'components/atoms/Buttons/CallBackButton';
import { HomeContextInterface } from 'types/outlet_context_models';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { STORE_ROUTE } from 'router/routes';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { scrollPage } from 'utils/scrollPage';
import InformationButton from 'components/atoms/Buttons/InformationButton';
import { telegramSender } from 'utils/telegramSender';

const HomePage = () => {
    const navigate = useNavigate();

    const { STORE_CODE, SIDE_LINKS } = STORE_CONFIG;
    const { appXPadding, footerMenuHeight, string, handleOpenDialog }: HomeContextInterface = useOutletContext();
    const { sx } = useDevice();

    useEffect(() => {
        scrollPage(0);
    }, []);

    const isShown = false || SIDE_LINKS?.find(el => el?.description === 'Retail' || el?.description === 'Wholesale');
    const handleNavigate = el => {
        if (el === 2) {
            const link = SIDE_LINKS?.find(el => el?.description === 'Wholesale')?.href || null;
            if (link) {
                telegramSender({
                    action: `HOME ====> WHOLESALES`,
                });
                window.open(link);
            } else {
                telegramSender({
                    action: `HOME ====> CATALOG`,
                });
                navigate(`${STORE_ROUTE?.root(STORE_CODE)}`);
            }
        }
        if (el === 3) {
            const link = SIDE_LINKS?.find(el => el?.description === 'Retail')?.href || null;
            if (link) {
                telegramSender({
                    action: `HOME ====> RETAILER`,
                });
                window.open(link);
            } else {
                telegramSender({
                    action: `HOME ====> CATALOG`,
                });
                navigate(`${STORE_ROUTE?.root(STORE_CODE)}`);
            }
        }
    };

    return (
        <Box p={sx ? 2 : appXPadding} sx={{ pb: `${footerMenuHeight}px`, mb: sx ? '100vh' : 8 }}>
            <MessageButton action={() => handleOpenDialog(DialogWindowType?.QUESTION)} />
            <CallBackButton path={STORE_ROUTE?.contacts(STORE_CODE)} />
            <InformationButton />
            <HomeImages />
            <Grid item container xs={12} mt={-6} mb={2}>
                <Typography
                    variant="h1"
                    sx={{
                        color: '#fff',
                        zIndex: 1,
                        textShadow: '#000000 0 0 5px',
                        fontSize: sx ? 48 : 80,
                    }}
                >
                    Elegance in Outerwear
                </Typography>
            </Grid>

            <Box
                className="HiddenScroll"
                mb={1}
                sx={{
                    flexWrap: 'nowrap',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    maxWidth: '900px',
                    height: '90vh', // Устанавливаем фиксированную высоту
                    overflowY: 'scroll', // Добавляем вертикальную прокрутку
                    position: 'relative', // Добавляем позиционирование для псевдоэлемента
                    gap: 1,
                }}
            >
                {[1, 2, 3, 4, 5].map((el, idx) => (
                    <Grid
                        key={idx} // Добавляем key для каждого элемента списка
                        item
                        px={sx ? 2 : 4}
                        py={2}
                        xs={12}
                        sx={{
                            backgroundColor: '#ffffff78',
                            zIndex: 2,
                            borderRadius: 1,
                            position: 'relative',
                            '&:last-child': { mb: 200 },
                        }}
                    >
                        <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography sx={{ color: '#000', zIndex: 1, fontSize: sx ? 18 : 32 }}>
                                {string?.[`customer_title_${idx + 1}`]}
                            </Typography>
                            {isShown && (el === 2 || el === 3) && (
                                <Button
                                    size="small"
                                    variant="contained"
                                    sx={{ height: 30, width: sx ? 120 : 140, fontSize: sx ? 10 : 12 }}
                                    onClick={() => {
                                        handleNavigate(el);
                                    }}
                                >
                                    {el === 2 && string?.wholesale_catalog + ' ' + string?.catalog}
                                    {el === 3 && string?.retail_catalog + ' ' + string?.catalog}
                                </Button>
                            )}
                        </Box>

                        <Typography sx={{ color: '#2c2c2c', zIndex: 1, fontWeight: 500, fontSize: sx ? 15 : 22 }}>
                            {string?.[`customer_description_${idx + 1}`]}
                        </Typography>
                    </Grid>
                ))}
            </Box>
        </Box>
    );
};

export default HomePage;
