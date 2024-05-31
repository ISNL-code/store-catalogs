import { Box, Typography } from '@mui/material';
import { Colors } from 'constants/colors';
import { map_currency_symbol } from 'utils/mappers/currency_symbol';

interface Props {
    currency;
    price;
}

const DetailsPriceDefault = ({ currency, price }: Props) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Typography sx={{ color: Colors?.GRAY_900, fontSize: 20 }}>
                {map_currency_symbol(currency)}
                {Number(price)}
            </Typography>
        </Box>
    );
};

export default DetailsPriceDefault;
