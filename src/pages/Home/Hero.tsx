import { Button, Fab, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { useOutletContext } from 'react-router-dom';
import { StoresContextInterface } from 'types';
import { useDevice } from 'hooks/useDevice';
import { useState } from 'react';
import AdsClickIcon from '@mui/icons-material/AdsClick';

const Hero = ({ setIsOpen, isOpen }) => {
    const { xxxs, xxs, xs, sm, slx, sx, m, mx, l } = useDevice();
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
            title: 'Выбор Тарифа',
            description: 'Выбирайте тариф, идеально соответствующий вашему бизнесу.',
        },
        {
            title: 'Оформиление Заявки',
            description: 'Заполните простую форму обратной связи и наши специалисты свяжутся с вами.',
        },

        {
            title: 'Создание Каталог',
            description: 'Мы зарегистрируем ваш каталог как новый сайт.',
        },
        {
            title: 'Подключение Админ Панели',
            description: 'Получите доступ к управлению каталогом, настраивая параметры под свои нужды.',
        },
        {
            title: 'Загрузка Товаров',
            description: 'Добавляйте товары с описаниями, ценами и фото легко и быстро.',
        },
        {
            title: 'Запуск и Продвижение',
            description: 'Запустите каталог и используйте его для продвижения и продажи товаров.',
        },
    ];

    return (
        <>
            <Grid
                py={4}
                // px={2}
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
                        }}
                    >
                        <Box
                            px={1}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box>
                                <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    {steps.map(({ title, description }, idx) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {!xxs && (
                                                <Box
                                                    sx={{
                                                        backgroundColor: 'white',
                                                        borderRadius: 6,
                                                        width: 45,
                                                        height: 45,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        border: '1px solid #ccc',
                                                        boxShadow: '0 0 2px 2px #ccc',
                                                        position: 'relative',
                                                        background:
                                                            idx === 0
                                                                ? 'linear-gradient(94deg, rgba(254,64,64,1) 40%, rgba(255,139,139,1) 79%, rgba(255,165,165,1) 93%, rgba(255,255,255,1) 100%)'
                                                                : idx !== 5
                                                                ? 'linear-gradient(94deg, #fec240 40%, #ffea8b 79%, #ffee8e 93%, rgba(255,255,255,1) 100%)'
                                                                : 'linear-gradient(94deg, #009619 40%, #6cca00 79%, #e7ffa5 99%)',
                                                    }}
                                                >
                                                    <Typography variant="h1">{idx + 1}</Typography>
                                                    {idx < 5 && (
                                                        <Box
                                                            sx={{
                                                                width: '5px',
                                                                border: '2px solid #ccc',
                                                                height: 80,
                                                                position: 'absolute',
                                                                top: 46,
                                                                backgroundColor: '#fff',
                                                            }}
                                                        ></Box>
                                                    )}
                                                </Box>
                                            )}
                                            <Box
                                                px={1.5}
                                                py={0.75}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',

                                                    borderRadius: 2,
                                                    height: 80,
                                                    width: 320,
                                                    border: '2px solid #ccc',
                                                    backgroundColor: 'rgba(25, 63, 63, 0.877) ',
                                                }}
                                            >
                                                <Box
                                                    mb={0.75}
                                                    p={0.25}
                                                    sx={{
                                                        background:
                                                            idx === 0
                                                                ? 'linear-gradient(94deg, #fe4040ce 40%, #ff8b8bbc 79%, #ffa5a5cf 99%)'
                                                                : idx !== 5
                                                                ? 'linear-gradient(94deg, #fec240cf 40%, #ffea8bd6 79%, #ffee8ed6 99%)'
                                                                : 'linear-gradient(94deg, #009619b9 40%, #6cca00b5 79%, #e7ffa56c 99%)',
                                                        borderRadius: 2,
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 700,
                                                            fontSize: 17,
                                                            whiteSpace: 'nowrap',
                                                            color: '#000',
                                                        }}
                                                    >
                                                        {title}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6" sx={{ color: '#fff' }}>
                                                        {description}
                                                    </Typography>
                                                </Box>
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
