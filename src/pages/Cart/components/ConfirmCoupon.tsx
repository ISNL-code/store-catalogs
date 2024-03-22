import { Box } from '@mui/system';
import CardItem from 'components/atoms/Sections/CardItem';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, TextField, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { CatalogContextInterface } from 'types';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import { OrderDataInterface } from '../Cart';
import { useState } from 'react';

const ConfirmCoupon = ({
    orderData,
    finalPrice,
    setSuccessOrdering,
}: {
    createOrder;
    orderData: OrderDataInterface;
    finalPrice;
    setSuccessOrdering;
}) => {
    const { string, store, currentUserData, cart }: CatalogContextInterface = useOutletContext();
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
                    <Typography variant="h2" sx={{ color: 'gray' }}>
                        {getCurrencySymbol(store?.currency)} {Number(finalPrice).toFixed(2)}
                    </Typography>
                </Grid>
                <Grid xs={12}>
                    <Button
                        disabled={!orderData?.productsList?.length}
                        variant="contained"
                        sx={{ width: '100%' }}
                        onClick={() => {
                            setSuccessOrdering(true);
                            cart?.handleClearCart();
                            return;
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
