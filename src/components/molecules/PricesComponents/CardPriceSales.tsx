import { Box, Typography } from '@mui/material';
import { Colors } from 'colors';

interface Props {
    currency;
    price;
    discountPrice;
}

const CardPriceSales = ({ currency, price, discountPrice }: Props) => {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Typography sx={{ color: Colors?.GRAY_900, fontSize: 16 }}>
                    {currency}
                    {Number(price)}
                </Typography>
                /
                <Typography sx={{ color: Colors?.RED, fontSize: 20 }}>
                    {currency}
                    {Number(discountPrice)}
                </Typography>
            </Box>
        </>
    );
};

export default CardPriceSales;
