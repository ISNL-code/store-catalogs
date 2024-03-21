import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import Stores from 'pages/Stores/Stores';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Marquee from 'react-fast-marquee';

const HomePage = () => {
    const PRICING = [
        { name: 'START', price: '$19.99', rules: ['', '', '', '', '', ''] },
        { name: 'PRO', price: '$39.99', rules: ['', '', '', '', '', ''] },
        { name: 'UNLIM', price: '$69.99', rules: ['', '', '', '', '', ''] },
    ];

    const { sm, mx, l } = useDevice();

    const getGridValue = () => {
        if (sm) return 12;
        if (mx) return 6;
        if (l) return 4;
        return 4;
    };

    return (
        <Grid xs={12} container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid
                mb={1}
                xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                <Grid
                    xs={12}
                    sx={{
                        backgroundColor: '#f0f0f0',
                        maxWidth: '800px',
                    }}
                >
                    <Box p={2}>
                        <Typography variant="h4" sx={{ color: '#000', lineHeight: 1.5 }}>
                            Добро пожаловать в мир инновационных решений для производителей! Наш продукт представляет
                            собой мощный инструмент, который поможет вам, как производителю, эффективно представить вашу
                            продукцию в оптовом сегменте рынка. Мы понимаем, что для вас, как производителя, важно не
                            только создать качественный продукт, но и обеспечить его эффективное продвижение на рынке.
                            Наше программное обеспечение специально разработано для удовлетворения ваших потребностей в
                            создании удобного и информативного интернет-каталога для оптовых продаж. С помощью нашего
                            продукта вы сможете быстро и легко создать каталог, который выделит вашу продукцию среди
                            конкурентов. Представьте ваш ассортимент с подробными описаниями, характеристиками,
                            фотографиями и ценами, привлекая новых оптовых клиентов и увеличивая объемы продаж.
                            Доверьтесь нашему продукту, чтобы сделать ваш бизнес еще более успешным и
                            конкурентоспособным в оптовом сегменте рынка. Давайте вместе создадим каталог, который будет
                            работать на вас, как на производителя, и приведет к росту вашего бизнеса!
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <Grid
                xs={12}
                container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Grid
                    my={2}
                    xs={12}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottom: '1px solid #ccc',
                        borderTop: '1px solid #ccc',
                        backgroundColor: '#fcfcfc',
                    }}
                >
                    <Box sx={{ maxWidth: 1240 }} p={1}>
                        <Typography sx={{ fontSize: 32, fontWeight: 500 }}>Тарифи:</Typography>
                    </Box>
                </Grid>
                <Grid
                    xs={12}
                    container
                    sx={{
                        background: `url(${require('./img/bcg.png')})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Grid
                        xs={12}
                        container
                        p={1}
                        sx={{
                            maxWidth: 1240,
                            minHeight: '530px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {PRICING.map(({ name, price, rules }, index) => (
                            <Grid xs={getGridValue()} key={index} p={1}>
                                <Box
                                    sx={{
                                        width: '100%',
                                        backgroundColor: 'white',
                                        borderRadius: 4,
                                        boxShadow: '0 0 2px 1px #969696',
                                    }}
                                >
                                    <Box
                                        p={2}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            borderBottom: '1px solid #ccc',
                                        }}
                                    >
                                        <Typography sx={{ color: 'gray', fontSize: 28 }}>{name}</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography sx={{ fontSize: 32, color: 'red' }}>{price}</Typography>
                                            <Typography sx={{ fontSize: 18, color: 'gray' }}>/мi</Typography>
                                        </Box>
                                    </Box>
                                    <Box p={2} sx={{ borderBottom: '1px solid #ccc' }}>
                                        {rules.map((el, idx) => (
                                            <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                {idx < 3 || index === 2 ? (
                                                    <Box
                                                        sx={{
                                                            width: 20,
                                                            height: 20,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            border: '1px solid #ccc',
                                                            backgroundColor: 'green',
                                                            borderRadius: '50%',
                                                        }}
                                                    >
                                                        <CheckIcon
                                                            sx={{ color: '#fff', fontSize: 14, fontWeight: 700 }}
                                                        />
                                                    </Box>
                                                ) : (
                                                    <Box
                                                        sx={{
                                                            width: 20,
                                                            height: 20,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            border: '1px solid #ccc',
                                                            backgroundColor: 'red',
                                                            borderRadius: '50%',
                                                        }}
                                                    >
                                                        <CloseIcon
                                                            sx={{ color: '#fff', fontSize: 14, fontWeight: 700 }}
                                                        />
                                                    </Box>
                                                )}
                                                <Typography>{el}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                    <Box p={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button size="large" variant="outlined">
                                            Замовити
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                my={2}
                xs={12}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid #ccc',
                    borderTop: '1px solid #ccc',
                }}
            >
                <Box sx={{ maxWidth: 1240 }} p={1}>
                    <Typography sx={{ fontSize: 32, fontWeight: 500 }}>Приклади:</Typography>
                </Box>
            </Grid>
            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center' }} md={12} container>
                <Box sx={{ width: '100%' }}>
                    <Marquee style={{ display: 'flex' }} loop={0} speed={75}>
                        <Stores />
                    </Marquee>
                </Box>
            </Grid>
        </Grid>
    );
};

export default HomePage;
