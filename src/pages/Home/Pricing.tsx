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
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

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
            options: [
                { title: string?.main_function, available: true },
                { title: string?.admin_panel, available: true },
                { title: `${string?.admin}: 1'`, available: true },
                { title: `${string?.products_models_photo}: 50/5/5`, available: true },
                { title: `${string?.catalog_lang}: ua, en`, available: true },
                { title: 'Apple Store', available: true },
                { title: string?.customization, available: true },
            ],
            add_options: [
                { title: string?.cart, available: true, price: '$5.99' },
                { title: 'Google Analytics', available: true, price: '$5.99' },
                { title: 'Play Market', available: false, price: '$5.99' },
            ],
            add_price: '$11.98',
            values: { plan: 'Start', subject: string?.request_catalog },
            active: true,
        },
        {
            name: 'PRO',
            help: string?.helper_pricing_text_2,
            price: '$49.99',
            options: [
                { title: string?.main_function, available: true },
                { title: string?.admin_panel, available: true },
                { title: `${string?.admin}: 5`, available: true },
                { title: `${string?.products_models_photo}: 200/10/10`, available: true },
                { title: `${string?.catalog_lang}: ua, en, es, fr, pl, cz, ru,`, available: true },
                { title: string?.cart, available: true },
                { title: 'Google Analytics', available: true },
            ],
            values: { plan: 'Pro', subject: string?.request_catalog },
            active: true,
            add_options: [
                { title: 'Play Market', available: false, price: '$5.99' },
                { title: 'Apple Store', available: false, price: '$5.99' },
                { title: string?.customization, available: false, price: '$5.99' },
            ],
            add_price: '$0.00',
        },
        {
            name: 'UNLIM',
            help: string?.helper_pricing_text_3,
            price: '$00.00',
            options: [
                { title: string?.expected_soon, available: true },
                { title: string?.expected_soon, available: true },
                { title: string?.expected_soon, available: true },
                {
                    title: string?.expected_soon,
                    available: true,
                },
                { title: string?.expected_soon, available: true },
                { title: string?.expected_soon, available: true },
                { title: string?.expected_soon, available: true },
            ],
            values: { plan: 'Unlim', subject: string?.request_catalog },
            active: false,
            add_options: [
                { title: 'Play Market', available: false, price: '$5.99' },
                { title: 'Apple Store', available: false, price: '$5.99' },
                { title: string?.customization, available: false, price: '$5.99' },
            ],
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
                        width: '100%',
                        maxWidth: 1300,
                        minHeight: '480px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {PRICING.map(({ name, price, options, values, help, active, add_options, add_price }, index) => (
                        <Grid xs={getPRICINGGridValue()} key={index} p={1} sx={{ maxWidth: 400, width: '100%' }}>
                            {active ? (
                                <Box
                                    sx={{
                                        maxWidth: 425,
                                        width: '100%',
                                        backgroundColor: 'white',
                                        borderRadius: 4,
                                        boxShadow: '0 0 2px 1px #1976d2',
                                        overflow: 'hidden',
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
                                    <Box px={2} py={2} sx={{ position: 'relative' }}>
                                        {options.map((el, idx) => (
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
                                                {options?.length !== idx + 1 && <Divider />}
                                            </Box>
                                        ))}
                                    </Box>

                                    <Box
                                        px={2}
                                        py={0.5}
                                        sx={{
                                            background: '#8f8f8f',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', gap: 0.5, color: '#fff' }}>
                                            <Typography sx={{ color: '#fff', fontSize: 20 }}>
                                                Additional options
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography sx={{ fontSize: 18, color: '#fff', fontWeight: 700 }}>
                                                {add_price}
                                            </Typography>
                                            <Typography mb={1} sx={{ fontSize: 12, color: '#fff' }}>
                                                / {string?.month}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box px={2} py={1} sx={{ position: 'relative' }}>
                                        {add_options.map((el, idx) => (
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
                                                            <AddCircleIcon sx={{ color: 'green' }} />
                                                        ) : (
                                                            <RemoveCircleIcon sx={{ color: 'red' }} />
                                                        )}
                                                        <Typography>{el?.title}</Typography>
                                                    </Box>
                                                    <Typography>{el?.price}</Typography>
                                                </Box>
                                                {options?.length !== idx + 1 && <Divider />}
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
                                            filter: 'blur(4px)',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', gap: 0.5, color: '#fff' }}>
                                            <Typography sx={{ color: '#fff', fontSize: 20 }}>{name}</Typography>
                                            <StyledTooltip title={help} disabled>
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
                                    <Box px={2} py={2}>
                                        {options.map((el, idx) => (
                                            <Box key={idx} sx={{ filter: 'blur(6px)' }}>
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
                                                {options?.length !== idx + 1 && <Divider />}
                                            </Box>
                                        ))}
                                    </Box>
                                    <Box
                                        px={3}
                                        py={0.5}
                                        sx={{
                                            background: '#8f8f8f',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            filter: 'blur(4px)',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', gap: 0.5, color: '#fff' }}>
                                            <Typography sx={{ color: '#fff', fontSize: 20 }}>
                                                Additional options
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography sx={{ fontSize: 25, color: '#fff', fontWeight: 700 }}>
                                                $0.00
                                            </Typography>
                                            <Typography mb={1} sx={{ fontSize: 16, color: '#fff' }}>
                                                / {string?.month}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box px={2} py={1} sx={{ position: 'relative', filter: 'blur(4px)' }}>
                                        {add_options.map((el, idx) => (
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
                                                            <AddCircleIcon sx={{ color: 'green' }} />
                                                        ) : (
                                                            <RemoveCircleIcon sx={{ color: 'red' }} />
                                                        )}
                                                        <Typography>{el?.title}</Typography>
                                                    </Box>
                                                    <Typography>{el?.price}</Typography>
                                                </Box>
                                                {options?.length !== idx + 1 && <Divider />}
                                            </Box>
                                        ))}
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
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Pricing;
