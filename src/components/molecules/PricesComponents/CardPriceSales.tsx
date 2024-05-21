import { Box, Typography } from '@mui/material';
import { Color, Colors } from 'colors';

interface Props {
    currency;
    price;
    discountPrice;
}

const CardPriceSales = ({ currency, price, discountPrice }: Props) => {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Typography sx={{ color: Colors?.GRAY_900, fontSize: 16, textDecoration: 'line-through' }}>
                    {currency}
                    {Number(price)}
                </Typography>
                /
                <Typography sx={{ color: Color.ERROR, fontSize: 20, fontWeight: 700 }}>
                    {currency}
                    {Number(discountPrice)}
                </Typography>
            </Box>
        </>
    );
};

export default CardPriceSales;
