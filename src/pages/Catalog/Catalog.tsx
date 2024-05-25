import { Alert, Box, Collapse, IconButton } from '@mui/material';
import Loader from 'components/atoms/Loader/Loader';
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
import ViewModeButton from 'components/molecules/ToolsButtons/ViewModeButton';
import CatalogListCard from 'components/organisms/Cards/CatalogListCard';
import CloseIcon from '@mui/icons-material/Close';
import { useDevice } from 'hooks/useDevice';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { ViewModeType } from 'store_constants/types';
import { STORE_ROUTE } from 'constants/routes';

const Catalog = () => {
    const { OPTIONS, STORE_CODE, SIDE_LINKS } = STORE_CONFIG;
    const { PLAN_OPTIONS, MIN_ITEMS_TO_BUY } = OPTIONS;
    const { sx } = useDevice();
    const {
        store,
        productsList,
        scrollPosition,
        instrumentalBarHeight,
        headerHeight,
        loadProducts,
        setScrollPosition,
        setProductsList,
        handleSetProductsPage,
        totalProductsCount,
        currentProductsPage,
        totalProductsPages,
        footerMenuHeight,
        string,
        viewMode,
        infoAlert,
        setInfoAlert,
    }: CatalogContextInterface = useOutletContext();
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [showMobileStoresButton, setShowMobileStoresButton] = useState(true);

    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(infoAlert?.ws_info);

    const getGridSpacing = () => {
        let spacing;
        let padding;

        switch (viewMode) {
            case ViewModeType.card:
                padding = sx ? 2 : 4;
                spacing = 1;
                break;

            case ViewModeType.grid_m:
                padding = sx ? 1 : 4;
                spacing = 0.5;
                break;
        }

        return { spacing, padding };
    };

    useEffect(() => {
        if (loadProducts || !productsList) return;
        setLoading(false);
    }, [loading, productsList]); // eslint-disable-line

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
        }, 300); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box
            pt={getGridSpacing()?.padding}
            pb={footerMenuHeight}
            px={getGridSpacing()?.padding}
            sx={{ minHeight: '100%' }}
        >
            {showTopBtn && <ScrollButton />}
            {showMobileStoresButton && (
                <>
                    {PLAN_OPTIONS?.appleStore && <AppleStoreButton />}
                    {PLAN_OPTIONS?.playMarket && <PlayMarketButton />}
                </>
            )}
            {loadProducts && !productsList?.length && <Loader position="fixed" />}
            {PLAN_OPTIONS?.contacts && <CallBackButton path={STORE_ROUTE?.contacts(STORE_CODE)} />}
            <InstrumentalSubHeader
                StartSlot={() => (
                    <>
                        {SIDE_LINKS?.map(({ name, href }) => (
                            <Box sx={{ display: 'flex' }} key={href}>
                                <SideLink name={name} href={href} />
                            </Box>
                        ))}
                    </>
                )}
                EndSlot={() => (
                    <Box sx={{ display: 'flex', gap: 0.75 }}>
                        <ViewModeButton />
                        <SkuSearch />
                        <FilterCategories isShown={PLAN_OPTIONS?.categories} />
                    </Box>
                )}
            />

            {productsList?.length ? (
                <Box sx={{ minHeight: '100%' }}>
                    <TransitionBox dependency={loading} time={0}>
                        {MIN_ITEMS_TO_BUY > 1 && (
                            <Collapse in={open}>
                                <Box mb={2}>
                                    <Alert
                                        variant="standard"
                                        severity="info"
                                        color="warning"
                                        sx={{ fontSize: sx ? 14 : 18 }}
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    setInfoAlert({ ...infoAlert, ws_info: false });
                                                    setOpen(false);
                                                }}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                    >
                                        {string?.wholesales_ordering_limitation_message}
                                    </Alert>
                                </Box>
                            </Collapse>
                        )}
                        <Grid className="CatalogList" container spacing={getGridSpacing()?.spacing}>
                            {productsList?.map(product => {
                                return (
                                    <CatalogListCard
                                        key={product.id}
                                        modelsVariants={product.variants as any}
                                        name={product.name}
                                        productId={product.id}
                                        currency={getCurrencySymbol(store?.currency)}
                                        setProductsList={setProductsList}
                                        promoTags={product?.promoTags}
                                        viewMode={viewMode}
                                    />
                                );
                            })}
                        </Grid>
                    </TransitionBox>
                </Box>
            ) : (
                <>{!loadProducts && <EmptyPage isShown />}</>
            )}
            <Grid my={2} xs={12} container>
                <PaginationButton
                    setCurrentPage={handleSetProductsPage}
                    totalCount={totalProductsCount}
                    loading={loading || loadProducts}
                    productsList={productsList}
                    page={currentProductsPage}
                    totalPages={totalProductsPages}
                    activateAutomatically
                />
            </Grid>
        </Box>
    );
};

export default Catalog;
