import { Box, Button } from '@mui/material';
import { useOutletContext, useParams } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { CatalogContextInterface } from 'types';
import { STORE_CONFIG } from 'constants/stores_config';

const ActionSection = ({ isShown, selectedVariant }) => {
    const { OPTIONS } = STORE_CONFIG;
    const { PLAN_OPTIONS } = OPTIONS;
    const { storeCode } = useParams();
    const { string, setOpenModalType, auth, cart, favorites }: CatalogContextInterface = useOutletContext();

    const selectedToCart = cart?.cartItems?.find(item => item.sku === selectedVariant?.sku);
    const selectedToFavorite = favorites?.favoriteItems?.find(item => item.sku === selectedVariant?.sku);

    if (isShown)
        return (
            <Box mb={0.5} sx={{ display: 'flex', gap: 1 }}>
                {PLAN_OPTIONS?.cart && (
                    <Button
                        sx={{
                            cursor: 'pointer',
                            borderRadius: 2,
                            width: '100%',
                        }}
                        variant={selectedToCart ? 'contained' : 'outlined'}
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
                {PLAN_OPTIONS?.favorites && (
                    <Button
                        sx={{
                            cursor: 'pointer',
                            borderRadius: 2,
                            width: '100%',
                        }}
                        variant={selectedToFavorite ? 'contained' : 'outlined'}
                        onClick={() => {
                            favorites?.handleSetFavoriteItems({
                                sku: selectedVariant?.sku,
                                storeCode,
                                userId: selectedVariant?.id,
                                productId: selectedVariant?.productId,
                            });
                        }}
                        color="warning"
                        endIcon={
                            selectedToFavorite ? (
                                <FavoriteIcon fontSize="small" />
                            ) : (
                                <FavoriteBorderIcon fontSize="small" />
                            )
                        }
                    >
                        {selectedToFavorite ? string?.added : string?.add_to}
                    </Button>
                )}
            </Box>
        );
    return null;
};

export default ActionSection;
