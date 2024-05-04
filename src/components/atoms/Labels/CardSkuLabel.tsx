import { Box, Typography } from '@mui/material';

interface Props {
    sku: string;
}
const CardSkuLabel = ({ sku }: Props) => {
    return (
        <Box
            px={1}
            sx={{
                border: '1px solid #ccc',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: '16px',
            }}
        >
            <Typography variant="h6" sx={{ color: 'gray' }}>
                {sku}
            </Typography>
        </Box>
    );
};

export default CardSkuLabel;
