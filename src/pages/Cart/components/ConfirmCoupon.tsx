import { Box } from '@mui/system';
import CardItem from 'components/atoms/Sections/CardItem';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, TextField, Typography } from '@mui/material';
import { useOutletContext, useParams } from 'react-router-dom';
import { CatalogContextInterface } from 'types';
import { OrderDataInterface } from '../Cart';
import { useState } from 'react';
import axios from 'axios';
import CouponPrice from 'components/molecules/PricesComponents/CouponPrice';
import { STORE_CONFIG } from 'constants/stores_config';

const ConfirmCoupon = ({
    createOrder,
    orderData,
    finalPrice,
    setSuccessOrdering,
}: {
    createOrder;
    orderData: OrderDataInterface;
    finalPrice;
    setSuccessOrdering;
}) => {
    const { STORE_NAME } = STORE_CONFIG;
    const { storeCode } = useParams();
    const { string, store, supportedLanguage, currentUserData, cart }: CatalogContextInterface = useOutletContext();
    const [firstName, setFirstName] = useState(currentUserData?.delivery?.firstName || '');
    const [lastName, setLastName] = useState(currentUserData?.delivery?.lastName || '');
    const [phone, setPhone] = useState(currentUserData?.delivery?.phone || '');
    const [city, setCity] = useState(currentUserData?.delivery?.city || '');
    const [address, setAddress] = useState(currentUserData?.delivery?.address || '');

    return (
        <CardItem withHover={false}>
            <Box p={2} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Grid mb={1} xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                    <Typography variant="h3">{string?.delivery_information}</Typography>
                    <Typography variant="h6" sx={{ color: 'red', textTransform: 'lowercase' }}>
                        ({string?.not_required})
                    </Typography>
                </Grid>
                <Grid xs={12}>
                    <TextField
                        value={firstName || ''}
                        onChange={e => {
                            setFirstName(e?.target?.value);
                        }}
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
                        value={lastName || ''}
                        onChange={e => {
                            setLastName(e?.target?.value);
                        }}
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
                        value={phone || ''}
                        onChange={e => {
                            setPhone(e?.target?.value);
                        }}
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
                        value={city || ''}
                        onChange={e => {
                            setCity(e?.target?.value);
                        }}
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
                        value={address || ''}
                        onChange={e => {
                            setAddress(e?.target?.value);
                        }}
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
                        <Typography variant="h6" sx={{ color: 'red', textTransform: 'lowercase' }}>
                            ({string?.excluding_delivery})
                        </Typography>
                    </Box>
                    <CouponPrice price={finalPrice} currency={store?.currency} />
                </Grid>
                <Grid xs={12}>
                    <Button
                        disabled={!orderData?.productsList?.length}
                        variant="contained"
                        sx={{ width: '100%' }}
                        onClick={() => {
                            return createOrder({
                                lang: supportedLanguage,
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
                                            product: item?.productSku,
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
                                    try {
                                        const token = '6904212535:AAGvPEjkJds0aayd-oD1YVMbhLKeKt72yaE';
                                        const chatId = '480774886'; // Узнайте ваш Chat ID, написав своему боту /myid
                                        const url = `https://api.telegram.org/bot${token}/sendMessage`;

                                        axios.post(url, {
                                            chat_id: chatId,
                                            text: `${STORE_NAME} Заказ`,
                                        });
                                    } catch (error) {}
                                    cart?.handleClearCartItems([
                                        ...new Set(orderData.productsList.map(item => item?.sku)),
                                    ]);
                                    setSuccessOrdering(true);
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
