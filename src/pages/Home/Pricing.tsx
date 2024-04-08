import { Box, Button, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { StoresContextInterface } from 'types';
import { useOutletContext } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import StyledTooltip from './StyledTooltip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Pricing = ({ setPlan, isOpen, setIsOpen }) => {
    const { string }: StoresContextInterface = useOutletContext();
    const { l, sx } = useDevice();

    const getPRICINGGridValue = () => {
        if (sx) return 12;
        if (l) return 6;
        return 4;
    };

    const PRICING = [
        {
            name: 'START',
            help: string?.helper_pricing_text_1,
            price: '$14.99',
            catalog_options: [
                { title: `${string?.admin}: 1`, available: true, info: false },
                { title: `Продукты: 50`, available: true, info: true },
                { title: `Моделей в продукте: 5`, available: true, info: true },
                { title: `Количество фото на модель: 5`, available: true, info: true },
                { title: `${string?.catalog_lang}: 1`, available: true, info: true, lang: ['UA'] },
                { title: `Валюта: 1`, available: true, info: true, currency: '$' },
            ],
            admin_options: [
                { title: 'Добавление/редактирование товаров', available: true },
                { title: 'Добавление/редактирование опций, категорий, брендов товара', available: true },
                { title: 'База данных клиентов', available: true },
                { title: 'Просмотр и управление заказами', available: false },
            ],
            customer_options: [
                { title: 'Каталог товаров', available: true },
                { title: 'Детальная информация о товаре', available: true },
                { title: 'Поисковая система', available: true },
                { title: 'Фильтрация по категориям', available: true },
                { title: 'Список желаемого - сохранение товаров', available: true },
                { title: 'Регистрация/Вход', available: true },
                { title: 'Управление профилем', available: true },
                { title: 'Контактная информация продавца', available: true },
                { title: 'Корзина покупок', available: false },
                { title: 'Оформление заказа', available: false },
            ],
            add_options: [
                { title: string?.cart, available: false, price: '$19.99', type: 'month' },
                { title: 'Продукты (+50)', available: false, price: '$9.99', type: 'month' },
                { title: 'Язык (+1)', available: false, price: '$4.99', type: 'month' },
                { title: 'Размещение в Play Market', available: false, price: '$9.99', type: 'month' },
                { title: 'Размещение в Apple Store', available: false, price: '$9.99', type: 'month' },
                { title: 'Подключени/Настройка Google Analytics', available: false, price: 'дог.' },
                { title: 'Настройка рекламы каталога в соц сетях и Google', available: false, price: 'дог.' },
            ],
            add_price: '$11.98',
            values: { plan: 'Start', subject: string?.request_catalog },
            active: true,
        },
        {
            name: 'PRO',
            help: string?.helper_pricing_text_2,
            price: '$49.99',
            catalog_options: [
                { title: `${string?.admin}: 3`, available: true, info: false },
                { title: `Продукты: 200`, available: true, info: true },
                { title: `Моделей в продукте: 10`, available: true, info: true },
                { title: `Количество фото на модель: 10`, available: true, info: true },
                { title: `${string?.catalog_lang}: 3`, available: true, info: true, lang: ['UA', 'EN', 'PL'] },
                { title: `Валюта: 1`, available: true, info: true, currency: ['$'] },
            ],
            admin_options: [
                { title: 'Добавление/редактирование товаров', available: true },
                { title: 'Добавление/редактирование опций, категорий, брендов товара', available: true },
                { title: 'База данных клиентов', available: true },
                { title: 'Просмотр и управление заказами', available: true },
            ],
            customer_options: [
                { title: 'Каталог товаров', available: true },
                { title: 'Детальная информация о товаре', available: true },
                { title: 'Поисковая система', available: true },
                { title: 'Фильтрация по категориям', available: true },
                { title: 'Список желаемого - сохранение товаров', available: true },
                { title: 'Регистрация/Вход', available: true },
                { title: 'Управление профилем', available: true },
                { title: 'Контактная информация продавца', available: true },
                { title: 'Корзина покупок', available: true },
                { title: 'Оформление заказа', available: true },
            ],
            add_options: [
                { title: 'Продукты (+50)', available: false, price: '$9.99', type: 'month' },
                { title: 'Язык (+1)', available: false, price: '$4.99', type: 'month' },
                { title: 'Размещение в Play Market', available: false, price: '$9.99', type: 'month' },
                { title: 'Размещение в Apple Store', available: false, price: '$9.99', type: 'month' },
                { title: 'Кастомизация каталога', available: false, price: 'дог.' },
                { title: 'Подключени/Настройка Google Analytics', available: false, price: 'дог.' },
                { title: 'Настройка рекламы каталога в соц сетях и Google', available: false, price: 'дог.' },
            ],
            active: true,
            values: { plan: 'Pro', subject: string?.request_catalog },
        },
        {
            name: 'SUPER PRO',
            help: string?.helper_pricing_text_3,
            price: '$99.99',
            catalog_options: [
                { title: `${string?.admin}: 3`, available: true, info: false },
                { title: `Продукты: 200`, available: true, info: true },
                { title: `Моделей в продукте: 10`, available: true, info: true },
                { title: `Количество фото на модель: 10`, available: true, info: true },
                { title: `${string?.catalog_lang}: 3`, available: true, info: true, lang: ['UA', 'EN', 'PL'] },
                { title: `Валюта: 1`, available: true, info: true, currency: ['$'] },
            ],
            admin_options: [
                { title: 'Добавление/редактирование товаров', available: true },
                { title: 'Добавление/редактирование опций, категорий, брендов товара', available: true },
                { title: 'База данных клиентов', available: true },
                { title: 'Просмотр и управление заказами', available: true },
            ],
            customer_options: [
                { title: 'Каталог товаров', available: true },
                { title: 'Детальная информация о товаре', available: true },
                { title: 'Поисковая система', available: true },
                { title: 'Фильтрация по категориям', available: true },
                { title: 'Список желаемого - сохранение товаров', available: true },
                { title: 'Регистрация/Вход', available: true },
                { title: 'Управление профилем', available: true },
                { title: 'Контактная информация продавца', available: true },
                { title: 'Корзина покупок', available: true },
                { title: 'Оформление заказа', available: true },
            ],
            add_options: [
                { title: 'Продукты (+50)', available: false, price: '$9.99', type: 'month' },
                { title: 'Язык (+1)', available: false, price: '$4.99', type: 'month' },
                { title: 'Размещение в Play Market', available: false, price: '$9.99', type: 'month' },
                { title: 'Размещение в Apple Store', available: false, price: '$9.99', type: 'month' },
                { title: 'Кастомизация каталога', available: false, price: 'дог.' },
                { title: 'Подключени/Настройка Google Analytics', available: false, price: 'дог.' },
                { title: 'Настройка рекламы каталога в соц сетях и Google', available: false, price: 'дог.' },
            ],
            values: { plan: 'Unlim', subject: string?.request_catalog },
            active: false,
        },
    ];

    return (
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
                    <Box px={2} py={0.5} sx={{ width: 'fit-content', border: '1px dashed #ccc', borderTop: 'none' }}>
                        <Typography sx={{ fontSize: 22, fontWeight: 500 }}>{string?.prices}</Typography>
                    </Box>
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
                    width: '100%',
                }}
            >
                <Grid
                    xs={12}
                    container
                    p={1}
                    sx={{
                        width: '100%',
                        maxWidth: 1300,
                        minHeight: '480px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}
                >
                    {PRICING.map(
                        (
                            {
                                name,
                                price,
                                customer_options,
                                values,
                                help,
                                active,
                                add_options,
                                admin_options,
                                catalog_options,
                            },
                            index
                        ) => (
                            <Grid xs={getPRICINGGridValue()} key={index} p={1} sx={{ maxWidth: 425, width: '100%' }}>
                                {active ? (
                                    <Box
                                        sx={{
                                            maxWidth: 475,
                                            width: '100%',
                                            backgroundColor: 'white',
                                            borderRadius: 4,
                                            boxShadow: '0 0 2px 1px #1976d2',
                                            overflow: 'hidden',
                                            height: '100%',
                                        }}
                                    >
                                        <Box
                                            px={3}
                                            py={1}
                                            sx={{
                                                background: '#1976d2',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', gap: 0.5, color: '#fff' }}>
                                                <Typography sx={{ color: '#fff', fontSize: 20 }}>{name}</Typography>
                                                <StyledTooltip title={help}>
                                                    <HelpOutlineIcon />
                                                </StyledTooltip>
                                            </Box>

                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography sx={{ fontSize: 25, color: '#fff', fontWeight: 700 }}>
                                                    {price}
                                                </Typography>
                                                <Typography mb={1} sx={{ fontSize: 16, color: '#fff' }}>
                                                    / {string?.month}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box p={1} sx={{ backgroundColor: '#f1f1f1', width: '100%' }}>
                                            <Typography sx={{ textAlign: 'center', fontSize: 18 }}>Каталог</Typography>
                                        </Box>
                                        <Box px={2} sx={{ position: 'relative' }}>
                                            {catalog_options.map((el, idx) => (
                                                <Box key={idx}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                gap: 0.5,
                                                                py: 1,
                                                            }}
                                                        >
                                                            {el?.available ? (
                                                                <CheckIcon sx={{ color: 'green' }} />
                                                            ) : (
                                                                <CloseIcon sx={{ color: 'red' }} />
                                                            )}
                                                            <Typography>{el?.title}</Typography>
                                                        </Box>
                                                        {el?.info && (
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                {el?.lang && <Box>{el?.lang.join(', ')}</Box>}
                                                                {el?.currency && <Box>{el?.currency}</Box>}
                                                                <Box sx={{ cursor: 'pointer' }}>
                                                                    <StyledTooltip title={help}>
                                                                        <InfoIcon sx={{ color: 'gray' }} />
                                                                    </StyledTooltip>
                                                                </Box>
                                                            </Box>
                                                        )}
                                                    </Box>

                                                    {catalog_options?.length !== idx + 1 && <Divider />}
                                                </Box>
                                            ))}
                                        </Box>

                                        <Box p={1} sx={{ backgroundColor: '#f1f1f1', width: '100%' }}>
                                            <Typography sx={{ textAlign: 'center', fontSize: 18 }}>
                                                Администратор
                                            </Typography>
                                        </Box>
                                        <Box px={2} sx={{ position: 'relative' }}>
                                            {admin_options.map((el, idx) => (
                                                <Box key={idx}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            gap: 0.5,
                                                            py: 1,
                                                        }}
                                                    >
                                                        {el?.available ? (
                                                            <CheckIcon sx={{ color: 'green' }} />
                                                        ) : (
                                                            <CloseIcon sx={{ color: 'red' }} />
                                                        )}
                                                        <Typography>{el?.title}</Typography>
                                                    </Box>
                                                    {admin_options?.length !== idx + 1 && <Divider />}
                                                </Box>
                                            ))}
                                        </Box>

                                        <Box p={1} sx={{ backgroundColor: '#f1f1f1', width: '100%' }}>
                                            <Typography sx={{ textAlign: 'center', fontSize: 18 }}>Клиент</Typography>
                                        </Box>
                                        <Box px={2} sx={{ position: 'relative' }}>
                                            {customer_options.map((el, idx) => (
                                                <Box key={idx}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            gap: 0.5,
                                                            py: 1,
                                                        }}
                                                    >
                                                        {el?.available ? (
                                                            <CheckIcon sx={{ color: 'green' }} />
                                                        ) : (
                                                            <CloseIcon sx={{ color: 'red' }} />
                                                        )}
                                                        <Typography>{el?.title}</Typography>
                                                    </Box>
                                                    {customer_options?.length !== idx + 1 && <Divider />}
                                                </Box>
                                            ))}
                                        </Box>
                                        <Box p={1} sx={{ backgroundColor: '#f1f1f1', width: '100%' }}>
                                            <Typography sx={{ textAlign: 'center', fontSize: 18 }}>
                                                Дополнительные Опции Пакета
                                            </Typography>
                                        </Box>
                                        <Box px={2} py={1} sx={{ position: 'relative' }}>
                                            {add_options.map((el, idx) => (
                                                <Box key={idx}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            gap: 2,
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                gap: 0.5,
                                                                py: 1,
                                                            }}
                                                        >
                                                            {el?.available ? (
                                                                <AddCircleIcon sx={{ color: 'green' }} />
                                                            ) : (
                                                                <AddCircleOutlineIcon sx={{ color: 'green' }} />
                                                            )}
                                                            <Typography>{el?.title}</Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Typography sx={{ fontSize: 14 }}>{el?.price}</Typography>
                                                            {el?.type && (
                                                                <Typography sx={{ fontSize: 14 }}>
                                                                    / {string?.month}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                    {add_options?.length !== idx + 1 && <Divider />}
                                                </Box>
                                            ))}
                                        </Box>

                                        <Box
                                            px={2}
                                            py={2}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                backgroundColor: '#eeeeee',
                                            }}
                                        >
                                            <Button
                                                onClick={() => {
                                                    setIsOpen(!isOpen);
                                                    setPlan({ ...values });
                                                }}
                                                size="large"
                                                variant="contained"
                                                sx={{ width: '50%', minWidth: 200 }}
                                            >
                                                {string?.request}
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box
                                        sx={{
                                            maxWidth: 425,
                                            width: '100%',
                                            backgroundColor: 'white',
                                            borderRadius: 4,
                                            boxShadow: '0 0 2px 1px #1976d2',
                                            overflow: 'hidden',
                                            filter: 'grayscale(100%)',
                                            position: 'relative',
                                        }}
                                    >
                                        <Box
                                            px={3}
                                            py={1}
                                            sx={{
                                                background: '#1976d2',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                borderBottom: '1px solid #1976d2',
                                                opacity: 0.8,
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', gap: 0.5, color: '#fff' }}>
                                                <Typography sx={{ color: '#fff', fontSize: 20 }}>{name}</Typography>
                                            </Box>

                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography sx={{ fontSize: 25, color: '#fff', fontWeight: 700 }}>
                                                    {price}
                                                </Typography>
                                                <Typography mb={1} sx={{ fontSize: 16, color: '#fff' }}>
                                                    / {string?.month}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ filter: 'blur(5px)' }}>
                                            <Box p={1} sx={{ backgroundColor: '#f1f1f1', width: '100%' }}>
                                                <Typography sx={{ textAlign: 'center', fontSize: 18 }}>
                                                    Каталог
                                                </Typography>
                                            </Box>
                                            <Box px={2} sx={{ position: 'relative' }}>
                                                {catalog_options.map((el, idx) => (
                                                    <Box key={idx}>
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    gap: 0.5,
                                                                    py: 1,
                                                                }}
                                                            >
                                                                {el?.available ? (
                                                                    <CheckIcon sx={{ color: 'green' }} />
                                                                ) : (
                                                                    <CloseIcon sx={{ color: 'red' }} />
                                                                )}
                                                                <Typography>{el?.title}</Typography>
                                                            </Box>
                                                            {el?.info && (
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: 1,
                                                                    }}
                                                                >
                                                                    {el?.lang && <Box>{el?.lang}</Box>}
                                                                    {el?.currency && <Box>{el?.currency}</Box>}
                                                                    <StyledTooltip title={help} disabled>
                                                                        <InfoIcon sx={{ color: 'gray' }} />
                                                                    </StyledTooltip>
                                                                </Box>
                                                            )}
                                                        </Box>

                                                        {catalog_options?.length !== idx + 1 && <Divider />}
                                                    </Box>
                                                ))}
                                            </Box>

                                            <Box p={1} sx={{ backgroundColor: '#f1f1f1', width: '100%' }}>
                                                <Typography sx={{ textAlign: 'center', fontSize: 18 }}>
                                                    Администратор
                                                </Typography>
                                            </Box>
                                            <Box px={2} sx={{ position: 'relative' }}>
                                                {admin_options.map((el, idx) => (
                                                    <Box key={idx}>
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                gap: 0.5,
                                                                py: 1,
                                                            }}
                                                        >
                                                            {el?.available ? (
                                                                <CheckIcon sx={{ color: 'green' }} />
                                                            ) : (
                                                                <CloseIcon sx={{ color: 'red' }} />
                                                            )}
                                                            <Typography>{el?.title}</Typography>
                                                        </Box>
                                                        {admin_options?.length !== idx + 1 && <Divider />}
                                                    </Box>
                                                ))}
                                            </Box>

                                            <Box p={1} sx={{ backgroundColor: '#f1f1f1', width: '100%' }}>
                                                <Typography sx={{ textAlign: 'center', fontSize: 18 }}>
                                                    Клиент
                                                </Typography>
                                            </Box>
                                            <Box px={2} sx={{ position: 'relative' }}>
                                                {customer_options.map((el, idx) => (
                                                    <Box key={idx}>
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                gap: 0.5,
                                                                py: 1,
                                                            }}
                                                        >
                                                            {el?.available ? (
                                                                <CheckIcon sx={{ color: 'green' }} />
                                                            ) : (
                                                                <CloseIcon sx={{ color: 'red' }} />
                                                            )}
                                                            <Typography>{el?.title}</Typography>
                                                        </Box>
                                                        {customer_options?.length !== idx + 1 && <Divider />}
                                                    </Box>
                                                ))}
                                            </Box>
                                            <Box p={1} sx={{ backgroundColor: '#f1f1f1', width: '100%' }}>
                                                <Typography sx={{ textAlign: 'center', fontSize: 18 }}>
                                                    Дополнительные Опции Пакета
                                                </Typography>
                                            </Box>
                                            <Box px={2} py={1} sx={{ position: 'relative' }}>
                                                {add_options.map((el, idx) => (
                                                    <Box key={idx}>
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                gap: 2,
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    gap: 0.5,
                                                                    py: 1,
                                                                }}
                                                            >
                                                                {el?.available ? (
                                                                    <AddCircleIcon sx={{ color: 'green' }} />
                                                                ) : (
                                                                    <AddCircleOutlineIcon sx={{ color: 'green' }} />
                                                                )}
                                                                <Typography>{el?.title}</Typography>
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <Typography sx={{ fontSize: 14 }}>
                                                                    {el?.price}
                                                                </Typography>
                                                                {el?.type && (
                                                                    <Typography sx={{ fontSize: 14 }}>
                                                                        / {string?.month}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                        </Box>
                                                        {add_options?.length !== idx + 1 && <Divider />}
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 145,
                                                height: 145,
                                                overflow: 'hidden',
                                                position: 'absolute',
                                                top: 80,
                                                right: 10,
                                                borderRadius: '50%',
                                            }}
                                        >
                                            <img
                                                src={require('./img/exp_soon.webp')}
                                                style={{ width: 250, height: 250 }}
                                                alt=""
                                            />
                                        </Box>
                                        <Box
                                            px={2}
                                            py={2}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                backgroundColor: '#eeeeee',
                                            }}
                                        >
                                            <Button
                                                disabled
                                                onClick={() => {
                                                    setIsOpen(!isOpen);
                                                    setPlan({ ...values });
                                                }}
                                                size="large"
                                                variant="contained"
                                                sx={{ width: '50%', minWidth: 200 }}
                                            >
                                                {string?.request}
                                            </Button>
                                        </Box>
                                    </Box>
                                )}
                            </Grid>
                        )
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Pricing;
