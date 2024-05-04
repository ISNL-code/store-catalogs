import { Typography } from '@mui/material';
import { HARD_SET_CURRENCY, SALE_PRICE_MULTIPLICATION } from 'constants/store_config_options';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';

const CartModelPrice = ({ price, currency }) => {
    return (
        <>
            <Typography variant="h3" sx={{ color: 'gray' }}>
                {HARD_SET_CURRENCY || getCurrencySymbol(currency)}
                {price * SALE_PRICE_MULTIPLICATION}
            </Typography>
        </>
    );
};

export default CartModelPrice;
