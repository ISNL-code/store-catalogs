import { Typography } from '@mui/material';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';

interface Props {
    currency: string;
    price: string | number;
}

const OrderPrice = ({ currency, price }: Props) => {
    const { OPTIONS } = STORE_CONFIG;
    const { CURRENCY_MULTIPLICATION, CUSTOM_CURRENCY, SALE_PRICE_MULTIPLICATION, RETAIL_PRICE_MULTIPLICATION } =
        OPTIONS;
    return (
        <Typography variant="h5">
            {CUSTOM_CURRENCY || getCurrencySymbol(currency)}
            {(
                Number(price?.toString().replace(/[^0-9.]/g, '')) *
                SALE_PRICE_MULTIPLICATION *
                CURRENCY_MULTIPLICATION *
                RETAIL_PRICE_MULTIPLICATION
            ).toFixed(2)}
        </Typography>
    );
};

export default OrderPrice;
