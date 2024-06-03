import { Box, Typography } from '@mui/material';
import { Color, Colors } from 'constants/colors';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { map_currency_symbol } from 'utils/mappers/currency_symbol';

interface Props {
    currency: string;
    price: number;
    discountPrice: number;
}

const CardPriceSales = ({ currency, price, discountPrice }: Props) => {
    const { OPTIONS } = STORE_CONFIG;
    const {
        SALE_PRICE_MULTIPLICATION,
        CURRENCY_MULTIPLICATION,
        RETAIL_PRICE_MULTIPLICATION,
        MAIN_PRICE_MULTIPLICATION,
        CUSTOM_CURRENCY,
    } = OPTIONS;

    return (
        <>
            <Box sx={{ display: 'flex', gap: 0.1, alignItems: 'center' }}>
                <Typography sx={{ color: Color.ERROR, fontSize: 18, fontWeight: 700 }}>
                    {CUSTOM_CURRENCY || map_currency_symbol(currency)}
                    {parseFloat(
                        (
                            discountPrice *
                            SALE_PRICE_MULTIPLICATION *
                            CURRENCY_MULTIPLICATION *
                            RETAIL_PRICE_MULTIPLICATION
                        ).toFixed(2)
                    )}
                </Typography>
                <Typography sx={{ color: Colors?.GRAY_900, fontSize: 15, textDecoration: 'line-through' }}>
                    /
                </Typography>
                <Typography sx={{ color: Colors?.GRAY_900, fontSize: 15, textDecoration: 'line-through' }}>
                    {CUSTOM_CURRENCY || map_currency_symbol(currency)}
                    {parseFloat(
                        (
                            price *
                            RETAIL_PRICE_MULTIPLICATION *
                            CURRENCY_MULTIPLICATION *
                            MAIN_PRICE_MULTIPLICATION
                        ).toFixed(2)
                    )}
                </Typography>
            </Box>
        </>
    );
};

export default CardPriceSales;
