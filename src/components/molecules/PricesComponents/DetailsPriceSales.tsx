import { Box, Typography } from '@mui/material';
import { Color, Colors } from 'constants/colors';
import { map_currency_symbol } from 'utils/mappers/currency_symbol';

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
                    {map_currency_symbol(currency)}
                    {Number(price)}
                </Typography>
                /
                <Typography sx={{ color: Color.ERROR, fontSize: 20, fontWeight: 700 }}>
                    {map_currency_symbol(currency)}
                    {Number(discountPrice)}
                </Typography>
            </Box>
        </>
    );
};

export default DetailsPriceSales;
