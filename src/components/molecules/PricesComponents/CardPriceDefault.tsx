import { Box, Typography } from '@mui/material';
import { Color } from 'constants/colors';

interface Props {
    currency;
    price;
}

const CardPriceDefault = ({ currency, price }: Props) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Typography sx={{ color: Color.ERROR, fontSize: 20 }}>
                {currency}
                {Number(price)}
            </Typography>
        </Box>
    );
};

export default CardPriceDefault;
