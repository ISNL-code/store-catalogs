import { Typography } from '@mui/material';
import { STORE_CONFIG } from 'constants/stores_config';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';

interface Props {
    price: string | number;
    currency: string;
}

const CartModelPrice = ({ price, currency }: Props) => {
    const { OPTIONS } = STORE_CONFIG;
    const { CURRENCY_MULTIPLICATION, CUSTOM_CURRENCY, SALE_PRICE_MULTIPLICATION } = OPTIONS;

    return (
        <>
            <Typography variant="h3" sx={{ color: 'gray' }}>
                {CUSTOM_CURRENCY || getCurrencySymbol(currency)}
                {Number(price) * SALE_PRICE_MULTIPLICATION * CURRENCY_MULTIPLICATION}
            </Typography>
        </>
    );
};

export default CartModelPrice;
