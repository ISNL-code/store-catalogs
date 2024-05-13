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
import { STORE_CONFIG } from 'constants/stores_config';

const Catalog = () => {
    const { OPTIONS, SIDE_LINKS, STORE_CODE, STORE_NAME } = STORE_CONFIG;
    const { PLAN_OPTIONS, MIN_ITEMS_TO_BUY } = OPTIONS;
    const { sx } = useDevice();
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
        footerMenuHeight,
        string,
    }: CatalogContextInterface = useOutletContext();
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [showMobileStoresButton, setShowMobileStoresButton] = useState(true);
    const [paddings, setPaddings] = useState(2);
    const [spacings, setSpacings] = useState(0);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(true);

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

    const handleBodyPadding = val => {
        setPaddings(val);
    };

    const handleCardSpacings = val => {
        setSpacings(val);
    };

    return (
        <Box pt={paddings} pb={footerMenuHeight} px={paddings}>
            {showTopBtn && <ScrollButton />}
            {showMobileStoresButton && (
                <>
                    {PLAN_OPTIONS?.appleStore && <AppleStoreButton />}
                    {PLAN_OPTIONS?.playMarket && <PlayMarketButton />}
                </>
            )}
            {((loadProducts && !productsList?.length) || loading) && <Loader position="fixed" />}
            {PLAN_OPTIONS?.contacts && (
                <CallBackButton path={`/catalog/${STORE_CODE}/${STORE_NAME?.replaceAll(' ', '-').toLowerCase()}/`} />
            )}
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
                <TransitionBox dependency={loading} time="1250">
                    {MIN_ITEMS_TO_BUY > 1 && (
                        <Collapse in={open}>
                            <Box mt={-paddings}>
                                <Alert
                                    variant="standard"
                                    severity="info"
                                    color="warning"
                                    sx={{ my: 2, fontSize: sx ? 14 : 18 }}
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
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
                    <Grid className="CatalogList" container spacing={spacings}>
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
                                    handleBodyPadding={handleBodyPadding}
                                    handleCardSpacings={handleCardSpacings}
                                />
                            );
                        })}
                    </Grid>
                </TransitionBox>
            ) : (
                <>{!loadProducts && !loading && <EmptyPage isShown />}</>
            )}
            <Grid my={2} xs={12} container>
                {Boolean(productsList?.length) && (
                    <PaginationButton
                        setCurrentPage={handleSetProductsPage}
                        totalCount={totalProductsCount}
                        loadProducts={loadProducts}
                        productsList={productsList}
                        page={currentProductsPage}
                        totalPages={totalProductsPages}
                    />
                )}
            </Grid>
        </Box>
    );
};

export default Catalog;
