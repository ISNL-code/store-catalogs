import { Box, Typography } from '@mui/material';
import { Colors } from 'colors';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';

interface Props {
    currency;
    price;
    discountPrice;
}

const DetailsPriceSales = ({ currency, price, discountPrice }: Props) => {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Typography sx={{ color: Colors?.GRAY_900, fontSize: 18, textDecoration: 'line-through' }}>
                    {getCurrencySymbol(currency)}
                    {Number(price)}
                </Typography>
                /
                <Typography sx={{ color: Colors?.RED, fontSize: 20, fontWeight: 700 }}>
                    {getCurrencySymbol(currency)}
                    {Number(discountPrice)}
                </Typography>
            </Box>
        </>
    );
};

export default DetailsPriceSales;
