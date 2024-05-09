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
                justifyContent: 'center',
            }}
        >
            <Typography
                sx={{ color: 'gray', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 12 }}
            >
                {sku}
            </Typography>
        </Box>
    );
};

export default CardSkuLabel;
