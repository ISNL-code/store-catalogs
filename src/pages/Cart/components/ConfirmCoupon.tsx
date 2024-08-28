import { Box } from '@mui/system';
import CardItem from 'components/atoms/Sections/CardItem';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useOutletContext, useParams } from 'react-router-dom';
import { CatalogContextInterface } from 'types/outlet_context_models';
import { OrderDataInterface } from '../Cart';
import { useState } from 'react';
import CouponPrice from 'components/molecules/PricesComponents/CouponPrice';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { useUserApi } from 'api/useUserApi';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { telegramSender } from 'utils/telegramSender';

interface Props {
    createOrder;
    orderData: OrderDataInterface;
    finalPrice;
    setSuccessOrdering;
    setOrderData;
    loadCreateOrder;
}

const ConfirmCoupon = ({
    createOrder,
    orderData,
    finalPrice,
    setSuccessOrdering,
    setOrderData,
    loadCreateOrder,
}: Props) => {
    const { OPTIONS } = STORE_CONFIG;
    const { MIN_ITEMS_TO_BUY } = OPTIONS;
    const { storeCode } = useParams();
    const {
        string,
        store,
        lang,
        currentUserData,
        cart,
        auth,
        handleOpenDialog,
        updateUserData,
        setCurrentUserData,
    }: CatalogContextInterface = useOutletContext();
    const [firstName, setFirstName] = useState(
        currentUserData?.delivery?.firstName || currentUserData?.billing?.firstName
    );
    const [saveDetails, setSaveDetails] = useState(true);
    const { mutateAsync: updateProfile } = useUserApi().useCustomerProfileUpdate({ storeCode });
    const [lastName, setLastName] = useState(currentUserData?.delivery?.lastName || currentUserData?.billing?.lastName);
    const [phone, setPhone] = useState(currentUserData?.delivery?.phone || currentUserData?.billing?.phone);
    const [city, setCity] = useState(currentUserData?.delivery?.city || currentUserData?.billing?.city);
    const [address, setAddress] = useState(currentUserData?.delivery?.address || currentUserData?.billing?.address);
    const [company, setCompany] = useState(currentUserData?.delivery?.company || currentUserData?.billing?.company);
    const [promoCode, setPromoCode] = useState('');

    const handleConfirmOrder = () => {
        if (!auth) {
            handleOpenDialog(DialogWindowType?.LOGIN);
            return;
        }
        if (orderData?.productsList?.reduce((acc, el) => acc + 1 * Number(el?.quantity), 0) < MIN_ITEMS_TO_BUY) {
            handleOpenDialog(DialogWindowType?.WARNING_ORDERING_LIMIT);
            return;
        } else
            return createOrder({
                lang: lang,
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
                            company: orderData.delivery.company,
                        },
                    },
                },
            })
                .then(() => {
                    telegramSender({
                        action: `ЗАКАЗ  !$!$!  ${Number(finalPrice).toFixed(2)} PROMO_CODE:${promoCode}`,
                    });

                    cart?.handleClearCartItems([...new Set(orderData?.productsList.map(item => item?.productSku))]);
                    setOrderData(prev => {
                        return {
                            ...prev,
                            productsList: prev?.productsList?.filter(el => {
                                return !orderData?.productsList?.map(el => el.colorId).includes(el.colorId);
                            }),
                        };
                    });
                    setSuccessOrdering(true);
                    if (saveDetails)
                        updateProfile({
                            data: {
                                delivery: {
                                    firstName,
                                    lastName,
                                    city,
                                    phone,
                                    address,
                                    company,
                                },
                            },
                        }).then(_ => {
                            updateUserData().then(res => setCurrentUserData(res?.data?.data));
                        });
                })
                .catch(err => alert(err));
    };

    return (
        <CardItem>
            <Box p={2} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Grid xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 0.25, mb: 2 }}>
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
                        label={string?.first_name + '*'}
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
                        label={string?.last_name + '*'}
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
                        label={string?.phone_number + '*'}
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
                        label={string?.city + '*'}
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
                        label={string?.delivery_address + '*'}
                        sx={{
                            '& label': {
                                color: '#898B9B',
                            },
                        }}
                    />
                </Grid>
                <Grid xs={12}>
                    <TextField
                        value={company || ''}
                        onChange={e => {
                            setCompany(e?.target?.value);
                        }}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        label={string?.company_name}
                        sx={{
                            '& label': {
                                color: '#898B9B',
                            },
                        }}
                    />
                </Grid>
                <Grid xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={saveDetails}
                                onChange={event => setSaveDetails(event.target.checked)}
                                name="saveDetails"
                                color="primary"
                            />
                        }
                        label={string?.save_delivery_info}
                    />
                </Grid>
                <Grid xs={12}>
                    <TextField
                        value={company || ''}
                        onChange={e => {
                            setPromoCode(e?.target?.value);
                        }}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        placeholder="PROMO CODE"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                border: '2px solid green', // основная зелёная обводка
                                '& fieldset': {
                                    border: 'none', // убираем стандартную обводку
                                },
                                '&:hover fieldset': {
                                    border: 'none', // убираем обводку при наведении
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none', // убираем обводку при фокусе
                                },
                            },
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
                        disabled={!orderData?.productsList?.length || loadCreateOrder}
                        variant="contained"
                        sx={{ width: '100%' }}
                        onClick={() => {
                            handleConfirmOrder();
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
