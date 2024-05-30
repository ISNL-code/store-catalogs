import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Color } from 'colors';
import CartModelPrice from 'components/molecules/PricesComponents/CartModelPrice';
import { STORE_ROUTE } from 'constants/routes';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { ProductVariantInterface } from 'types/app_models';
import { OrderDataInterface } from '../Cart';
import { CatalogContextInterface } from 'types/outlet_context_models';

interface Props {
    data: ProductVariantInterface;
    setOrderData: Dispatch<SetStateAction<OrderDataInterface>>;
}

const ProductDetails = ({ data, setOrderData }: Props) => {
    const { STORE_CODE } = STORE_CONFIG;
    const navigate = useNavigate();
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
                            navigate(STORE_ROUTE?.product(STORE_CODE, data?.productId, data?.variantSku));
                        }}
                        variant="h3"
                        sx={{ color: Color?.PRIMARY, fontWeight: 700, cursor: 'pointer' }}
                    >
                        {data?.variantSku}
                    </Typography>
                </Box>
                <Button
                    color="error"
                    variant="outlined"
                    onClick={() => {
                        cart?.handleSetCartItems({
                            variantSku: data?.productSku,
                        });
                        setOrderData(prev => {
                            return {
                                ...prev,
                                productsList: prev?.productsList?.filter(el => {
                                    return el.colorId !== data.variantId;
                                }),
                            };
                        });
                    }}
                >
                    {string?.delete}
                </Button>
            </Grid>
            {/* <Typography variant="h3">{productName}</Typography> */}
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography>{string?.price}:</Typography>
                <CartModelPrice price={data?.price} currency={store?.currency} />
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography>{string?.color}:</Typography>
                <Typography variant="h3" sx={{ color: 'gray' }}>
                    {data?.colorName}
                </Typography>
            </Box>
        </>
    );
};

export default ProductDetails;
