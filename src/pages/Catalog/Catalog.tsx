import { Alert, Box, Collapse, IconButton } from '@mui/material';
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
import CallBackButton from 'components/atoms/Buttons/CallBackButton';
import PaginationButton from 'components/atoms/Buttons/PaginationButton';
import SideLink from 'components/atoms/Buttons/SideLink';
import ViewModeButton from 'components/molecules/ToolsButtons/ViewModeButton';
import CatalogListCard from 'components/organisms/Cards/CatalogListCard';
import CloseIcon from '@mui/icons-material/Close';
import { useDevice } from 'hooks/useDevice';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { ViewModeType } from 'store_constants/types';
import { STORE_ROUTE } from 'router/routes';
import { useIsMount } from 'hooks/useIsMount';
import { scrollPage } from 'utils/scrollPage';
import InformationButton from 'components/atoms/Buttons/InformationButton';
import MessageButton from 'components/atoms/Buttons/MessageButton';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { ProductDataInterface } from 'types/app_models';

const Catalog = () => {
    const { OPTIONS, STORE_CODE, SIDE_LINKS } = STORE_CONFIG;
    const { PLAN_OPTIONS, MIN_ITEMS_TO_BUY } = OPTIONS;
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
        string,
        viewMode,
        infoAlert,
        setInfoAlert,
        handleOpenDialog,
    }: CatalogContextInterface = useOutletContext();
    const [showTopBtn, setShowTopBtn] = useState(false);
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
            setTimeout(() => {
                scrollPage(scrollPosition - (instrumentalBarHeight + headerHeight + getGridSpacing().padding * 8));
                setScrollPosition(0);
            }, 50);
            return;
        }
    }, []); // eslint-disable-line

    return (
        <Box
            pt={getGridSpacing().padding}
            px={getGridSpacing().padding}
            sx={{ minHeight: scrollPosition || '100%', pb: `${footerMenuHeight}px` }}
        >
            {showTopBtn && <ScrollButton />}
            <InformationButton />

            {isLoadingProducts && <Loader isShown={currentProductsPage === 0} />}
            {PLAN_OPTIONS?.feedback && <MessageButton action={() => handleOpenDialog(DialogWindowType?.QUESTION)} />}
            {PLAN_OPTIONS.contacts && <CallBackButton path={STORE_ROUTE.contacts(STORE_CODE)} />}
            <InstrumentalSubHeader
                StartSlot={() => (
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {SIDE_LINKS.map(({ name, href }) => (
                            <Box sx={{ display: 'inline' }} key={href}>
                                <SideLink name={name} href={href} />
                            </Box>
                        ))}
                    </Box>
                )}
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
                    <TransitionBox dependency={mount} time={250}>
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
