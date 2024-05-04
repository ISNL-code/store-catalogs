import { Box, Typography } from '@mui/material';

interface Props {
    currency;
    price;
}

const CardPriceDefault = ({ currency, price }: Props) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Typography variant="h3" sx={{ color: '#505050' }}>
                {currency}
                {Number(price)}
            </Typography>
        </Box>
    );
};

export default CardPriceDefault;
