import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { StoresContextInterface } from 'types';
import { useOutletContext } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import StyledTooltip from './StyledTooltip';

const Pricing = ({ setPlan, isOpen, setIsOpen }) => {
    const { string }: StoresContextInterface = useOutletContext();
    const { sm, l, sx } = useDevice();

    const getPRICINGGridValue = () => {
        if (sm) return 12;
        if (l) return 6;
        return 4;
    };

    const PRICING = [
        {
            name: 'START',
            help: string?.helper_pricing_text_1,
            price: '$14.99',
            rules: [
                { title: string?.main_function, available: true },
                { title: string?.admin_panel, available: true },
                { title: `${string?.admin}: 1'`, available: true },
                { title: `${string?.products_models_photo}: 50/5/5`, available: true },
                { title: `${string?.catalog_lang}: ua, en`, available: true },
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
            help: string?.helper_pricing_text_2,
            price: '$49.99',
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
            help: string?.helper_pricing_text_3,
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
                    width: '100%',
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
                    {PRICING.map(({ name, price, rules, values, help }, index) => (
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
                                    <Box sx={{ display: 'flex', gap: 0.5, color: '#fff' }}>
                                        <Typography sx={{ color: '#fff', fontSize: 20 }}>{name}</Typography>
                                        <StyledTooltip title={help}>
                                            <HelpOutlineIcon />
                                        </StyledTooltip>
                                    </Box>
                                    {price && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography sx={{ fontSize: 22, color: '#fff' }}>{price}</Typography>
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
                                        {!index && (
                                            <img
                                                src={require('./img/free.webp')}
                                                style={{ width: 130, height: 115 }}
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
                                                    <CheckIcon sx={{ color: '#fff', fontSize: 14, fontWeight: 700 }} />
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
                                                    <CloseIcon sx={{ color: '#fff', fontSize: 14, fontWeight: 700 }} />
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
    );
};

export default Pricing;
