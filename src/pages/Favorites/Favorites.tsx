import { Box } from '@mui/material';
import Loader from 'components/atoms/Loader/Loader';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ScrollButton from 'components/atoms/Buttons/ScrollButton';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import SkuSearch from 'components/molecules/ToolsButtons/SkuSearch';
import { CatalogContextInterface } from 'types/outlet_context_models';
import TransitionBox from 'components/atoms/Transitions/TransitionBox';
import Grid from '@mui/material/Unstable_Grid2';
import ViewModeButton from 'components/molecules/ToolsButtons/ViewModeButton';
import CatalogListCard from 'components/organisms/Cards/CatalogListCard';
import { useDevice } from 'hooks/useDevice';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { ViewModeType } from 'store_constants/types';
import { STORE_ROUTE } from 'router/routes';
import { useIsMount } from 'hooks/useIsMount';
import ClearListButton from 'components/molecules/ToolsButtons/ClearListButton';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { scrollPage } from 'utils/scrollPage';
import { ProductDataInterface } from 'types/app_models';
import MessageButton from 'components/molecules/ToolsButtons/MessageButton';
import CallBackButton from 'components/molecules/ToolsButtons/CallBackButton';
import CocktailButton from 'components/atoms/Buttons/CocktailButton';
import mainLogo from 'assets/img/logo.webp';

const Favorites = () => {
    const { OPTIONS, STORE_CODE } = STORE_CONFIG;
    const { PLAN_OPTIONS } = OPTIONS;
    const { sx } = useDevice();
    const mount = useIsMount();
    const {
        favoritesList,
        scrollPosition,
        instrumentalBarHeight,
        headerHeight,
        isLoadingFavorites,
        setScrollPosition,
        footerMenuHeight,
        string,
        viewMode,
        handleOpenDialog,
        fetchFavoriteProducts,
        favorites,
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
        if (favorites?.favoriteItems?.length) fetchFavoriteProducts();
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
    }, []); // eslint-disable-line

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
            <Box sx={{ position: 'fixed', bottom: sx ? 70 : 16, left: sx ? 16 : 32, zIndex: 10 }}>
                <Box sx={{ position: 'relative' }}>
                    <CocktailButton logoUrl={mainLogo} />
                </Box>
            </Box>
            {isLoadingFavorites && <Loader />}
            {PLAN_OPTIONS?.feedback && <MessageButton action={() => handleOpenDialog(DialogWindowType?.QUESTION)} />}
            {PLAN_OPTIONS.contacts && <CallBackButton path={STORE_ROUTE.contacts(STORE_CODE)} />}
            <InstrumentalSubHeader
                EndSlot={() => (
                    <Box sx={{ display: 'flex', gap: 0.75 }}>
                        <ViewModeButton />
                        <SkuSearch />
                        <ClearListButton
                            action={() => {
                                handleOpenDialog(DialogWindowType?.CLEAR_FAVORITES);
                            }}
                            isShown
                            title={string?.clear_favorites}
                            disabled={!favoritesList?.length}
                        />
                    </Box>
                )}
            />
            {favoritesList?.length ? (
                <Box sx={{ minHeight: scrollPosition || '100%' }}>
                    <TransitionBox dependency={mount} time={250}>
                        <Grid className="CatalogList" container spacing={getGridSpacing()?.spacing}>
                            {favoritesList.map((product: ProductDataInterface, idx) => (
                                <CatalogListCard
                                    key={idx}
                                    modelsVariants={product?.variants}
                                    name={product?.name}
                                    productId={product?.id}
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
                !isLoadingFavorites && <EmptyPage isShown />
            )}
        </Box>
    );
};

export default Favorites;
