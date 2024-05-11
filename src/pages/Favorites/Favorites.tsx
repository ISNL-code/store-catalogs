import { Box } from '@mui/material';
import Loader from 'components/atoms/Loader/Loader';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import ScrollButton from 'components/atoms/Buttons/ScrollButton';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import BackButton from 'components/atoms/Buttons/BackButton';
import { CatalogContextInterface, ProductVariantInterface } from 'types';
import TransitionBox from 'components/atoms/Transitions/TransitionBox';
import Grid from '@mui/material/Unstable_Grid2';
import CallBackButton from 'components/atoms/Buttons/CallBackButton';
import { useIsMount } from 'hooks/useIsMount';
import { useProductsApi } from 'api/useProductsApi';
import DeleteModal from 'components/organisms/Modals/DeleteModal';
import { STORE_CONFIG } from 'constants/stores_config';
import ViewModeButton from 'components/molecules/ToolsButtons/ViewModeButton';
import CatalogListCard from 'components/organisms/Cards/CatalogListCard';
import ClearListButton from 'components/molecules/ToolsButtons/ClearListButton';

const Favorites = () => {
    const { OPTIONS, STORE_CODE, STORE_NAME } = STORE_CONFIG;
    const { STORE_TYPE, PLAN_OPTIONS } = OPTIONS;
    const { store, favorites, supportedLanguage, string, footerMenuHeight }: CatalogContextInterface =
        useOutletContext();
    const mount = useIsMount();
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [productIds, setProductIds] = useState<string[] | any[]>([]);
    const [favoriteProducts, setFavoriteProducts] = useState<ProductVariantInterface[] | any[]>([]);
    const [paddings, setPaddings] = useState(0);
    const [spacings, setSpacings] = useState(0);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const { isFetching: loadProducts, refetch: updateFavoriteProductsRes } = useProductsApi().useGetProductByIDForCart({
        id: productIds,
        lang: supportedLanguage,
        storeCode: STORE_CODE,
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

            //clear invalid items or deleted by seller
            favorites?.favoriteItems?.forEach(({ sku, storeCode, userId, productId }) => {
                if (!products.find(el => el.variants.map(({ sku }) => sku).includes(sku))) {
                    favorites?.handleSetFavoriteItems({
                        sku,
                    });
                }
            });

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
                        .map(variant => {
                            const originalPrice =
                                STORE_TYPE === 'sales'
                                    ? Math.max(
                                          ...products
                                              .find(el => el.variants.map(({ sku }) => sku).includes(sku))
                                              ?.variants.sort((a, b) => a.sortOrder - b.sortOrder)
                                              ?.map(el => Number(el.inventory[0]?.price))
                                      )
                                    : Number(variant.inventory[0]?.price);

                            return {
                                id: variant.id,
                                productId: variant.productId,
                                selected: variant.sku === sku,
                                price: variant.inventory[0]?.price,
                                images: variant.images,
                                colorCode: variant.variation.optionValue.code,
                                sku: variant.sku,
                                quantity: variant.inventory[0]?.quantity,
                                originalPrice,
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
        if (loadProducts) return;

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [loadProducts, loading]);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);

    if (loading) return <Loader />;

    const handleBodyPadding = val => {
        setPaddings(val);
    };

    const handleCardSpacings = val => {
        setSpacings(val);
    };

    return (
        <Box pt={paddings} pb={footerMenuHeight} px={paddings}>
            {showTopBtn && <ScrollButton />}
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
            {PLAN_OPTIONS?.contacts && (
                <CallBackButton path={`/catalog/${STORE_CODE}/${STORE_NAME?.replaceAll(' ', '-').toLowerCase()}/`} />
            )}
            <InstrumentalSubHeader
                StartSlot={() => <BackButton nav={-1} action={() => {}} />}
                EndSlot={() => (
                    <Box sx={{ display: 'flex', gap: 0.75 }}>
                        <ViewModeButton />
                        <ClearListButton
                            action={() => {
                                setIsOpenModal(true);
                            }}
                            isShown
                            title={string?.clear_favorites}
                        />
                    </Box>
                )}
            />

            {favoriteProducts?.length ? (
                <TransitionBox dependency={loading}>
                    <Grid className="CatalogList" container spacing={spacings}>
                        {favoriteProducts?.map(product => {
                            return (
                                <CatalogListCard
                                    key={product?.id}
                                    modelsVariants={product?.variants}
                                    name={product?.name}
                                    productId={product?.productId}
                                    currency={getCurrencySymbol(store?.currency)}
                                    promoTags={product?.promoTags}
                                    handleCardSpacings={handleCardSpacings}
                                    handleBodyPadding={handleBodyPadding}
                                />
                            );
                        })}
                    </Grid>
                </TransitionBox>
            ) : (
                <>{!loadProducts && !loading && <EmptyPage isShown />}</>
            )}
            {favoriteProducts?.length <= 12 && <Box sx={{ height: 50 }}></Box>}
        </Box>
    );
};

export default Favorites;
