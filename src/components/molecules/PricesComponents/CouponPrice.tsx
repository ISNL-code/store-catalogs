import { Typography } from '@mui/material';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { map_currency_symbol } from 'utils/mappers/currency_symbol';

interface Props {
    price: number;
    currency;
}

const CouponPrice = ({ price, currency }: Props) => {
    const { OPTIONS } = STORE_CONFIG;
    const { CUSTOM_CURRENCY, SALE_PRICE_MULTIPLICATION, CURRENCY_MULTIPLICATION, RETAIL_PRICE_MULTIPLICATION } =
        OPTIONS;

    return (
        <>
            <Typography variant="h2" sx={{ color: 'gray' }}>
                {CUSTOM_CURRENCY || map_currency_symbol(currency)}
                {parseFloat(
                    (price * SALE_PRICE_MULTIPLICATION * CURRENCY_MULTIPLICATION * RETAIL_PRICE_MULTIPLICATION).toFixed(
                        2
                    )
                )}
            </Typography>
        </>
    );
};

export default CouponPrice;
