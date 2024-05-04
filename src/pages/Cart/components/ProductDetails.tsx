import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CartModelPrice from 'components/molecules/PricesComponents/CartModelPrice';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { CatalogContextInterface } from 'types';

const ProductDetails = ({ data }) => {
    const navigate = useNavigate();
    const { storeCode, storeName } = useParams();
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
                    <Typography
                        onClick={() => {
                            navigate(
                                `/catalog/${storeCode}/${storeName}/details/${
                                    data?.productId
                                }/model/${data?.sku?.replaceAll('/', '_')}`
                            );
                        }}
                        variant="h3"
                        sx={{ color: '#1976d2', fontWeight: 700, cursor: 'pointer' }}
                    >
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
                <CartModelPrice price={data?.inventory[0]?.price} currency={store?.currency} />
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
