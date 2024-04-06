import { Button, Fab, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { useOutletContext } from 'react-router-dom';
import { StoresContextInterface } from 'types';
import { useDevice } from 'hooks/useDevice';
import { useState } from 'react';
import AdsClickIcon from '@mui/icons-material/AdsClick';

const Hero = ({ setIsOpen, isOpen }) => {
    const { xxxs, xs, sm, slx, sx, m, mx, l } = useDevice();
    const { string }: StoresContextInterface = useOutletContext();
    const [isOpenText, setIsOpenText] = useState(false);

    const getHeight = () => {
        if (xxxs) return 400;
        if (xs) return 370;
        if (sm) return 300;
        if (slx) return 215;
        if (sx) return 210;
        if (m) return 250;
        if (mx) return 230;
        if (l) return 200;

        return 200;
    };

    const steps = [
        {
            title: 'Выберите Идеальный Тариф',
            description:
                'Выбирайте тариф, идеально соответствующий вашему бизнесу, и наслаждайтесь нашим сервисом, специально подобранным для вас.',
        },
        {
            title: 'Оформите Заявку с Легкостью',
            description:
                'Заполните простую форму обратной связи, чтобы мы могли адаптировать наш сервис под ваши нужды.',
        },
        {
            title: 'Персонализированное Внимание',
            description: 'Наши специалисты оперативно свяжутся с вами, чтобы точно уточнить все детали вашего заказа.',
        },
        {
            title: 'Ваш Уникальный Каталог',
            description: 'Мы зарегистрируем ваш каталог как новый сайт, открывая перед вашим бизнесом новые горизонты.',
        },
        {
            title: 'Полный Контроль в Ваших Руках',
            description:
                'Получите доступ к управлению каталогом, настраивая параметры под свои нужды для полного контроля над контентом.',
        },
        {
            title: 'Легкость Загрузки Товаров',
            description:
                'Добавляйте товары с описаниями, ценами и фото легко и быстро, делая каталог информативным и привлекательным.',
        },
        {
            title: 'Запуск и Продвижение',
            description: 'Запустите каталог и используйте его для продвижения и продажи товаров, расширяя свой рынок.',
        },
    ];

    return (
        <>
            <Grid
                py={4}
                px={2}
                pt={0}
                container
                xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    flexDirection: 'column',
                    background: `linear-gradient(89.7deg, rgb(0, 0, 0) 50.7%, rgb(23, 65, 65) 88.8%);`,
                    width: '100%',
                }}
            >
                <Grid
                    xs={12}
                    mb={2}
                    container
                    ml={-2}
                    sx={{
                        width: '100vw',
                        display: 'flex',
                        justifyContent: 'center',
                        background: `linear-gradient(89.7deg, rgba(163, 163, 163, 0.171) 50.7%, rgba(255, 255, 255, 0.226) 98.8%);`,
                    }}
                >
                    <Grid
                        xs={12}
                        pb={6}
                        sx={{
                            borderRadius: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box
                            p={1}
                            px={4.5}
                            sx={{
                                maxWidth: 370,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                            }}
                        >
                            <Typography variant={'h1'} sx={{ lineHeight: 1.1, color: '#ffffff', textAlign: 'center' }}>
                                {string?.online_catalog_for_your_business}
                            </Typography>
                            <Fab
                                size="small"
                                color="warning"
                                sx={{ position: 'absolute', left: '50%', bottom: -40, transform: 'translateX(-50%)' }}
                                onClick={() => setIsOpenText(!isOpenText)}
                            >
                                <AdsClickIcon sx={{ color: 'white', fontSize: 32 }} />
                            </Fab>
                        </Box>
                    </Grid>
                    <Grid
                        xs={12}
                        sx={{
                            height: isOpenText ? getHeight() : 0,
                            maxHeight: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            transition: 'height 300ms linear',
                        }}
                    >
                        <Box
                            p={3}
                            sx={{
                                maxWidth: 1600,
                            }}
                        >
                            <Typography
                                sx={{ lineHeight: 1.1, color: '#e7e7e7', fontSize: sx ? 18 : 22, textAlign: 'center' }}
                            >
                                {string?.hero_text}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid
                    xs={12}
                    sx={{
                        display: 'flex',
                        maxWidth: 1600,
                        gap: 5,
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: '1400px',
                            borderRadius: 6,
                        }}
                    >
                        <Box
                            px={3}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box>
                                <Typography variant="h2" sx={{ color: 'white' }}>
                                    Чтобы зарегестрировать каталог:
                                </Typography>
                                <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    {steps.map(({ title, description }) => (
                                        <Box
                                            p={1}
                                            sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}
                                        >
                                            <Box mb={1} sx={{ minWidth: 320 }}>
                                                <Typography
                                                    variant="h3"
                                                    sx={{ whiteSpace: 'nowrap', textAlign: 'left' }}
                                                >
                                                    {title}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ maxWidth: 500 }}>
                                                <Typography variant="h5" sx={{ textAlign: 'left' }}>
                                                    {description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    {!mx && (
                        <Box
                            mt={2}
                            sx={{
                                borderRadius: 8,
                                overflow: 'hidden',
                                height: '500px',
                                boxShadow: '0 0 8px 2px #ffffff',
                            }}
                        >
                            <img width="500px" src={require('./img/hero.png')} alt="" />
                        </Box>
                    )}
                </Grid>
                <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                        sx={{ mt: 4, width: 180, height: 40, fontSize: 18 }}
                        variant="contained"
                        size="large"
                    >
                        {string?.request}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Hero;
