import { Box } from '@mui/material';
import Loader from 'components/atoms/Loader/Loader';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ScrollButton from 'components/atoms/Buttons/ScrollButton';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import FilterCategories from 'components/organisms/Filters/FilterCategories';
import SkuSearch from 'components/molecules/ToolsButtons/SkuSearch';
import { CatalogContextInterface } from 'types/outlet_context_models';
import TransitionBox from 'components/atoms/Transitions/TransitionBox';
import Grid from '@mui/material/Unstable_Grid2';
import MessageButton from 'components/molecules/ToolsButtons/MessageButton';
import CallBackButton from 'components/molecules/ToolsButtons/CallBackButton';
import PaginationButton from 'components/atoms/Buttons/PaginationButton';
import ViewModeButton from 'components/molecules/ToolsButtons/ViewModeButton';
import CatalogListCard from 'components/organisms/Cards/CatalogListCard';
import { useDevice } from 'hooks/useDevice';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { ViewModeType } from 'store_constants/types';
import { STORE_ROUTE } from 'router/routes';
import { useIsMount } from 'hooks/useIsMount';
import { scrollPage } from 'utils/scrollPage';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { ProductDataInterface } from 'types/app_models';
import CatalogPromoAlert from 'components/molecules/Alerts/CatalogPromo';
import WholeSalesAlert from 'components/molecules/Alerts/WholeSales';
import CocktailButton from 'components/atoms/Buttons/CocktailButton';
import mainLogo from 'assets/img/logo.webp';

const Catalog = () => {
    const { OPTIONS, STORE_CODE } = STORE_CONFIG;
    const { PLAN_OPTIONS } = OPTIONS;
    const { sx } = useDevice();
    const mount = useIsMount();
    const {
        productsList,
        scrollPosition,
        instrumentalBarHeight,
        headerHeight,
        isLoadingProducts,
        setScrollPosition,
        setProductsList,
        handleSetProductsPage,
        totalProductsCount,
        currentProductsPage,
        totalProductsPages,
        footerMenuHeight,
        viewMode,
        handleOpenDialog,
    }: CatalogContextInterface = useOutletContext();
    const [showTopBtn, setShowTopBtn] = useState(false);

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
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (scrollPosition) {
            setTimeout(
                () => {
                    scrollPage(scrollPosition - (instrumentalBarHeight + headerHeight + getGridSpacing().padding * 8));
                    setScrollPosition(0);
                },
                sx ? 50 : 100
            );
            return;
        }
    }, []); // eslint-disable-line

    return (
        <Box
            pt={getGridSpacing().padding}
            px={getGridSpacing().padding}
            sx={{ minHeight: scrollPosition || '100vh', pb: `${footerMenuHeight}px` }}
        >
            {showTopBtn && <ScrollButton />}
            <Box sx={{ position: 'fixed', bottom: sx ? 70 : 16, left: sx ? 16 : 32, zIndex: 10 }}>
                <Box sx={{ position: 'relative' }}>
                    <CocktailButton logoUrl={mainLogo} />
                </Box>
            </Box>

            {isLoadingProducts && <Loader isShown={currentProductsPage === 0} />}
            {PLAN_OPTIONS?.feedback && <MessageButton action={() => handleOpenDialog(DialogWindowType?.QUESTION)} />}
            {PLAN_OPTIONS.contacts && <CallBackButton path={STORE_ROUTE.contacts(STORE_CODE)} />}
            <InstrumentalSubHeader
                EndSlot={() => (
                    <Box sx={{ display: 'flex', gap: 0.75 }}>
                        <ViewModeButton />
                        <SkuSearch />
                        <FilterCategories isShown={PLAN_OPTIONS.categories} />
                    </Box>
                )}
            />
            {productsList?.length ? (
                <Box sx={{ minHeight: scrollPosition || '100%' }}>
                    <TransitionBox dependency={mount} time={sx ? 0 : 1}>
                        <WholeSalesAlert />
                        {true && <CatalogPromoAlert />}
                        <Grid className="CatalogList" container spacing={getGridSpacing()?.spacing}>
                            {productsList.map((product: ProductDataInterface, idx) => (
                                <CatalogListCard
                                    key={idx}
                                    modelsVariants={product?.variants}
                                    name={product?.name}
                                    productId={product?.id}
                                    setProductsList={setProductsList}
                                    promoTags={product?.promoTags}
                                    viewMode={viewMode}
                                    sizesImage={product?.table_size_img?.imageUrl}
                                    productSizes={product?.productSizes}
                                    discounted={product?.discounted}
                                />
                            ))}
                        </Grid>
                    </TransitionBox>
                </Box>
            ) : (
                !isLoadingProducts && <EmptyPage isShown />
            )}
            <Grid my={2} xs={12} container>
                <PaginationButton
                    setCurrentPage={handleSetProductsPage}
                    totalCount={totalProductsCount}
                    loading={isLoadingProducts}
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
