import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './MainCatalogHeader';
import MobileMenu from './MainCatalogMobileMenu';
import { useDevice } from 'hooks/useDevice';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useCategory } from '../hooks/useCategory';
import { useProducts } from '../hooks/useProducts';
import { CatalogContextInterface } from 'types/outlet_context_models';
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
    currentLanguage,
}) {
    const { OPTIONS, STORE_CODE } = STORE_CONFIG;
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
    const [scrollPosition, setScrollPosition] = useState(0);
    const { activeDialogWindow, handleOpenDialog, handleSetDialogState, dialogState } = useFormsApp();

    const {
        isLoadingProducts,
        isLoadingMoreProducts,
        currentProductsPage,
        handleSetProductsPage,
        productsList,
        totalProductsCount,
        productCountPerPage,
        totalProductsPages,
        setProductsList,
        queryCategories,
        setQueryCategories,
    } = useProducts({
        lang,
        store: STORE_CODE,
    });

    const { categoriesList } = useCategory({
        lang,
        store: STORE_CODE,
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
            isLoadingProducts,
            isLoadingMoreProducts,
            productCountPerPage,
            totalProductsCount,
            totalProductsPages,
            handleSetProductsPage,
            currentProductsPage,

            //categories data
            categoriesList,
            queryCategories,
            setQueryCategories,

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
            isLoadingProducts,
            isLoadingMoreProducts,
            productCountPerPage,
            totalProductsCount,
            totalProductsPages,
            handleSetProductsPage,
            currentProductsPage,
            categoriesList,
            queryCategories,
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
