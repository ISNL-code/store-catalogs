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
        { name: 'Additional', price: '', rules: ['', '', '', '', '', ''] },
    ];

    const TOOLS = [
        { name: 'Для Власникiв', price: '', rules: ['', '', '', '', '', ''] },
        { name: 'Для Замовникiв', price: '', rules: ['', '', '', '', '', ''] },
    ];

    const { sm, l, sx } = useDevice();

    const getPRICINGGridValue = () => {
        if (sm) return 12;
        if (l) return 6;
        return 3;
    };

    const getTOOLSGridValue = () => {
        if (sm) return 12;
        return 5;
    };

    return (
        <Grid xs={12} container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid
                pb={1}
                container
                xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    flexDirection: 'column',
                    background:
                        'linear-gradient(217deg, #000000cc, rgba(0,0,0,0) 70.71%),linear-gradient(127deg, #353535cc, rgba(0,0,0,0) 70.71%),linear-gradient(336deg, #5e5e5ecc, rgba(0,0,255,0) 70.71%);',
                }}
            >
                <Grid
                    xs={12}
                    sx={{
                        maxWidth: '800px',
                    }}
                >
                    <Box p={4}>
                        <Typography variant={sx ? 'h3' : 'h2'} sx={{ lineHeight: 1.1, color: 'white' }}>
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
                mb={2}
                xs={12}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTop: '1px solid #ccc',
                }}
            >
                <Box sx={{ maxWidth: 1480 }} p={1}>
                    <Typography sx={{ fontSize: 32, fontWeight: 500 }}>Переваги:</Typography>
                </Box>
            </Grid>
            <Grid
                xs={12}
                container
                pb={3}
                px={2}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                {TOOLS.map(({ name, price, rules }, index) => (
                    <Grid
                        xs={getTOOLSGridValue()}
                        key={index}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 4,
                            boxShadow: '0 0 2px 1px green',
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            p={1.5}
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid #ccc',
                                textAlign: 'center',
                                backgroundColor: 'green',
                            }}
                        >
                            <Typography sx={{ width: '100%', color: '#fff', fontSize: 24, textAlign: 'center' }}>
                                {name}
                            </Typography>
                        </Box>
                        <Box p={1.5} sx={{ borderBottom: '1px solid #ccc' }}>
                            {rules.map((el, idx) => (
                                <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
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
                                        <CheckIcon sx={{ color: '#fff', fontSize: 14, fontWeight: 700 }} />
                                    </Box>

                                    <Typography>{el}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Grid
                xs={12}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTop: '1px solid #ccc',
                    backgroundColor: '#f5f5f5',
                }}
            >
                <Box sx={{ maxWidth: 1480 }} p={1}>
                    <Typography sx={{ fontSize: 32, fontWeight: 500 }}>Приклади:</Typography>
                </Box>
            </Grid>
            <Grid
                py={2}
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f5f5f5' }}
                md={12}
                container
            >
                <Box sx={{ width: '100%', backgroundColor: '#f5f5f5' }}>
                    <Marquee style={{ display: 'flex' }} loop={0} speed={75}>
                        <Stores />
                    </Marquee>
                </Box>
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
                    mb={2}
                    xs={12}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTop: '1px solid #ccc',
                        backgroundColor: '#fcfcfc',
                    }}
                >
                    <Box sx={{ maxWidth: 1480 }} p={1}>
                        <Typography sx={{ fontSize: 32, fontWeight: 500 }}>Тарифи:</Typography>
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
                            maxWidth: 1480,
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
                                        p={1.5}
                                        sx={{
                                            background: '#1976d2',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            borderBottom: '1px solid #1976d2',
                                        }}
                                    >
                                        <Typography sx={{ color: '#fff', fontSize: 24 }}>{name}</Typography>
                                        {price && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography sx={{ fontSize: 28, color: '#fff' }}>{price}</Typography>
                                                <Typography mb={1} sx={{ fontSize: 16, color: '#fff' }}>
                                                    \ мiсяць
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                    <Box p={1.5} sx={{}}>
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
