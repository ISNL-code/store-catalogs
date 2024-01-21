import { Box, Button } from '@mui/material';
import { useOutletContext, useParams } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { CatalogContextInterface } from 'types';

const ActionSection = ({ isShown, selectedVariant }) => {
    const { storeCode } = useParams();
    const { store, string, setOpenModalType, auth, cart }: CatalogContextInterface = useOutletContext();

    const selectedToCart = cart?.cartItems?.find(item => item.sku === selectedVariant?.sku);
    const selectedToFavorites = false;

    if (isShown)
        return (
            <Box mb={0.5} sx={{ display: 'flex', gap: 1 }}>
                {store?.additionalStoreSettings?.cart && (
                    <Button
                        sx={{
                            cursor: 'pointer',
                            borderRadius: 2,
                            width: '100%',
                        }}
                        variant="contained"
                        onClick={() => {
                            if (!auth) return setOpenModalType('register-warning');
                            cart?.handleSetCartItems({
                                sku: selectedVariant?.sku,
                                storeCode,
                                userId: selectedVariant?.id,
                                productId: selectedVariant?.productId,
                            });
                        }}
                        color={selectedToCart ? 'success' : 'primary'}
                        endIcon={
                            selectedToCart ? (
                                <ShoppingCartCheckoutIcon fontSize="small" />
                            ) : (
                                <AddShoppingCartIcon fontSize="small" />
                            )
                        }
                    >
                        {selectedToCart ? string?.added : string?.add_to}
                    </Button>
                )}
                {store?.additionalStoreSettings?.favorites && (
                    <Button
                        sx={{
                            cursor: 'pointer',
                            borderRadius: 2,
                            width: '100%',
                        }}
                        variant="contained"
                        onClick={() => {
                            if (!auth) return setOpenModalType('register-warning');
                        }}
                        color="warning"
                        endIcon={false ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                    >
                        {string?.add_to}
                    </Button>
                )}
            </Box>
        );
    return null;
};

export default ActionSection;
