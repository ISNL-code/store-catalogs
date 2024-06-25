import BackButton from 'components/atoms/Buttons/BackButton';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useUserApi } from 'api/useUserApi';
import { OrderInterface } from 'types/app_models';
import { useEffect, useState } from 'react';
import { useGetStatusParams } from 'hooks/useGetStatusParams';
import Loader from 'components/atoms/Loader/Loader';
import OrderPrice from 'components/molecules/PricesComponents/OrderPrice';
import useHandleError from 'hooks/useHandleError';
import { CatalogContextInterface } from 'types/outlet_context_models';
import { scrollPage } from 'utils/scrollPage';
import { ROUTES } from 'router/routes';
import { useIsMount } from 'hooks/useIsMount';

const UserOrders = () => {
    const mount = useIsMount();
    const navigate = useNavigate();
    const handleError = useHandleError();
    const { handleGetStatusParams } = useGetStatusParams();
    const { s } = useDevice();
    const { storeCode } = useParams();
    const { string, footerMenuHeight, appXPadding, auth }: CatalogContextInterface = useOutletContext();
    const [orderData, setOrderData] = useState<OrderInterface | any>(null);
    const {
        data: customerOrdersRes,
        isFetching: loadingOrders,
        error,
    } = useUserApi().useGetCustomersOrders({
        storeCode,
    });
    const [isOpenDetails, setIsOpenDetails] = useState({ open: false, id: null });
    const { sx } = useDevice();

    useEffect(() => {
        scrollPage(0);
    }, []);

    useEffect(() => {
        if (mount) return;
        if (!auth) navigate(ROUTES?.STORE);
    }, [auth]); // eslint-disable-line

    useEffect(() => {
        if (loadingOrders) return;
        if (!customerOrdersRes) return handleError(error);
        const order = customerOrdersRes.data.orders;
        setOrderData(
            order?.map(el => {
                return {
                    id: el.id,
                    orderStatus: el?.orderStatus,
                    datePurchased: el?.datePurchased,
                    products: el?.products,
                    total: { value: el?.total?.value },
                    currency: el?.currency,
                };
            })
        );
    }, [customerOrdersRes, loadingOrders]); // eslint-disable-line

    return (
        <Box p={sx ? 2 : appXPadding} sx={{ pb: `${footerMenuHeight}px` }}>
            {loadingOrders && <Loader />}
            <InstrumentalSubHeader StartSlot={() => <BackButton />} />
            {orderData?.map((order, idx) => {
                const status = handleGetStatusParams(order?.orderStatus, string);
                return (
                    <Grid
                        key={idx}
                        pt={1}
                        container
                        xs={12}
                        sx={{
                            border: '1px solid #ccc',
                            borderRadius: 1,
                            alignItems: 'center',
                        }}
                        mb={2}
                    >
                        <Grid
                            xs={12}
                            container
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderRadius: 4,
                            }}
                        >
                            <Grid
                                py={1}
                                px={sx ? 2 : 3}
                                pr={0.25}
                                xs={'auto'}
                                sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}
                            >
                                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                    {string?.order} #{order?.id}1
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{ p: 0.75, fontSize: 12 }}
                                    onClick={() => {
                                        setIsOpenDetails({
                                            open: order?.id === isOpenDetails?.id ? false : true,
                                            id: order?.id === isOpenDetails?.id ? null : order?.id,
                                        });
                                    }}
                                >
                                    {string?.details}
                                </Button>
                            </Grid>
                            <Grid py={1} px={sx ? 2 : 3} pl={0.25} xs={'auto'}>
                                <Box sx={{ position: 'relative' }}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            fontSize: 12,
                                            p: 0.75,
                                            boxShadow: 'none',
                                            cursor: 'default',
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: status?.color,
                                            ml: 'auto',
                                            '&:hover': {
                                                borderColor: status?.color,
                                                backgroundColor: status?.color,
                                                boxShadow: 'none',
                                            },
                                        }}
                                    >
                                        {status?.name || '...'}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid xs={12} container>
                            <Grid
                                py={1}
                                px={sx ? 2 : 3}
                                xs={'auto'}
                                sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}
                            >
                                <Typography sx={{ fontSize: 16 }}>{string?.ordered_date}: </Typography>
                                <Typography color="initial" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {new Date(order?.datePurchased).toLocaleDateString('en-GB')}
                                </Typography>
                            </Grid>
                        </Grid>
                        {
                            <Grid
                                mt={1}
                                xs={12}
                                container
                                sx={{
                                    maxHeight:
                                        isOpenDetails.open && String(isOpenDetails?.id) === String(order?.id)
                                            ? '1000px'
                                            : '0px',
                                    overflow: 'hidden',
                                    transition: 'all 1000ms cubic-bezier(1, 0.7, 0.2, 1), border 150ms ease-out',
                                }}
                            >
                                <>
                                    {!s && (
                                        <Grid
                                            container
                                            xs={12}
                                            sx={{
                                                borderRadius: s ? 2 : 0,
                                                backgroundColor: '#f3f3f378',
                                                alignItems: 'center',
                                                px: s ? 0 : 2,
                                            }}
                                        >
                                            <Grid xs={3} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                                                <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                                    {string?.vendor_code}
                                                </Typography>
                                            </Grid>
                                            <Grid xs={3} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                                                <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                                    {string?.size}
                                                </Typography>
                                            </Grid>
                                            <Grid xs={3} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                                                <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                                    {string?.price}
                                                </Typography>
                                            </Grid>
                                            <Grid xs={3} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                                                <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                                    {string?.quantity}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    )}
                                    <Grid container xs={12}>
                                        {order?.products?.map((item, idx) => {
                                            const sku = item.product?.variants?.find(
                                                ({ id }) => id === item.variant
                                            )?.sku;
                                            const size = item.attributes.find(
                                                item => item.attributeName.toLowerCase() === 'size'
                                            )?.attributeValue;
                                            const price = item?.price.replace(/[^0-9.]/g, '');
                                            const totalQuantity = item.orderedQuantity;

                                            return (
                                                <Grid
                                                    key={idx}
                                                    container
                                                    xs={12}
                                                    sx={{
                                                        borderTop: '1px solid #ccc',

                                                        alignItems: 'center',
                                                        px: s ? 1 : 2,
                                                    }}
                                                >
                                                    <Grid
                                                        xs={s ? 12 : 3}
                                                        sx={{
                                                            p: 1,
                                                            display: 'flex',
                                                            gap: s ? 0.5 : 2,
                                                            flexWrap: 'wrap',
                                                        }}
                                                    >
                                                        {s && (
                                                            <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                                                {string?.vendor_code}:
                                                            </Typography>
                                                        )}
                                                        <Typography variant="h5">{sku || 'n/a'}</Typography>
                                                    </Grid>
                                                    <Grid
                                                        xs={s ? 12 : 3}
                                                        sx={{
                                                            p: 1,
                                                            display: 'flex',
                                                            gap: s ? 0.5 : 2,
                                                            flexWrap: 'wrap',
                                                        }}
                                                    >
                                                        {s && (
                                                            <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                                                {string?.size}:
                                                            </Typography>
                                                        )}
                                                        <Typography variant="h5">{size || '---'}</Typography>
                                                    </Grid>
                                                    <Grid
                                                        xs={s ? 12 : 3}
                                                        sx={{
                                                            p: 1,
                                                            display: 'flex',
                                                            gap: s ? 0.5 : 2,
                                                            flexWrap: 'wrap',
                                                        }}
                                                    >
                                                        {s && (
                                                            <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                                                {string?.price}:
                                                            </Typography>
                                                        )}

                                                        <OrderPrice currency={order?.currency} price={price} />
                                                    </Grid>
                                                    <Grid
                                                        xs={s ? 12 : 3}
                                                        sx={{
                                                            p: 1,
                                                            display: 'flex',
                                                            gap: s ? 0.5 : 2,
                                                            flexWrap: 'wrap',
                                                        }}
                                                    >
                                                        {s && (
                                                            <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                                                {string?.quantity}:
                                                            </Typography>
                                                        )}
                                                        <Typography variant="h5">{totalQuantity}</Typography>
                                                    </Grid>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                    {
                                        <Grid
                                            container
                                            xs={12}
                                            sx={{
                                                borderTop: '1px solid #ccc',
                                                backgroundColor: '#f3f3f378',
                                                alignItems: 'center',
                                                px: s ? 0 : 2,
                                            }}
                                        >
                                            <Grid
                                                xs={12}
                                                sx={{ p: 1, px: sx ? 2 : 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}
                                            >
                                                <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                                    {string?.final_price}
                                                </Typography>

                                                <OrderPrice currency={order?.currency} price={order?.total?.value} />
                                            </Grid>
                                        </Grid>
                                    }
                                </>
                            </Grid>
                        }
                    </Grid>
                );
            })}
            {!orderData?.length && !loadingOrders && <EmptyPage isShown />}
        </Box>
    );
};

export default UserOrders;
