import { Box } from '@mui/material';
import Loader from 'components/atoms/Loader/Loader';
import CatalogCard from 'components/organisms/Cards/CatalogCard';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import ScrollButton from 'components/atoms/Buttons/ScrollButton';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import FilterCategories from 'components/organisms/Filters/FilterCategories';
import SkuSearch from 'components/molecules/ToolsButtons/SkuSearch';
import { CatalogContextInterface } from 'types';
import TransitionBox from 'components/atoms/Transitions/TransitionBox';
import Grid from '@mui/material/Unstable_Grid2';
import CallBackButton from 'components/atoms/Buttons/CallBackButton';
import AppleStoreButton from 'components/atoms/Buttons/AppleStoreButton';
import PlayMarketButton from 'components/atoms/Buttons/PlayMarketButton';
import PaginationButton from 'components/atoms/Buttons/PaginationButton';
import SideLink from 'components/atoms/Buttons/SideLink';

const Catalog = () => {
    const {
        store,
        productsList,
        scrollPosition,
        loadProducts,
        setScrollPosition,
        setProductsList,
        instrumentalBarHeight,
        headerHeight,
        handleSetProductsPage,
        totalProductsCount,
        currentProductsPage,
        totalProductsPages,
    }: CatalogContextInterface = useOutletContext();
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [showMobileStoresButton, setShowMobileStoresButton] = useState(true);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loadProducts || !productsList) return;

        setTimeout(() => {
            setLoading(false);
        }, 100); // eslint-disable-next-line react-hooks/exhaustive-deps
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

        setTimeout(() => {
            window.scrollTo({
                top: scrollPosition - (instrumentalBarHeight + headerHeight),
                behavior: 'auto',
            });
            setScrollPosition(0);
        }, 150); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box pb={1}>
            {showTopBtn && <ScrollButton />}
            {showMobileStoresButton && (
                <>
                    {store?.additionalStoreSettings?.appleStore && <AppleStoreButton />}
                    {store?.additionalStoreSettings?.playMarket && <PlayMarketButton />}
                </>
            )}
            {((loadProducts && !productsList?.length) || loading) && <Loader position="fixed" />}
            {store?.mainStoreSettings?.contacts && <CallBackButton />}
            <InstrumentalSubHeader
                StartSlot={() =>
                    store?.links.map(({ name, href }) => (
                        <Box sx={{ display: 'flex' }} key={href}>
                            <SideLink name={name} href={href} />
                        </Box>
                    ))
                }
                EndSlot={() => (
                    <Box sx={{ display: 'flex', gap: 0.75 }}>
                        {store?.mainStoreSettings?.skuSearch && <SkuSearch />}
                        <FilterCategories isShown={store?.mainStoreSettings?.categories} />
                    </Box>
                )}
            />

            {productsList?.length ? (
                <TransitionBox dependency={loading} time="1250">
                    <Grid xs={12} container>
                        {productsList?.map(product => {
                            return (
                                <CatalogCard
                                    key={product.id}
                                    modelsVariants={product.variants as any}
                                    name={product.name}
                                    productId={product.id}
                                    currency={getCurrencySymbol(store?.currency)}
                                    setProductsList={setProductsList}
                                    promoTags={product?.promoTags}
                                />
                            );
                        })}
                    </Grid>
                </TransitionBox>
            ) : (
                <>{!loadProducts && !loading && <EmptyPage isShown />}</>
            )}
            {!!productsList?.length && !loadProducts && !loading && (
                <PaginationButton
                    setCurrentPage={handleSetProductsPage}
                    totalCount={totalProductsCount}
                    loadProducts={loadProducts}
                    productsList={productsList}
                    page={currentProductsPage}
                    totalPages={totalProductsPages}
                />
            )}
        </Box>
    );
};

export default Catalog;
