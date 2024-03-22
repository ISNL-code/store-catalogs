import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import Stores from 'pages/Stores/Stores';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Marquee from 'react-fast-marquee';
import { useState } from 'react';
import Form from './Form';
import CallBackButton from 'components/atoms/Buttons/CallBackButton';
import { StoresContextInterface } from 'types';
import { useOutletContext } from 'react-router-dom';

const HomePage = () => {
    const { string }: StoresContextInterface = useOutletContext();
    const [storesDetails, setStoresDetails] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [plan, setPlan] = useState({ plan: '', subject: '' });

    const PRICING = [
        {
            name: 'START',
            price: '$19.99',
            rules: [
                { title: string?.main_function, available: true },
                { title: string?.admin_panel, available: true },
                { title: `${string?.admin}: 1'`, available: true },
                { title: `${string?.products_models_photo}: 50/5/5`, available: true },
                { title: `${string?.catalog_lang}: ua, en, es, fr, pl, cz, ru,`, available: true },
                { title: string?.cart, available: false },
                { title: 'Google Analytics', available: false },
                { title: 'Play Market', available: false },
                { title: 'Apple Store', available: false },
                { title: string?.customization, available: false },
            ],
            values: { plan: 'Start', subject: string?.request_catalog },
        },
        {
            name: 'PRO',
            price: '$39.99',
            rules: [
                { title: string?.main_function, available: true },
                { title: string?.admin_panel, available: true },
                { title: `${string?.admin}: 5`, available: true },
                { title: `${string?.products_models_photo}: 200/10/10`, available: true },
                { title: `${string?.catalog_lang}: ua, en, es, fr, pl, cz, ru,`, available: true },
                { title: string?.cart, available: true },
                { title: 'Google Analytics', available: true },
                { title: 'Play Market', available: false },
                { title: 'Apple Store', available: false },
                { title: string?.customization, available: false },
            ],
            values: { plan: 'Pro', subject: string?.request_catalog },
        },
        {
            name: 'UNLIM',
            price: '$99.99',
            rules: [
                { title: string?.main_function, available: true },
                { title: string?.admin_panel, available: true },
                { title: `${string?.admin}: ${string?.unlimited}`, available: true },
                {
                    title: `${string?.products_models_photo}: ${string?.unlimited}`,
                    available: true,
                },
                { title: `${string?.catalog_lang}: ua, en, es, fr, pl, cz, ru, +`, available: true },
                { title: string?.cart, available: true },
                { title: 'Google Analytics', available: true },
                { title: 'Play Market', available: true },
                { title: 'Apple Store', available: true },
                { title: string?.customization, available: true },
            ],
            values: { plan: 'Unlim', subject: string?.request_catalog },
        },
    ];

    const TOOLS = [
        {
            name: string?.owners,
            price: '',
            rules: [
                {
                    title: string?.owner_title_1,
                    description: string?.owner_description_1,
                },
                {
                    title: string?.owner_title_2,
                    description: string?.owner_description_2,
                },
                {
                    title: string?.owner_title_3,
                    description: string?.owner_description_3,
                },
                {
                    title: string?.owner_title_4,
                    description: string?.owner_description_4,
                },
                {
                    title: string?.owner_title_5,
                    description: string?.owner_description_5,
                },
            ],
        },
        {
            name: string?.customers,
            price: '',
            rules: [
                {
                    title: string?.customer_title_1,
                    description: string?.customer_description_1,
                },
                {
                    title: string?.customer_title_2,
                    description: string?.customer_description_2,
                },
                {
                    title: string?.customer_title_3,
                    description: string?.customer_description_3,
                },
                {
                    title: string?.customer_title_4,
                    description: string?.customer_description_4,
                },
                {
                    title: string?.customer_title_5,
                    description: string?.customer_description_5,
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
            <Form values={{ ...plan }} isOpen={isOpen} setIsOpen={setIsOpen} setPlan={setPlan} />
            {<CallBackButton from="landing" />}
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
                        opacity: 0.85,
                        borderRadius: 6,
                        boxShadow: '0 0 5px 3px #fff',
                    }}
                >
                    <Box
                        p={4}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant={sx ? 'h3' : 'h2'} sx={{ lineHeight: 1.1, color: '#000' }}>
                            {string?.hero_text}
                        </Typography>
                        <Button
                            onClick={() => {
                                setIsOpen(!isOpen);
                            }}
                            sx={{ mt: 2 }}
                            variant="contained"
                            size="large"
                        >
                            {string?.request}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
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
                    <Typography sx={{ fontSize: 28, fontWeight: 500 }}>{string?.advantages}</Typography>
                </Box>
            </Box>
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
                    <Button
                        size="large"
                        onClick={() => setStoresDetails(!storesDetails)}
                        variant="contained"
                        sx={{ ml: 'auto' }}
                    >
                        {string?.show_all}
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
                            <Typography sx={{ fontSize: 28, fontWeight: 500 }}>{string?.price}</Typography>
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
                        {PRICING.map(({ name, price, rules, values }, index) => (
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
                                                    / {string?.month}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                    <Box p={1.5} sx={{ position: 'relative' }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',

                                                overflow: 'hidden',
                                                position: 'absolute',
                                                bottom: 10,
                                                right: 10,
                                                borderRadius: '50%',
                                            }}
                                        >
                                            {index !== 2 && (
                                                <img
                                                    src={require('./img/free.png')}
                                                    style={{ width: 140, height: 105 }}
                                                    alt=""
                                                />
                                            )}
                                        </Box>
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
                                        >
                                            {string?.request}
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
