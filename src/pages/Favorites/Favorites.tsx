import { Box, Button } from '@mui/material';
import Loader from 'components/atoms/Loader/Loader';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import ScrollButton from 'components/atoms/Buttons/ScrollButton';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import BackButton from 'components/atoms/Buttons/BackButton';
import { CatalogContextInterface, ProductVariantInterface } from 'types';
import TransitionBox from 'components/atoms/Transitions/TransitionBox';
import Grid from '@mui/material/Unstable_Grid2';
import CallBackButton from 'components/atoms/Buttons/CallBackButton';
import AppleStoreButton from 'components/atoms/Buttons/AppleStoreButton';
import PlayMarketButton from 'components/atoms/Buttons/PlayMarketButton';
import CatalogFavoriteCard from 'components/organisms/Cards/CatalogFavoriteCard';
import { useIsMount } from 'hooks/useIsMount';
import { useProductsApi } from 'api/useProductsApi';
import DeleteModal from 'components/organisms/Modals/DeleteModal';

const Favorites = () => {
    const { store, favorites, supportedLanguage, auth, string }: CatalogContextInterface = useOutletContext();
    const { storeCode, storeName } = useParams();
    const navigate = useNavigate();
    const mount = useIsMount();
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [showMobileStoresButton, setShowMobileStoresButton] = useState(true);
    const [loading, setLoading] = useState(true);
    const [productIds, setProductIds] = useState<string[] | any[]>([]);
    const [favoriteProducts, setFavoriteProducts] = useState<ProductVariantInterface[] | any[]>([]);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const { isFetching: loadProducts, refetch: updateFavoriteProductsRes } = useProductsApi().useGetProductByIDForCart({
        id: productIds,
        lang: supportedLanguage,
        storeCode,
    });

    useEffect(() => {
        if (!favorites?.favoriteItems?.length) return setFavoriteProducts([]);
        setProductIds(favorites?.favoriteItems?.map(el => el.productId));
    }, [favorites?.favoriteItems]);

    useEffect(() => {
        if (mount) return;
        if (!productIds.length) return;
        updateFavoriteProductsRes().then(res => {
            const products = res.data?.data.products;

            const data = favorites?.favoriteItems?.map(({ sku }) => {
                return {
                    ...products
                        .find(el => el.variants.map(({ sku }) => sku).includes(sku))
                        ?.variants?.filter(el => el.sku === sku)[0],
                    sizes: products
                        .find(el => el.variants.map(({ sku }) => sku).includes(sku))
                        ?.options?.find(el => el.code === 'SIZE'),
                    name: products.find(el => el.variants.map(({ sku }) => sku).includes(sku))?.description?.name,
                    variants: products
                        .find(el => el.variants.map(({ sku }) => sku).includes(sku))
                        ?.variants.sort((a, b) => a.sortOrder - b.sortOrder)
                        .map((variant, idx) => {
                            return {
                                id: variant.id,
                                productId: variant.productId,
                                selected: variant.sku === sku,
                                price: variant.inventory[0]?.price,
                                images: variant.images,
                                colorCode: variant.variation.optionValue.code,
                                sku: variant.sku,
                            };
                        }),
                    price: products.find(el => el.variants.map(({ sku }) => sku).includes(sku))?.finalPrice,
                    promoTags:
                        products
                            .find(el => el.variants.map(({ sku }) => sku).includes(sku))
                            ?.options.find(({ code }) => code === 'PROMO')
                            ?.optionValues.map(({ code, id, description }) => {
                                return { code, id, name: description?.name };
                            })
                            .sort((a, b) => a.code - b.code) || [],
                };
            });
            setFavoriteProducts(data);
        }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productIds, supportedLanguage]);

    useEffect(() => {
        if (mount) return;
        if (!auth) navigate(`/catalog/${storeCode}/${storeName}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    useEffect(() => {
        if (loadProducts) return;

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [loadProducts, loading]);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                setShowTopBtn(true);
                setShowMobileStoresButton(false);
            } else {
                setShowTopBtn(false);
                setShowMobileStoresButton(true);
            }
        });
    }, []);

    if (loading) return <Loader />;

    return (
        <Box pb={1}>
            {showTopBtn && <ScrollButton />}
            {showMobileStoresButton && (
                <>
                    <AppleStoreButton />
                    <PlayMarketButton />
                </>
            )}
            {isOpenModal && (
                <DeleteModal
                    string={string}
                    title={string?.clear_favorites}
                    close={() => setIsOpenModal(false)}
                    text={string?.approve_favorites_clear}
                    action={() => {
                        favorites?.handleClearFavorites();
                    }}
                />
            )}
            {loading && <Loader />}
            {store?.mainStoreSettings?.contacts && <CallBackButton />}
            <InstrumentalSubHeader
                StartSlot={() => <BackButton nav={-1} action={() => {}} />}
                EndSlot={() => (
                    <Button
                        variant="outlined"
                        color="error"
                        sx={{ backgroundColor: 'white' }}
                        onClick={() => {
                            setIsOpenModal(true);
                        }}
                    >
                        {string?.clear_favorites}
                    </Button>
                )}
            />

            {favoriteProducts?.length ? (
                <TransitionBox dependency={loading}>
                    <Grid xs={12} container>
                        {favoriteProducts?.map(product => {
                            return (
                                <CatalogFavoriteCard
                                    key={product?.id}
                                    modelsVariants={product?.variants}
                                    name={product?.name}
                                    productId={product?.productId}
                                    promoTags={product?.promoTags}
                                    currency={getCurrencySymbol(store?.currency)}
                                />
                            );
                        })}
                    </Grid>
                </TransitionBox>
            ) : (
                <>{!loading && <EmptyPage isShown />}</>
            )}
        </Box>
    );
};

export default Favorites;
