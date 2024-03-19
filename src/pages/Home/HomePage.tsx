import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Stores from 'pages/Stores/Stores';

const HomePage = () => {
    return (
        <Grid xs={12} container spacing={2}>
            <Grid
                container
                xs={12}
                sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Grid
                    xs={12}
                    sx={{
                        width: '100%',
                        height: '510px',
                        background: `url(${require('./img/bcg.png')})`,
                        filter: 'blur(4px)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                    }}
                ></Grid>
                <Grid
                    xs={12}
                    container
                    sx={{
                        position: 'absolute',
                        top: '45%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        zIndex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Grid
                        xs={2}
                        sx={{
                            p: 1,

                            border: '1px solid #ccc',
                            backgroundColor: 'white',
                            borderRadius: 4,
                            boxShadow: '0 0 10px 4px #969696',
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h2" sx={{ color: '#000', lineHeight: 1.5 }}>
                            Бизнес Каталог
                        </Typography>
                    </Grid>
                    <Grid
                        xs={10}
                        sx={{
                            p: 2,
                            px: 8,
                            border: '1px solid #ccc',
                            backgroundColor: 'white',
                            borderRadius: 4,
                            boxShadow: '0 0 10px 4px #969696',
                        }}
                    >
                        <Box>
                            <Typography variant="h4" sx={{ color: '#000', lineHeight: 1.5 }}>
                                Добро пожаловать в мир инновационных решений для производителей! Наш продукт
                                представляет собой мощный инструмент, который поможет вам, как производителю, эффективно
                                представить вашу продукцию в оптовом сегменте рынка. Мы понимаем, что для вас, как
                                производителя, важно не только создать качественный продукт, но и обеспечить его
                                эффективное продвижение на рынке. Наше программное обеспечение специально разработано
                                для удовлетворения ваших потребностей в создании удобного и информативного
                                интернет-каталога для оптовых продаж. С помощью нашего продукта вы сможете быстро и
                                легко создать каталог, который выделит вашу продукцию среди конкурентов. Представьте ваш
                                ассортимент с подробными описаниями, характеристиками, фотографиями и ценами, привлекая
                                новых оптовых клиентов и увеличивая объемы продаж. Доверьтесь нашему продукту, чтобы
                                сделать ваш бизнес еще более успешным и конкурентоспособным в оптовом сегменте рынка.
                                Давайте вместе создадим каталог, который будет работать на вас, как на производителя, и
                                приведет к росту вашего бизнеса!
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            <Grid xs={12} container>
                <Grid py={2} xs={12} sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 36, fontWeight: 700, color: 'gray' }}>Приклади:</Typography>
                </Grid>
                <Grid px={10} container xs={12}>
                    <Stores />
                </Grid>
            </Grid>
            <Grid xs={12} container>
                <Grid py={2} xs={12} sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 36, fontWeight: 700, color: 'gray' }}>Тарифи:</Typography>
                </Grid>
                <Grid px={10} container xs={12}>
                    <Grid p={1} xs={4}>
                        <Box
                            sx={{
                                border: '1px solid #ccc',
                                width: '100%',
                                height: '300px',
                                backgroundColor: 'white',
                                borderRadius: 4,
                                boxShadow: '0 0 10px 1px #969696',
                            }}
                        ></Box>
                    </Grid>
                    <Grid p={1} xs={4}>
                        <Box
                            sx={{
                                border: '1px solid #ccc',
                                width: '100%',
                                height: '300px',
                                backgroundColor: 'white',
                                borderRadius: 4,
                                boxShadow: '0 0 10px 1px #969696',
                            }}
                        ></Box>
                    </Grid>
                    <Grid p={1} xs={4}>
                        <Box
                            sx={{
                                border: '1px solid #ccc',
                                width: '100%',
                                height: '300px',
                                backgroundColor: 'white',
                                borderRadius: 4,
                                boxShadow: '0 0 10px 1px #969696',
                            }}
                        ></Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default HomePage;
