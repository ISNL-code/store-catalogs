import { Box, Button } from '@mui/material';
import { useOutletContext, useParams } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { CatalogContextInterface } from 'types';
import { useFavoritesProductsApi } from 'api/useFavoritesProductsApi';
// import { useEffect, useState } from 'react';

const ActionSection = ({ isShown, selectedVariant }) => {
    const { storeCode } = useParams();
    const {
        store,
        string,
        setOpenModalType,
        auth,
        cart,
        favorites,
    }: // favoritesList,
    // updateFavorites,
    // loadFavorites,
    CatalogContextInterface = useOutletContext();
    // const [favorite, setFavorite] = useState<any>(null);

    const { mutateAsync: addToFavorites } = useFavoritesProductsApi().useAddProductToFavorite();
    const { mutateAsync: deleteFromFavorite } = useFavoritesProductsApi().useDeleteProductToFavorite();

    // useEffect(() => {
    //     setFavorite(favoritesList?.find(el => el?.variantId === selectedVariant?.id));
    // }, [favoritesList, selectedVariant]);

    const selectedToCart = cart?.cartItems?.find(item => item.sku === selectedVariant?.sku);
    const selectedToFavorite = favorites?.favoriteItems?.find(item => item.sku === selectedVariant?.sku);

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
                {store?.additionalStoreSettings?.favorites && (
                    <Button
                        sx={{
                            cursor: 'pointer',
                            borderRadius: 2,
                            width: '100%',
                        }}
                        variant={selectedToFavorite ? 'contained' : 'outlined'}
                        onClick={() => {
                            if (!auth) return setOpenModalType('register-warning');
                            favorites?.handleSetFavoriteItems({
                                sku: selectedVariant?.sku,
                                storeCode,
                                userId: selectedVariant?.id,
                                productId: selectedVariant?.productId,
                            });
                            // if (loadFavorites) return;

                            // if (favorite) {
                            //     if (!favorite?.favoriteProductId) return;
                            //     setFavorite(null);
                            //     return deleteFromFavorite({ storeCode, variantId: favorite?.favoriteProductId }).then(
                            //         _ => {
                            //             updateFavorites();
                            //         }
                            //     );
                            // } else {
                            //     setFavorite(true);
                            //     addToFavorites({
                            //         storeCode,
                            //         data: {
                            //             productId: selectedVariant?.productId,
                            //             variantId: selectedVariant?.id,
                            //             attributes: [],
                            //         },
                            //     }).then(_ => {
                            //         updateFavorites();
                            //     });
                            // }
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
