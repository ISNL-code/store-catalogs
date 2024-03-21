import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import Stores from 'pages/Stores/Stores';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Marquee from 'react-fast-marquee';
import { useState } from 'react';

const HomePage = () => {
    const [storesDetails, setStoresDetails] = useState(false);

    const PRICING = [
        {
            name: 'START',
            price: '$19.99',
            rules: [
                { title: 'Основной функционал', available: true },
                { title: 'Кабинет администратора', available: true },
                { title: 'Администраторов: 1', available: true },
                { title: 'Количество продуктов/моделей/фото: 50/5/5', available: true },
                { title: 'Мови каталогу: ua, en, es, fr, pl, cz, ru', available: true },
                { title: 'Google Analytics', available: false },
                { title: 'Play Market', available: false },
                { title: 'Apple Store', available: false },
                { title: 'Кошик', available: false },
                { title: 'Кастомизация Каталога', available: false },
            ],
        },
        {
            name: 'PRO',
            price: '$39.99',
            rules: [
                { title: 'Основной функционал', available: true },
                { title: 'Кабинет администратора', available: true },
                { title: 'Администраторов: 5', available: true },
                { title: 'Количество продуктов/моделей/фото: 200/10/10', available: true },
                { title: 'Мови каталогу: ua, en, es, fr, pl, cz, ru', available: true },
                { title: 'Google Analytics', available: true },
                { title: 'Кошик', available: true },
                { title: 'Play Market', available: false },
                { title: 'Apple Store', available: false },
                { title: 'Кастомизация Каталога', available: false },
            ],
        },
        {
            name: 'UNLIM',
            price: '$99.99',
            rules: [
                { title: 'Основной функционал', available: true },
                { title: 'Кабинет администратора', available: true },
                { title: 'Администраторов: неограниченно', available: true },
                { title: 'Количество продуктов/моделей/фото: неограниченно', available: true },
                { title: 'Мови каталогу: ua, en, es, fr, pl, cz, ru, +...  ', available: true },
                { title: 'Google Analytics', available: true },
                { title: 'Кошик', available: true },
                { title: 'Play Market', available: true },
                { title: 'Apple Store', available: true },
                { title: 'Кастомизация Каталога', available: true },
            ],
        },
    ];

    const TOOLS = [
        {
            name: 'Для Власникiв',
            price: '',
            rules: [
                {
                    title: 'Увеличение доступности',
                    description:
                        'Электронный каталог делает продукцию доступной для клиентов в любое время и из любого места, что может привести к расширению аудитории и увеличению продаж.',
                },
                {
                    title: 'Удобное управление',
                    description:
                        'Позволяет быстро и эффективно управлять ассортиментом товаров, обновлять информацию и фотографии, а также оперативно реагировать на изменения в спросе.',
                },
                {
                    title: 'Повышение эффективности продаж',
                    description:
                        'Интеграция функциональности корзины позволяет покупателям легко собирать заказы, что способствует увеличению конверсии и среднего чека.',
                },
                {
                    title: 'Мультиязычность',
                    description:
                        'Поддержка нескольких языков упрощает работу с клиентами из разных стран, делая каталог более привлекательным для международной аудитории.',
                },
                {
                    title: 'Использование внутри компании',
                    description:
                        'Каталог может служить не только инструментом продаж, но и средством внутренней коммуникации и координации для персонала, обеспечивая им быстрый доступ к актуальной информации о продукции.',
                },
            ],
        },
        {
            name: 'Для Замовникiв',
            price: '',
            rules: [
                {
                    title: 'Удобство и доступность',
                    description:
                        'Позволяет покупателям искать и ознакомиться с ассортиментом товаров в любое удобное время и место через интернет.',
                },
                {
                    title: 'Легкий поиск и сравнение',
                    description:
                        'Пользователи могут использовать удобные фильтры и поиск для быстрого нахождения интересующих товаров, а также сравнивать их характеристики и цены.',
                },
                {
                    title: 'Удобство для сбора оптовых заказов',
                    description:
                        'Корзина позволяет покупателям удобно собирать оптовые заказы, добавляя необходимые товары в неё по мере необходимости, что упрощает процесс закупки крупными партиями товаров.',
                },
                {
                    title: 'Мультиязычность',
                    description:
                        'Наличие нескольких языков делает каталог более доступным для широкой аудитории, что упрощает понимание информации о товарах и услугах.',
                },
                {
                    title: 'Повышение уровня сервиса',
                    description:
                        'Электронный каталог обеспечивает возможность быстрого получения подробной информации о товарах, их наличии и ценах, что способствует принятию более осознанных решений о покупке.',
                },
            ],
        },
    ];

    const { sm, l, sx } = useDevice();

    const getPRICINGGridValue = () => {
        if (sm) return 12;
        if (l) return 6;
        return 4;
    };

    const getTOOLSGridValue = () => {
        if (sm) return 12;
        return 6;
    };

    return (
        <Grid xs={12} container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid
                py={2}
                px={3}
                container
                xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    flexDirection: 'column',
                    background:
                        'url(https://www.etisalat.ae/content/dam/etisalat/business-images/smb/2023/business-online/business-online-portal/self-registration-desktop.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPositionX: '100%',
                    backgroundSize: 'cover',
                }}
            >
                <Grid
                    xs={12}
                    sx={{
                        maxWidth: '1200px',
                        backgroundColor: 'white',
                        opacity: 0.75,
                        borderRadius: 6,
                        boxShadow: '0 0 5px 3px #fff',
                    }}
                >
                    <Box p={4}>
                        <Typography variant={sx ? 'h3' : 'h2'} sx={{ lineHeight: 1.1, color: '#000' }}>
                            Онлайн каталог товарів - це програмне рішення, яке дозволяє створювати електронні каталоги з
                            описом товарів. Воно надає інструменти для зручного додавання товарів, класифікації, опису,
                            фотографій та іншої важливої ​​інформації. Користувачі можуть організовувати товари в різні
                            категорії, застосовувати фільтри, здійснювати пошук для спрощення навігації. Часто
                            використовуються компаніями для створення віртуальних торгових каталогів,
                            інтернет-магазинів, представлення продукції на виставках та презентаціях.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Grid
                px={2}
                xs={12}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: sx ? 'flex-start' : 'center',
                    borderTop: '1px solid #ccc',
                    maxWidth: 1600,
                }}
            >
                <Box sx={{}} p={1}>
                    <Typography sx={{ fontSize: 28, fontWeight: 500 }}>Переваги:</Typography>
                </Box>
                {/* <Button variant="contained" sx={{ ml: 'auto' }}>
                    Детальнiше
                </Button> */}
            </Grid>
            <Grid xs={12} container px={1} pb={2} sx={{ maxWidth: 1600 }}>
                <Grid xs={12} container>
                    {TOOLS.map(({ name, price, rules }, index) => (
                        <Grid xs={getTOOLSGridValue()} key={index} p={1} sx={{}}>
                            <Box
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: 4,
                                    boxShadow: '0 0 2px 1px green',
                                    overflow: 'hidden',
                                }}
                            >
                                <Box
                                    px={2}
                                    py={0.75}
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderBottom: '1px solid #ccc',
                                        backgroundColor: 'green',
                                        opacity: 0.8,
                                    }}
                                >
                                    <Typography
                                        sx={{ width: '100%', color: '#fff', fontSize: 20, textAlign: 'center' }}
                                    >
                                        {name}
                                    </Typography>
                                </Box>
                                <Box p={1.5} sx={{ borderBottom: '1px solid #ccc', minHeight: 325 }}>
                                    {rules.map((el, idx) => (
                                        <Box
                                            key={idx}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 0.5,
                                                mb: 0.75,
                                            }}
                                        >
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
                                                    opacity: 0.8,
                                                }}
                                            >
                                                <CheckIcon
                                                    sx={{
                                                        p: 0.25,
                                                        color: '#fff',
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        width: 20,
                                                        height: 20,
                                                    }}
                                                />
                                            </Box>

                                            <Typography sx={{ color: 'gray' }}>
                                                <b style={{ color: '#000' }}>{el?.title}: </b> {el?.description}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid
                xs={12}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: sx ? 'flex-start' : 'center',
                    borderTop: '1px solid #ccc',
                    backgroundColor: '#f5f5f5',
                }}
            >
                <Box
                    px={2}
                    sx={{
                        width: '100%',
                        maxWidth: 1600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{}} p={1}>
                        <Typography sx={{ fontSize: 28, fontWeight: 500 }}>Приклади:</Typography>
                    </Box>
                    <Button onClick={() => setStoresDetails(!storesDetails)} variant="contained" sx={{ ml: 'auto' }}>
                        Детальнiше
                    </Button>
                </Box>
            </Grid>
            <Grid
                pb={2}
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f5f5f5' }}
                md={12}
                container
            >
                {!storesDetails ? (
                    <Box sx={{ width: '100%', backgroundColor: '#f5f5f5' }}>
                        <Marquee style={{ display: 'flex' }} loop={0} speed={75}>
                            <Stores details={false} />
                        </Marquee>
                    </Box>
                ) : (
                    <Grid p={1} container xs={12} sx={{ width: '100%', maxWidth: 1600, backgroundColor: '#f5f5f5' }}>
                        <Stores details />
                    </Grid>
                )}
            </Grid>
            <Grid
                mb={2}
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
                    xs={12}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: sx ? 'flex-start' : 'center',
                        borderTop: '1px solid #ccc',
                        backgroundColor: '#fff',
                    }}
                >
                    <Box
                        px={2}
                        sx={{
                            width: '100%',
                            maxWidth: 1600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box sx={{}} p={1}>
                            <Typography sx={{ fontSize: 28, fontWeight: 500 }}>Тарифи:</Typography>
                        </Box>
                        {/* <Button variant="contained" sx={{ ml: 'auto' }}>
                            Детальнiше
                        </Button> */}
                    </Box>
                </Grid>
                <Grid
                    // p={10}
                    xs={12}
                    container
                    sx={{
                        background: sx ? '' : `url(${require('./img/bcg.png')})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'cover',
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
                            maxWidth: 1600,
                            minHeight: '480px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {PRICING.map(({ name, price, rules }, index) => (
                            <Grid xs={getPRICINGGridValue()} key={index} p={1}>
                                <Box
                                    sx={{
                                        width: '100%',
                                        backgroundColor: 'white',
                                        borderRadius: 4,
                                        boxShadow: '0 0 2px 1px #1976d2',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Box
                                        px={2}
                                        py={0.75}
                                        sx={{
                                            background: '#1976d2',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            borderBottom: '1px solid #1976d2',
                                            opacity: 0.8,
                                        }}
                                    >
                                        <Typography sx={{ color: '#fff', fontSize: 20 }}>{name}</Typography>
                                        {price && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography sx={{ fontSize: 24, color: '#fff' }}>{price}</Typography>
                                                <Typography mb={1} sx={{ fontSize: 16, color: '#fff' }}>
                                                    / мiсяць
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                    <Box p={1.5} sx={{}}>
                                        {rules.map((el, idx) => (
                                            <Box
                                                key={idx}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                    mb: 0.75,
                                                }}
                                            >
                                                {el?.available ? (
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
                                                            opacity: 0.8,
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
                                                            opacity: 0.8,
                                                        }}
                                                    >
                                                        <CloseIcon
                                                            sx={{ color: '#fff', fontSize: 14, fontWeight: 700 }}
                                                        />
                                                    </Box>
                                                )}
                                                <Typography>{el?.title}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                    <Box
                                        p={1.5}
                                        sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#eeeeee' }}
                                    >
                                        <Button size="large" variant="outlined" sx={{ backgroundColor: '#fff' }}>
                                            Замовити
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default HomePage;
