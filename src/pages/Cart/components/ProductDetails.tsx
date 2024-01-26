import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import { useOutletContext } from 'react-router-dom';
import { CatalogContextInterface } from 'types';

const ProductDetails = ({ data }) => {
    const { string, cart, store }: CatalogContextInterface = useOutletContext();

    return (
        <>
            <Grid
                xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #ccc',
                    flexWrap: 'wrap',
                    gap: 1,
                }}
                pb={1}
            >
                <Box sx={{ display: 'flex', gap: 0.25, alignItems: 'center' }}>
                    <Typography>{string?.vendor_code}:</Typography>
                    <Typography variant="h3" sx={{ color: 'gray', fontWeight: 700 }}>
                        {data?.sku}
                    </Typography>
                </Box>
                <Button
                    color="error"
                    variant="outlined"
                    onClick={() => {
                        cart?.handleSetCartItems({
                            sku: data?.sku,
                        });
                    }}
                >
                    {string?.delete}
                </Button>
            </Grid>
            <Typography variant="h3">{data?.name}</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography>{string?.price}:</Typography>
                <Typography variant="h3" sx={{ color: 'gray' }}>
                    {getCurrencySymbol(store?.currency)}
                    {data?.inventory[0]?.price}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography>{string?.color}:</Typography>
                <Typography variant="h3" sx={{ color: 'gray' }}>
                    {data?.variation?.optionValue?.name}
                </Typography>
            </Box>
        </>
    );
};

export default ProductDetails;
