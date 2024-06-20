import { Box, Button } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ProductVariantInterface } from 'types/app_models';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { CatalogContextInterface } from 'types/outlet_context_models';

interface Props {
    selectedVariant: ProductVariantInterface;
    isShown: boolean;
}

const ActionSection = ({ isShown, selectedVariant }: Props) => {
    const { OPTIONS, STORE_CODE } = STORE_CONFIG;
    const { PLAN_OPTIONS } = OPTIONS;
    const { string, cart, favorites }: CatalogContextInterface = useOutletContext();

    const selectedToCart = cart?.cartItems?.find(item => item.variantSku === selectedVariant?.variantSku);
    const selectedToFavorite = favorites?.favoriteItems?.find(item => item.variantSku === selectedVariant?.variantSku);

    if (isShown)
        return (
            <Box mb={0.5} sx={{ display: 'flex', gap: 1, width: '100%' }}>
                {PLAN_OPTIONS?.cart && (
                    <Button
                        sx={{
                            cursor: 'pointer',
                            borderRadius: 2,
                            width: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            textTransform: 'uppercase',
                            fontSize: 11,
                        }}
                        variant={'contained'}
                        onClick={() => {
                            // if (!auth) return setOpenModalType('register-warning');
                            cart?.handleSetCartItems({
                                variantSku: selectedVariant?.variantSku,
                                storeCode: STORE_CODE,
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
                        {selectedToCart ? string?.in_cart : string?.add_to_cart}
                    </Button>
                )}
                {PLAN_OPTIONS?.favorites && (
                    <Button
                        sx={{
                            cursor: 'pointer',
                            borderRadius: 2,
                            width: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            textTransform: 'uppercase',
                            fontSize: 11,
                        }}
                        variant={selectedToFavorite ? 'contained' : 'outlined'}
                        onClick={() => {
                            favorites?.handleSetFavoriteItems({
                                variantSku: selectedVariant?.variantSku,
                                storeCode: STORE_CODE,
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
