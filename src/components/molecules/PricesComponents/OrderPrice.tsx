import { Typography } from '@mui/material';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { map_currency_symbol } from 'utils/mappers/currency_symbol';

interface Props {
    currency: string;
    price: number;
}

const OrderPrice = ({ currency, price }: Props) => {
    const { OPTIONS } = STORE_CONFIG;
    const { CURRENCY_MULTIPLICATION, CUSTOM_CURRENCY, SALE_PRICE_MULTIPLICATION, RETAIL_PRICE_MULTIPLICATION } =
        OPTIONS;
    return (
        <Typography variant="h5">
            {CUSTOM_CURRENCY || map_currency_symbol(currency)}
            {parseFloat(
                (price * SALE_PRICE_MULTIPLICATION * CURRENCY_MULTIPLICATION * RETAIL_PRICE_MULTIPLICATION).toFixed(2)
            )}
        </Typography>
    );
};

export default OrderPrice;
