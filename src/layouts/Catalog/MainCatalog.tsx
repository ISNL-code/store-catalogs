import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './MainCatalogHeader';
import MobileMenu from './MainCatalogMobileMenu';
import { useGetLanguage } from 'hooks/useGetLanguage';
import { useDevice } from 'hooks/useDevice';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useCategory } from '../hooks/useCategory';
import { useProducts } from '../hooks/useProducts';
import { CatalogContextInterface } from 'types';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { useFormsApp } from 'layouts/hooks/useFormsApp';
import DialogApp from 'layouts/DialogApp';
import { ROUTES, STORE_ROUTE } from 'constants/routes';

const OutletContainer = ({ context }: { context: CatalogContextInterface }) => {
    return <Outlet context={context} />;
};

export default function MainCatalog({
    lang,
    setLang,
    auth,
    setAuth,
    userData,
    viewMode,
    setViewMode,
    infoAlert,
    setInfoAlert,
    store,
    favorites,
    cart,
}) {
    const { OPTIONS, STORE_CODE, STORE_NAME } = STORE_CONFIG;
    const { PLAN_OPTIONS } = OPTIONS;
    const { storeCode } = useParams();
    const navigate = useNavigate();
    const { sx } = useDevice();
    const HEADER_HEIGHT = 50;
    const FOOTER_MENU_HEIGHT = sx ? 65 : 0;
    const INSTRUMENTAL_BAR_HEIGHT = 36;
    const INSTRUMENTAL_BAR_PADDINGS = sx ? 2 : 4;
    const HEADER_PADDINGS = sx ? 2 : 4;
    const BODY_PADDINGS = sx ? 0 : 4;
    const FOOTER_PADDINGS = sx ? 2 : 4;
    const { currentLanguage } = useGetLanguage({ lang, storeName: STORE_NAME });
    const [scrollPosition, setScrollPosition] = useState(0);
    const [queryCategories, setQueryCategories] = useState<string[] | []>([]);
    const [applyFilters, setApplyFilters] = useState(false);
    const [refreshFilters, setRefreshFilters] = useState(false);
    const { activeDialogWindow, handleOpenDialog, handleSetDialogState, dialogState } = useFormsApp();

    const {
        loadProducts,
        loadMoreProducts,
        updateProducts,
        currentProductsPage,
        handleSetProductsPage,
        productsList,
        totalProductsCount,
        productCountPerPage,
        totalProductsPages,
        setProductsList,
    } = useProducts({
        lang,
        store: STORE_CODE,
        applyFilters,
        refreshFilters,
        queryCategories,
        setRefreshFilters,
    });

    const { categoriesList, handleCategoriesQuery } = useCategory({
        lang,
        store: STORE_CODE,
        currentProductsPage,
        handleSetProductsPage,
        setQueryCategories,
        queryCategories,
    });

    useEffect(() => {
        if (STORE_CODE !== storeCode) {
            navigate(STORE_ROUTE?.root(STORE_CODE));
        }
    }, [storeCode, STORE_CODE, navigate]);

    const memoizedContext = useMemo(
        () => ({
            //main data | user options
            lang,
            string: currentLanguage?.string,
            scrollPosition,
            setScrollPosition,
            viewMode,
            setViewMode,
            handleOpenDialog,
            handleSetDialogState,
            dialogState,

            //store data
            infoAlert,
            store,
            setInfoAlert,

            //user data
            auth,
            currentUserData: userData.currentUserData,
            loadingUserData: userData.isFetchingUser,
            updateUserData: userData.updateUserData,
            setCurrentUserData: userData.setCurrentUserData,
            userDataError: userData.userError,

            //products data
            productsList,
            setProductsList,
            loadProducts,
            loadMoreProducts,
            updateProducts,
            productCountPerPage,
            totalProductsCount,
            totalProductsPages,
            handleSetProductsPage,
            currentProductsPage,

            //categories data
            categoriesList,
            queryCategories,
            setQueryCategories,
            handleCategoriesQuery,
            setApplyFilters,
            applyFilters,
            setRefreshFilters,

            //css data
            instrumentalBarHeight: INSTRUMENTAL_BAR_HEIGHT,
            instrumentalBarPadding: INSTRUMENTAL_BAR_PADDINGS,
            headerHeight: HEADER_HEIGHT,
            footerMenuHeight: FOOTER_MENU_HEIGHT,
            appXPadding: BODY_PADDINGS,

            //cart & favorites
            cart,
            favorites,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            lang,
            currentLanguage,
            scrollPosition,
            viewMode,
            handleOpenDialog,
            handleSetDialogState,
            dialogState,
            infoAlert,
            store,
            auth,
            userData,
            productsList,
            loadProducts,
            loadMoreProducts,
            updateProducts,
            productCountPerPage,
            totalProductsCount,
            totalProductsPages,
            handleSetProductsPage,
            currentProductsPage,
            categoriesList,
            queryCategories,
            applyFilters,
            INSTRUMENTAL_BAR_HEIGHT,
            INSTRUMENTAL_BAR_PADDINGS,
            HEADER_HEIGHT,
            FOOTER_MENU_HEIGHT,
            BODY_PADDINGS,
            cart,
            favorites,
        ]
    );

    const memoizedHandleOpenDialog = useCallback(handleOpenDialog, []); // eslint-disable-line
    const memoizedSetLang = useCallback(setLang, []); // eslint-disable-line
    const memoizedSetAuth = useCallback(setAuth, []); // eslint-disable-line

    return (
        <Box display="flex" flexDirection="column" justifyContent="space-between">
            <CssBaseline />

            <Header
                headerHeight={HEADER_HEIGHT}
                appXPadding={HEADER_PADDINGS}
                string={currentLanguage?.string}
                lang={lang}
                setLang={memoizedSetLang}
                logo={store?.logo?.path}
                store={store}
                cart={cart}
                favorites={favorites}
                auth={auth}
                user={userData}
                handleOpenDialog={memoizedHandleOpenDialog}
            />

            <Box className="AppBody" mt={`${HEADER_HEIGHT + INSTRUMENTAL_BAR_HEIGHT}px`} sx={{ flexGrow: 1 }}>
                <OutletContainer context={memoizedContext} />
            </Box>

            <MobileMenu
                menuHeight={FOOTER_MENU_HEIGHT}
                appXPadding={FOOTER_PADDINGS}
                string={currentLanguage?.string}
                auth={auth}
                headerHeight={HEADER_HEIGHT}
                user={userData}
                isShown={!!sx}
                withCart={PLAN_OPTIONS?.cart}
                withFavorites={PLAN_OPTIONS?.favorites}
                cart={cart}
                favorites={favorites}
                handleOpenDialog={memoizedHandleOpenDialog}
            />
            <DialogApp
                location={ROUTES?.STORE}
                string={currentLanguage?.string}
                activeDialogWindow={activeDialogWindow}
                handleOpenDialog={memoizedHandleOpenDialog}
                setAuth={memoizedSetAuth}
                cart={cart}
                favorites={favorites}
                dialogState={dialogState}
            />
        </Box>
    );
}
