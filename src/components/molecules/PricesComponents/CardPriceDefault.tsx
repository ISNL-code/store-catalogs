import { Box, Typography } from '@mui/material';
import { Colors } from 'colors';

interface Props {
    currency;
    price;
}

const CardPriceDefault = ({ currency, price }: Props) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Typography sx={{ color: Colors?.GRAY_900, fontSize: 20 }}>
                {currency}
                {Number(price)}
            </Typography>
        </Box>
    );
};

export default CardPriceDefault;
