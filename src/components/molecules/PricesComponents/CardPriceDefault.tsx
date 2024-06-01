import { Box, Typography } from '@mui/material';
import { Color } from 'constants/colors';
import { STORE_CONFIG } from 'store_constants/stores_config';

interface Props {
    currency: string;
    price: number;
}

const CardPriceDefault = ({ currency, price }: Props) => {
    const { OPTIONS } = STORE_CONFIG;
    const {
        SALE_PRICE_MULTIPLICATION,
        CURRENCY_MULTIPLICATION,
        RETAIL_PRICE_MULTIPLICATION,
        MAIN_PRICE_MULTIPLICATION,
    } = OPTIONS;

    return (
        <Box sx={{ display: 'flex' }}>
            <Typography sx={{ color: Color.ERROR, fontSize: 20 }}>{currency}</Typography>
            <Typography sx={{ color: Color.ERROR, fontSize: 20 }}>
                {parseFloat(
                    (
                        price *
                        SALE_PRICE_MULTIPLICATION *
                        CURRENCY_MULTIPLICATION *
                        MAIN_PRICE_MULTIPLICATION *
                        RETAIL_PRICE_MULTIPLICATION
                    ).toFixed(2)
                )}
            </Typography>
        </Box>
    );
};

export default CardPriceDefault;
