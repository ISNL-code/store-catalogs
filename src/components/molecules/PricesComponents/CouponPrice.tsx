import { Typography } from '@mui/material';
import { HARD_SET_CURRENCY, SALE_PRICE_MULTIPLICATION } from 'constants/store_config_options';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';

interface Props {
    price;
    currency;
}

const CouponPrice = ({ price, currency }: Props) => {
    return (
        <>
            <Typography variant="h2" sx={{ color: 'gray' }}>
                {HARD_SET_CURRENCY || getCurrencySymbol(currency)}{' '}
                {Number(price * SALE_PRICE_MULTIPLICATION).toFixed(2)}
            </Typography>
        </>
    );
};

export default CouponPrice;
