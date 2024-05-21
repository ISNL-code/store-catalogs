import { Box } from '@mui/material';
import Loader from 'components/atoms/Loader/Loader';
import { memo, useEffect, useState } from 'react';
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
import { STORE_CONFIG } from 'store_constants/stores_config';
import ViewModeButton from 'components/molecules/ToolsButtons/ViewModeButton';
import CatalogListCard from 'components/organisms/Cards/CatalogListCard';
import ClearListButton from 'components/molecules/ToolsButtons/ClearListButton';
import { StoreType, ViewModeType } from 'store_constants/types';
import { useDevice } from 'hooks/useDevice';
import { STORE_ROUTE } from 'constants/routes';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';

interface InstrumentalBarProps {
    favoriteLength: boolean;
}

const InstrumentalSubHeaderMemo = memo<InstrumentalBarProps>(({ favoriteLength }) => {
    const { string, handleOpenDialog }: CatalogContextInterface = useOutletContext();
    return (
        <InstrumentalSubHeader
            StartSlot={() => <BackButton nav={-1} action={() => {}} />}
            EndSlot={() => (
                <Box sx={{ display: 'flex', gap: 0.75 }}>
                    <ViewModeButton />
                    <ClearListButton
                        action={() => {
                            handleOpenDialog(DialogWindowType?.CLEAR_FAVORITES);
                        }}
                        isShown
                        title={string?.clear_favorites}
                        disabled={!favoriteLength}
                    />
                </Box>
            )}
        />
    );
});

const Favorites = () => {
    const { sx } = useDevice();
    const { OPTIONS, STORE_CODE } = STORE_CONFIG;
    const { STORE_TYPE, PLAN_OPTIONS } = OPTIONS;
    const {
        store,
        favorites,
        supportedLanguage,
        footerMenuHeight,
        viewMode,
        scrollPosition,
        instrumentalBarHeight,
        headerHeight,
        setScrollPosition,
    }: CatalogContextInterface = useOutletContext();
    const mount = useIsMount();
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [productIds, setProductIds] = useState<string[] | any[]>([]);
    const [favoriteProducts, setFavoriteProducts] = useState<ProductVariantInterface[] | any[]>([]);

    const { isFetching: loadProducts, refetch: updateFavoriteProductsRes } = useProductsApi().useGetProductByIDForCart({
        id: productIds,
        lang: supportedLanguage,
        storeCode: STORE_CODE,
    });

    const getGridSpacing = () => {
        let spacing;
        let padding;

        switch (viewMode) {
            case ViewModeType.card:
                padding = sx ? 2 : 4;
                spacing = 2;
                break;
            case ViewModeType.grid_l:
            case ViewModeType.grid_m:
                padding = sx ? 0 : 4;
                spacing = 0;
                break;
        }

        return { spacing, padding };
    };

    useEffect(() => {
        if (loadProducts) return;

        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, [loadProducts, loading]);

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
            favorites?.favoriteItems?.forEach(({ sku }) => {
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
                                STORE_TYPE === StoreType.sales
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
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });

        setTimeout(() => {
            window.scrollTo({
                top: scrollPosition - (instrumentalBarHeight + headerHeight),
                behavior: 'auto',
            });
            setScrollPosition(0);
        }, 150); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box
            pt={getGridSpacing()?.padding}
            pb={footerMenuHeight}
            px={getGridSpacing()?.padding}
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
            {showTopBtn && <ScrollButton />}
            {loading && <Loader />}
            {PLAN_OPTIONS?.contacts && <CallBackButton path={STORE_ROUTE?.contacts(STORE_CODE)} />}
            <InstrumentalSubHeaderMemo favoriteLength={Boolean(favoriteProducts?.length)} />

            {favoriteProducts?.length ? (
                <Box pb={2} sx={{ minHeight: loading ? '100vh' : 'auto' }}>
                    <TransitionBox dependency={loading} time={250}>
                        <Grid className="CatalogList" container spacing={getGridSpacing()?.spacing}>
                            {favoriteProducts?.map(product => {
                                return (
                                    <CatalogListCard
                                        key={product?.id}
                                        modelsVariants={product?.variants}
                                        name={product?.name}
                                        productId={product?.productId}
                                        currency={getCurrencySymbol(store?.currency)}
                                        promoTags={product?.promoTags}
                                        viewMode={viewMode}
                                    />
                                );
                            })}
                        </Grid>
                    </TransitionBox>
                </Box>
            ) : (
                <>{!loadProducts && !loading && <EmptyPage isShown />}</>
            )}
        </Box>
    );
};

export default Favorites;
