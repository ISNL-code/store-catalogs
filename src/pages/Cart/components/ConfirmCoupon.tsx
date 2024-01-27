import { Box } from '@mui/system';
import CardItem from 'components/atoms/Sections/CardItem';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, TextField, Typography } from '@mui/material';
import { useOutletContext, useParams } from 'react-router-dom';
import { CatalogContextInterface } from 'types';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import { OrderDataInterface } from '../Cart';

const ConfirmCoupon = ({
    createOrder,
    orderData,
    setOrderData,
    finalPrice,
}: {
    createOrder;
    orderData: OrderDataInterface;
    setOrderData;
    finalPrice;
}) => {
    const { storeCode } = useParams();
    const { string, store }: CatalogContextInterface = useOutletContext();

    return (
        <CardItem withHover={false}>
            <Box p={2} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Grid mb={1} xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                    <Typography variant="h3">{string?.delivery_information}</Typography>
                    <Typography variant="h6" sx={{ color: 'gray', textTransform: 'lowercase' }}>
                        ({string?.not_required})
                    </Typography>
                </Grid>
                <Grid xs={12}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        label={string?.first_name}
                        sx={{
                            '& label': {
                                color: '#898B9B',
                            },
                        }}
                    />
                </Grid>
                <Grid xs={12}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        label={string?.last_name}
                        sx={{
                            '& label': {
                                color: '#898B9B',
                            },
                        }}
                    />
                </Grid>
                <Grid xs={12}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        label={string?.phone_number}
                        sx={{
                            '& label': {
                                color: '#898B9B',
                            },
                        }}
                    />
                </Grid>
                <Grid xs={12}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        label={string?.city}
                        sx={{
                            '& label': {
                                color: '#898B9B',
                            },
                        }}
                    />
                </Grid>
                <Grid xs={12}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        label={string?.delivery_address}
                        sx={{
                            '& label': {
                                color: '#898B9B',
                            },
                        }}
                    />
                </Grid>
                <Grid
                    xs={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        my: 2,
                    }}
                >
                    <Box>
                        <Typography variant="h2">{string?.total}:</Typography>
                        <Typography variant="h6" sx={{ color: 'gray', textTransform: 'lowercase' }}>
                            ({string?.excluding_delivery})
                        </Typography>
                    </Box>
                    <Typography variant="h2" sx={{ color: 'gray' }}>
                        {getCurrencySymbol(store?.currency)} {Number(finalPrice).toFixed(2)}
                    </Typography>
                </Grid>
                <Grid xs={12}>
                    <Button
                        variant="contained"
                        sx={{ width: '100%' }}
                        onClick={() => {
                            createOrder({
                                storeCode,
                                data: {
                                    shoppingCartItems: orderData.productsList.map(item => {
                                        return {
                                            attributes: [
                                                {
                                                    id: item?.sizeId,
                                                    name: 'Size',
                                                    variant: false,
                                                },
                                                {
                                                    id: item.colorId,
                                                    name: 'Color',
                                                    variant: true,
                                                },
                                            ],
                                            product: item?.sku,
                                            quantity: item?.quantity,
                                        };
                                    }),
                                    amount: Number(finalPrice).toFixed(2),
                                    order: {
                                        shippingQuote: '',
                                        currency: store?.currency,
                                        payment: {
                                            paymentType: 'MONEYORDER',
                                            transactionType: 'CAPTURE',
                                            paymentModule: 'moneyorder',
                                            paymentToken: null,
                                            amount: finalPrice,
                                        },
                                        delivery: {
                                            address: orderData.delivery.address,
                                            city: orderData.delivery.city,
                                            postalCode: orderData.delivery.postalCode,
                                            country: orderData.delivery.country,
                                            zone: orderData.delivery.zone,
                                            firstName: orderData.delivery.firstName,
                                            lastName: orderData.delivery.lastName,
                                            phone: orderData.delivery.phone,
                                        },
                                    },
                                },
                            })
                                .then(() => {
                                    // navigate('/gallery/my-orders');
                                    // clearCart();
                                })
                                .catch(err => console.log(err));
                        }}
                    >
                        {string?.confirm_order}
                    </Button>
                </Grid>
            </Box>
        </CardItem>
    );
};

export default ConfirmCoupon;
