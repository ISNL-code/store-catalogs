import { Box, Typography } from '@mui/material';
import { Color, Colors } from 'constants/colors';

interface Props {
    currency;
    price;
    discountPrice;
}

const CardPriceSales = ({ currency, price, discountPrice }: Props) => {
    return (
        <>
            <Box sx={{ display: 'flex', gap: 0.1, alignItems: 'center' }}>
                <Typography sx={{ color: Color.ERROR, fontSize: 18, fontWeight: 700 }}>
                    {currency}
                    {Number(discountPrice)}
                </Typography>
                <Typography sx={{ color: Colors?.GRAY_900, fontSize: 15, textDecoration: 'line-through' }}>
                    /
                </Typography>
                <Typography sx={{ color: Colors?.GRAY_900, fontSize: 15, textDecoration: 'line-through' }}>
                    {currency}
                    {Number(price)}
                </Typography>
            </Box>
        </>
    );
};

export default CardPriceSales;
