import { Box, Typography } from '@mui/material';
import { Colors } from 'colors';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';

interface Props {
    currency;
    price;
}

const DetailsPriceDefault = ({ currency, price }: Props) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Typography sx={{ color: Colors?.GRAY_900, fontSize: 20 }}>
                {getCurrencySymbol(currency)}
                {Number(price)}
            </Typography>
        </Box>
    );
};

export default DetailsPriceDefault;
