import { Box, Button, Divider, Tooltip, Typography } from '@mui/material';
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
import LanguagesView from 'components/molecules/LanguagesView';

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
                { title: `${string?.admin}`, values: [1], available: true, info: false },
                {
                    title: string?.products,
                    available: true,
                    info: true,
                    values: [50, 5, 5],
                    infoDescription: string?.infoDescription_products_1,
                },

                {
                    type: 'lang',
                    title: `${string?.catalog_lang}`,
                    available: true,
                    info: true,
                    lang: ['UA'],
                    values: [1],
                    infoDescription: string?.infoDescription_lang_1,
                },
                {
                    type: 'currency',
                    title: string?.currency,
                    available: true,
                    info: true,
                    currency: '$',
                    values: [1],
                    infoDescription: string?.infoDescription_currency,
                },
            ],
            admin_options: [
                { title: string?.add_edit_products, available: true },
                { title: string?.add_edit_options_categories_brands, available: true },
                { title: string?.clients_database, available: true },
                { title: string?.view_control_orders, available: false },
            ],
            customer_options: [
                { title: string?.products_catalog, available: true },
                { title: string?.details_ifo_products, available: true },
                { title: string?.search_system, available: true },
                { title: string?.categories_filter, available: true },
                { title: string?.favorite_list, available: true },
                { title: string?.login_registration, available: true },
                { title: string?.profile_control, available: true },
                { title: string?.retailer_contacts, available: true },
                { title: string?.cart_orders_request, available: false },
            ],
            add_options: [
                { title: string?.cart_orders_request, available: false, price: '$19.99', type: 'month' },
                { title: string?.products_add, available: false, price: '$9.99', type: 'month', values: ['+50'] },
                { title: string?.language_add, available: false, price: '$4.99', type: 'month', values: ['+1'] },
                { title: string?.app_store_add, available: false, price: '$9.99', type: 'month' },
                { title: string?.add_play_market, available: false, price: '$9.99', type: 'month' },
                { title: string?.add_set_google_analytics, available: false, price: string?.variable_price },
                { title: string?.add_set_advertising, available: false, price: string?.variable_price },
            ],

            values: { plan: 'Start', subject: string?.request_catalog },
            active: true,
        },
        {
            name: 'PRO',
            help: string?.helper_pricing_text_2,
            price: '$49.99',
            catalog_options: [
                { title: `${string?.admin}`, values: [3], available: true, info: false },
                {
                    title: string?.products,
                    available: true,
                    info: true,
                    values: [200, 10, 5],
                    infoDescription: string?.infoDescription_products_2,
                },

                {
                    type: 'lang',
                    title: `${string?.catalog_lang}`,
                    available: true,
                    info: true,
                    lang: ['UA', 'EN', 'PL'],
                    values: [3],
                    infoDescription: string?.infoDescription_lang_2,
                },
                {
                    type: 'currency',
                    title: string?.currency,
                    available: true,
                    info: true,
                    currency: '$',
                    values: [1],
                    infoDescription: string?.infoDescription_currency,
                },
            ],
            admin_options: [
                { title: string?.add_edit_products, available: true },
                { title: string?.add_edit_options_categories_brands, available: true },
                { title: string?.clients_database, available: true },
                { title: string?.view_control_orders, available: true },
            ],
            customer_options: [
                { title: string?.products_catalog, available: true },
                { title: string?.details_ifo_products, available: true },
                { title: string?.search_system, available: true },
                { title: string?.categories_filter, available: true },
                { title: string?.favorite_list, available: true },
                { title: string?.login_registration, available: true },
                { title: string?.profile_control, available: true },
                { title: string?.retailer_contacts, available: true },
                { title: string?.cart_orders_request, available: true },
            ],
            add_options: [
                { title: string?.products_add, available: false, price: '$9.99', type: 'month', values: ['+50'] },
                { title: string?.language_add, available: false, price: '$4.99', type: 'month', values: ['+1'] },
                { title: string?.app_store_add, available: false, price: '$9.99', type: 'month' },
                { title: string?.add_play_market, available: false, price: '$9.99', type: 'month' },
                { title: string?.catalog_customization, available: false, price: string?.variable_price },
                { title: string?.add_set_google_analytics, available: false, price: string?.variable_price },
                { title: string?.add_set_advertising, available: false, price: string?.variable_price },
            ],
            active: true,
            values: { plan: 'Pro', subject: string?.request_catalog },
        },
        {
            name: 'SUPER PRO',
            help: string?.helper_pricing_text_3,
            price: '$99.99',
            catalog_options: [
                { title: `${string?.admin}`, values: [3], available: true, info: false },
                {
                    title: string?.products,
                    available: true,
                    info: true,
                    values: [200, 10, 5],
                    infoDescription: string?.infoDescription_products_2,
                },

                {
                    type: 'lang',
                    title: `${string?.catalog_lang}`,
                    available: true,
                    info: true,
                    lang: ['UA', 'EN', 'PL'],
                    values: [3],
                    infoDescription: string?.infoDescription_lang_2,
                },
                {
                    type: 'currency',
                    title: string?.currency,
                    available: true,
                    info: true,
                    currency: '$',
                    values: [1],
                    infoDescription: string?.infoDescription_currency,
                },
            ],
            admin_options: [
                { title: string?.add_edit_products, available: true },
                { title: string?.add_edit_options_categories_brands, available: true },
                { title: string?.clients_database, available: true },
                { title: string?.view_control_orders, available: true },
            ],
            customer_options: [
                { title: string?.products_catalog, available: true },
                { title: string?.details_ifo_products, available: true },
                { title: string?.search_system, available: true },
                { title: string?.categories_filter, available: true },
                { title: string?.favorite_list, available: true },
                { title: string?.login_registration, available: true },
                { title: string?.profile_control, available: true },
                { title: string?.retailer_contacts, available: true },
                { title: string?.cart_orders_request, available: true },
            ],
            add_options: [
                { title: string?.products_add, available: false, price: '$9.99', type: 'month', values: ['+50'] },
                { title: string?.language_add, available: false, price: '$4.99', type: 'month', values: ['+1'] },
                { title: string?.app_store_add, available: false, price: '$9.99', type: 'month' },
                { title: string?.add_play_market, available: false, price: '$9.99', type: 'month' },
                { title: string?.catalog_customization, available: false, price: string?.variable_price },
                { title: string?.add_set_google_analytics, available: false, price: string?.variable_price },
                { title: string?.add_set_advertising, available: false, price: string?.variable_price },
            ],
            values: { plan: 'Unlim', subject: string?.request_catalog },
            active: false,
        },
    ];

    return (
        <Grid
            id="pricing"
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
                        maxWidth: 1800,
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
                            <Grid xs={getPRICINGGridValue()} key={index} p={1} sx={{ maxWidth: 560, width: '100%' }}>
                                {active ? (
                                    <Box
                                        sx={{
                                            maxWidth: 560,
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

                                        <Box
                                            p={1}
                                            sx={{
                                                backgroundColor: '#f1f1f1',
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                gap: 1,
                                            }}
                                        >
                                            <Typography sx={{ textAlign: 'center', fontSize: 18 }}>
                                                {string?.catalog}
                                            </Typography>
                                            <Box sx={{ cursor: 'pointer' }}>
                                                <StyledTooltip title={string?.catalog_options_info}>
                                                    <InfoIcon sx={{ color: '#1976d2' }} />
                                                </StyledTooltip>
                                            </Box>
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
                                                            <Typography>{el?.title}: </Typography>
                                                            {el.values?.map((item, idx) => (
                                                                <Box
                                                                    key={item}
                                                                    sx={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        gap: 0.25,
                                                                    }}
                                                                >
                                                                    <Box
                                                                        p={0.75}
                                                                        sx={{
                                                                            border: '2px solid #ccc',
                                                                            width: 'fit-content',
                                                                            height: 25,
                                                                            borderRadius: 4,
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            minWidth: 25,
                                                                            color: '#fff',
                                                                            background: `linear-gradient(45.7deg, rgba(71, 71, 71, 0.849) 50.7%, rgb(190, 189, 189) 99.8%);`,
                                                                        }}
                                                                    >
                                                                        {item}
                                                                    </Box>
                                                                    {el.values.length > idx + 1 && (
                                                                        <Box sx={{ fontSize: 20 }}>/</Box>
                                                                    )}
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                        {el?.info && (
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                {el?.lang && (
                                                                    <Box>
                                                                        <LanguagesView supportedLanguages={el.lang} />
                                                                    </Box>
                                                                )}
                                                                {el?.currency && (
                                                                    <Box
                                                                        sx={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            gap: 0.25,
                                                                        }}
                                                                    >
                                                                        <Box
                                                                            p={0.5}
                                                                            sx={{
                                                                                cursor: 'default',
                                                                                height: 26,
                                                                                borderRadius: 4,
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                minWidth: 26,
                                                                                color: '#fff',
                                                                                background: `linear-gradient(45.7deg, rgb(9, 121, 18) 50.7%, rgb(190, 189, 189) 95.8%);`,
                                                                            }}
                                                                        >
                                                                            <Tooltip
                                                                                placement="left"
                                                                                key={el?.currency}
                                                                                title={el?.currency}
                                                                            >
                                                                                {el?.currency as any}
                                                                            </Tooltip>
                                                                        </Box>
                                                                    </Box>
                                                                )}
                                                                <Box sx={{ cursor: 'pointer' }}>
                                                                    <StyledTooltip title={el.infoDescription}>
                                                                        <InfoIcon sx={{ color: '#1976d2' }} />
                                                                    </StyledTooltip>
                                                                </Box>
                                                            </Box>
                                                        )}
                                                    </Box>

                                                    {catalog_options?.length !== idx + 1 && <Divider />}
                                                </Box>
                                            ))}
                                        </Box>

                                        <Box
                                            p={1}
                                            sx={{
                                                backgroundColor: '#f1f1f1',
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                gap: 1,
                                            }}
                                        >
                                            <Typography sx={{ textAlign: 'center', fontSize: 18 }}>
                                                {string?.admin}
                                            </Typography>
                                            <Box sx={{ cursor: 'pointer' }}>
                                                <StyledTooltip title={string?.admin_options_info}>
                                                    <InfoIcon sx={{ color: '#1976d2' }} />
                                                </StyledTooltip>
                                            </Box>
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

                                        <Box
                                            p={1}
                                            sx={{
                                                backgroundColor: '#f1f1f1',
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                gap: 1,
                                            }}
                                        >
                                            <Typography sx={{ textAlign: 'center', fontSize: 18 }}>
                                                {string?.clients}
                                            </Typography>
                                            <Box sx={{ cursor: 'pointer' }}>
                                                <StyledTooltip title={string?.clients_options_info}>
                                                    <InfoIcon sx={{ color: '#1976d2' }} />
                                                </StyledTooltip>
                                            </Box>
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
                                        <Box
                                            p={1}
                                            sx={{
                                                backgroundColor: '#f1f1f1',
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                gap: 1,
                                            }}
                                        >
                                            <Typography sx={{ textAlign: 'center', fontSize: 18 }}>
                                                {string?.additional_package_options}
                                            </Typography>
                                            <Box sx={{ cursor: 'pointer' }}>
                                                <StyledTooltip title={string?.additional_package_options_info}>
                                                    <InfoIcon sx={{ color: '#1976d2' }} />
                                                </StyledTooltip>
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
                                                            {el.values?.map((item, idx) => (
                                                                <Box
                                                                    key={item}
                                                                    sx={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        gap: 0.25,
                                                                    }}
                                                                >
                                                                    <Box
                                                                        p={0.75}
                                                                        sx={{
                                                                            border: '2px solid #ccc',
                                                                            width: 'fit-content',
                                                                            height: 25,
                                                                            borderRadius: 4,
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            minWidth: 25,
                                                                            color: '#fff',
                                                                            background: `linear-gradient(45.7deg, rgba(30, 161, 18, 0.849) 50.7%, rgb(190, 189, 189) 99.8%);`,
                                                                        }}
                                                                    >
                                                                        {item}
                                                                    </Box>
                                                                    {el.values.length > idx + 1 && (
                                                                        <Box sx={{ fontSize: 20 }}>/</Box>
                                                                    )}
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                width: 120,
                                                                justifyContent: 'flex-end',
                                                            }}
                                                        >
                                                            <Typography sx={{ fontSize: 14, color: 'gray' }}>
                                                                {el?.price}
                                                            </Typography>
                                                            {el?.type && (
                                                                <Typography sx={{ fontSize: 14, color: 'gray' }}>
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
                                            py={0.5}
                                            pb={1.5}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                backgroundColor: '#eeeeee7b',
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
                                            maxWidth: 560,
                                            width: '100%',
                                            backgroundColor: 'white',
                                            borderRadius: 4,
                                            boxShadow: '0 0 2px 1px #1976d2',
                                            overflow: 'hidden',

                                            position: 'relative',
                                        }}
                                    >
                                        <Box sx={{ filter: 'grayscale(100%)' }}>
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
                                            <Box sx={{ filter: 'blur(5px)' }}>
                                                <Box
                                                    p={1}
                                                    sx={{
                                                        backgroundColor: '#f1f1f1',
                                                        width: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Typography sx={{ textAlign: 'center', fontSize: 18 }}>
                                                        {string?.catalog}
                                                    </Typography>
                                                    <Box sx={{ cursor: 'pointer' }}>
                                                        <StyledTooltip title={string?.catalog_options_info}>
                                                            <InfoIcon sx={{ color: '#1976d2' }} />
                                                        </StyledTooltip>
                                                    </Box>
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
                                                                    <Typography>{el?.title}: </Typography>
                                                                    {el.values?.map((item, idx) => (
                                                                        <Box
                                                                            key={item}
                                                                            sx={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                gap: 0.25,
                                                                            }}
                                                                        >
                                                                            <Box
                                                                                p={0.75}
                                                                                sx={{
                                                                                    border: '2px solid #ccc',
                                                                                    width: 'fit-content',
                                                                                    height: 25,
                                                                                    borderRadius: 4,
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'center',
                                                                                    minWidth: 25,
                                                                                    color: '#fff',
                                                                                    background: `linear-gradient(45.7deg, rgba(71, 71, 71, 0.849) 50.7%, rgb(190, 189, 189) 99.8%);`,
                                                                                }}
                                                                            >
                                                                                {item}
                                                                            </Box>
                                                                            {el.values.length > idx + 1 && (
                                                                                <Box sx={{ fontSize: 20 }}>/</Box>
                                                                            )}
                                                                        </Box>
                                                                    ))}
                                                                </Box>
                                                                {el?.info && (
                                                                    <Box
                                                                        sx={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: 1,
                                                                        }}
                                                                    >
                                                                        {el?.lang && (
                                                                            <Box>
                                                                                <LanguagesView
                                                                                    supportedLanguages={el.lang}
                                                                                />
                                                                            </Box>
                                                                        )}
                                                                        {el?.currency && (
                                                                            <Box
                                                                                sx={{
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'center',
                                                                                    gap: 0.25,
                                                                                }}
                                                                            >
                                                                                <Box
                                                                                    p={0.5}
                                                                                    sx={{
                                                                                        cursor: 'default',
                                                                                        height: 26,
                                                                                        borderRadius: 4,
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        justifyContent: 'center',
                                                                                        minWidth: 26,
                                                                                        color: '#fff',
                                                                                        background: `linear-gradient(45.7deg, rgb(9, 121, 18) 50.7%, rgb(190, 189, 189) 95.8%);`,
                                                                                    }}
                                                                                >
                                                                                    <Tooltip
                                                                                        placement="left"
                                                                                        key={el?.currency}
                                                                                        title={el?.currency}
                                                                                    >
                                                                                        {el?.currency as any}
                                                                                    </Tooltip>
                                                                                </Box>
                                                                            </Box>
                                                                        )}
                                                                        <Box sx={{ cursor: 'pointer' }}>
                                                                            <StyledTooltip title={el.infoDescription}>
                                                                                <InfoIcon sx={{ color: '#1976d2' }} />
                                                                            </StyledTooltip>
                                                                        </Box>
                                                                    </Box>
                                                                )}
                                                            </Box>

                                                            {catalog_options?.length !== idx + 1 && <Divider />}
                                                        </Box>
                                                    ))}
                                                </Box>

                                                <Box
                                                    p={1}
                                                    sx={{
                                                        backgroundColor: '#f1f1f1',
                                                        width: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Typography sx={{ textAlign: 'center', fontSize: 18 }}>
                                                        {string?.admin}
                                                    </Typography>
                                                    <Box sx={{ cursor: 'pointer' }}>
                                                        <StyledTooltip title={string?.admin_options_info}>
                                                            <InfoIcon sx={{ color: '#1976d2' }} />
                                                        </StyledTooltip>
                                                    </Box>
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

                                                <Box
                                                    p={1}
                                                    sx={{
                                                        backgroundColor: '#f1f1f1',
                                                        width: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Typography sx={{ textAlign: 'center', fontSize: 18 }}>
                                                        {string?.clients}
                                                    </Typography>
                                                    <Box sx={{ cursor: 'pointer' }}>
                                                        <StyledTooltip title={string?.clients_options_info}>
                                                            <InfoIcon sx={{ color: '#1976d2' }} />
                                                        </StyledTooltip>
                                                    </Box>
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
                                                <Box
                                                    p={1}
                                                    sx={{
                                                        backgroundColor: '#f1f1f1',
                                                        width: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Typography sx={{ textAlign: 'center', fontSize: 18 }}>
                                                        {string?.additional_package_options}
                                                    </Typography>
                                                    <Box sx={{ cursor: 'pointer' }}>
                                                        <StyledTooltip title={string?.additional_package_options_info}>
                                                            <InfoIcon sx={{ color: '#1976d2' }} />
                                                        </StyledTooltip>
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
                                                                    {el.values?.map((item, idx) => (
                                                                        <Box
                                                                            key={item}
                                                                            sx={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                gap: 0.25,
                                                                            }}
                                                                        >
                                                                            <Box
                                                                                p={0.75}
                                                                                sx={{
                                                                                    border: '2px solid #ccc',
                                                                                    width: 'fit-content',
                                                                                    height: 25,
                                                                                    borderRadius: 4,
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'center',
                                                                                    minWidth: 25,
                                                                                    color: '#fff',
                                                                                    background: `linear-gradient(45.7deg, rgba(30, 161, 18, 0.849) 50.7%, rgb(190, 189, 189) 99.8%);`,
                                                                                }}
                                                                            >
                                                                                {item}
                                                                            </Box>
                                                                            {el.values.length > idx + 1 && (
                                                                                <Box sx={{ fontSize: 20 }}>/</Box>
                                                                            )}
                                                                        </Box>
                                                                    ))}
                                                                </Box>
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        width: 120,
                                                                        justifyContent: 'flex-end',
                                                                    }}
                                                                >
                                                                    <Typography sx={{ fontSize: 14, color: 'gray' }}>
                                                                        {el?.price}
                                                                    </Typography>
                                                                    {el?.type && (
                                                                        <Typography
                                                                            sx={{ fontSize: 14, color: 'gray' }}
                                                                        >
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
                                                px={2}
                                                py={0.5}
                                                pb={1.5}
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#eeeeee7b',
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
