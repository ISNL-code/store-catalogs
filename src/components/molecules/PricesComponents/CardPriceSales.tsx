import { Box, Typography } from '@mui/material';
import { Color, Colors } from 'constants/colors';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { map_currency_symbol } from 'utils/mappers/currency_symbol';

interface Props {
    currency: string;
    originalPrice?: number;
    discountPrice?: number;
}

const CardPriceSales = ({ currency, originalPrice, discountPrice }: Props) => {
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
            {originalPrice !== discountPrice ? (
                <Box sx={{ display: 'flex', gap: 0.1, alignItems: 'center' }}>
                    {discountPrice && (
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
                    )}
                    <Typography sx={{ color: Colors?.GRAY_900, fontSize: 15, textDecoration: 'line-through' }}>
                        /
                    </Typography>
                    {originalPrice && (
                        <Typography sx={{ color: Colors?.GRAY_900, fontSize: 15, textDecoration: 'line-through' }}>
                            {CUSTOM_CURRENCY || map_currency_symbol(currency)}
                            {parseFloat(
                                (
                                    originalPrice *
                                    RETAIL_PRICE_MULTIPLICATION *
                                    CURRENCY_MULTIPLICATION *
                                    MAIN_PRICE_MULTIPLICATION
                                ).toFixed(2)
                            )}
                        </Typography>
                    )}
                </Box>
            ) : (
                <>
                    {originalPrice && (
                        <Typography sx={{ color: Colors?.GRAY_900, fontSize: 18 }}>
                            {CUSTOM_CURRENCY || map_currency_symbol(currency)}
                            {parseFloat(
                                (
                                    originalPrice *
                                    RETAIL_PRICE_MULTIPLICATION *
                                    CURRENCY_MULTIPLICATION *
                                    MAIN_PRICE_MULTIPLICATION
                                ).toFixed(2)
                            )}
                        </Typography>
                    )}
                </>
            )}
        </>
    );
};

export default CardPriceSales;
