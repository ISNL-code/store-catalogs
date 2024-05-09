import BackButton from 'components/atoms/Buttons/BackButton';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import { useOutletContext, useParams } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useUserApi } from 'api/useUserApi';
import { CatalogContextInterface, OrderInterFace } from 'types';
import { useEffect, useState } from 'react';
import { useGetStatusParams } from 'hooks/useGetStatusParams';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import Loader from 'components/atoms/Loader/Loader';
import { STORE_CONFIG } from 'constants/stores_config';

const UserOrders = () => {
    const { OPTIONS } = STORE_CONFIG;
    const { CURRENCY_MULTIPLICATION, CUSTOM_CURRENCY, SALE_PRICE_MULTIPLICATION } = OPTIONS;
    const { handleGetStatusParams } = useGetStatusParams();
    const { s } = useDevice();
    const { storeCode, storeName } = useParams();
    const { string }: CatalogContextInterface = useOutletContext();
    const [orderData, setOrderData] = useState<OrderInterFace | any>(null);
    const { data: customerOrdersRes, isFetching: loadingOrders } = useUserApi().useGetCustomersOrders({
        storeCode,
    });
    const [isOpenDetails, setIsOpenDetails] = useState({ open: false, id: null });
    const { sx } = useDevice();
    useEffect(() => {
        if (!customerOrdersRes || loadingOrders) return;

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
    }, [customerOrdersRes, loadingOrders]);

    return (
        <Box>
            {loadingOrders && <Loader />}
            <InstrumentalSubHeader
                StartSlot={() => <BackButton nav={`/catalog/${storeCode}/${storeName}`} action={() => {}} />}
            />
            {orderData?.map(order => {
                const status = handleGetStatusParams(order?.orderStatus, string);
                return (
                    <Grid
                        key={order?.id}
                        p={1}
                        container
                        xs={12}
                        sx={{
                            border: '1px solid #ccc',
                            borderRadius: 4,
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
                            <Grid p={1} pr={0.25} xs={'auto'} sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
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
                            <Grid p={1} pl={0.25} xs={'auto'}>
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
                            <Grid p={1} xs={'auto'} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                <Typography sx={{ fontSize: 16 }}>{string?.ordered_date}: </Typography>
                                <Typography color="initial" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {new Date(order?.datePurchased).toLocaleDateString('en-GB')}
                                </Typography>
                            </Grid>
                        </Grid>
                        {
                            <Grid
                                px={1}
                                xs={12}
                                container
                                sx={{
                                    height:
                                        isOpenDetails.open && String(isOpenDetails?.id) === String(order?.id)
                                            ? 'auto'
                                            : 0,
                                    overflow: 'hidden',
                                }}
                            >
                                <>
                                    {!s && (
                                        <Grid
                                            container
                                            xs={12}
                                            sx={{
                                                border: '1px solid #ccc',
                                                borderBottom: 'none',
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
                                        {order?.products?.map(item => {
                                            const sku = item.product.variants.find(
                                                ({ id }) => id === item.variant
                                            )?.sku;
                                            const size = item.attributes.find(
                                                item => item.attributeName.toLowerCase() === 'size'
                                            )?.attributeValue;
                                            const price = item.price;
                                            const totalQuantity = item.orderedQuantity;

                                            return (
                                                <Grid
                                                    container
                                                    xs={12}
                                                    sx={{
                                                        border: '1px solid #ccc',
                                                        borderBottom: 'none',
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
                                                        <Typography variant="h5">
                                                            {sku || string?.deleted_by_owner}
                                                        </Typography>
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

                                                        <Typography variant="h5">
                                                            {CUSTOM_CURRENCY || getCurrencySymbol(order?.currency)}
                                                            {Number(price.replace(/[^0-9.]/g, '')) *
                                                                SALE_PRICE_MULTIPLICATION *
                                                                CURRENCY_MULTIPLICATION}
                                                        </Typography>
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
                                                border: '1px solid #ccc',
                                                backgroundColor: '#f3f3f378',
                                                alignItems: 'center',
                                                px: s ? 0 : 2,
                                            }}
                                        >
                                            <Grid xs={12} sx={{ p: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                                    {string?.final_price}
                                                </Typography>
                                                <Typography variant="h5">
                                                    {CUSTOM_CURRENCY || getCurrencySymbol(order?.currency)}
                                                    {Number(order?.total?.value?.toString()?.replace(/[^0-9.]/g, '')) *
                                                        SALE_PRICE_MULTIPLICATION *
                                                        CURRENCY_MULTIPLICATION}
                                                </Typography>
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
