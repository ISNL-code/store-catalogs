import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './MainCatalogHeader';
import MobileMenu from './MainCatalogMobileMenu';
import { useGetLanguage } from 'hooks/useGetLanguage';
import { useDevice } from 'hooks/useDevice';
import { useEffect, useState } from 'react';
import { useStoresApi } from 'api/useStoresApi';
import { useCategory } from '../hooks/useCategory';
import { useProducts } from '../hooks/useProducts';
import { CatalogContextInterface, StoreInterface } from 'types';
import { STORES_DATA } from 'dataBase/STORES';
import { useAddToCart } from '../hooks/useAddToCart';
import { useAddToFavorites } from '../hooks/useAddToFavorites';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { useFormsApp } from 'layouts/hooks/useFormsApp';
import DialogApp from 'layouts/DialogApp';
import { ROUTES, STORE_ROUTE } from 'constants/routes';
import Loader from 'components/atoms/Loader/Loader';

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
}) {
    const { OPTIONS, STORE_CODE } = STORE_CONFIG;
    const { PLAN_OPTIONS } = OPTIONS;
    const { storeName, storeCode } = useParams();
    const navigate = useNavigate();
    const { sx } = useDevice();
    const HEADER_HEIGHT = 50;
    const FOOTER_MENU_HEIGHT = sx ? '65px' : '0';
    const INSTRUMENTAL_BAR_HEIGHT = 36;
    const INSTRUMENTAL_BAR_PADDINGS = sx ? 2 : 4;
    const HEADER_PADDINGS = sx ? 2 : 4;
    const BODY_PADDINGS = sx ? 0 : 4;
    const FOOTER_PADDINGS = sx ? 2 : 4;
    const { currentLanguage } = useGetLanguage({ lang, storeName: storeName });
    const [scrollPosition, setScrollPosition] = useState(0);
    const [queryCategories, setQueryCategories] = useState<string[] | []>([]);
    const [store, setStore] = useState<StoreInterface | null>(null);
    const [supportedLanguage, setSupportedLanguage] = useState<string | null>(null);
    const { activeDialogWindow, handleOpenDialog } = useFormsApp();

    const { data: storeDataRes, isFetching: loadStore } = useStoresApi().useGetStoreByCode({
        code: STORE_CODE,
    });

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
        lang: supportedLanguage,
        store: STORE_CODE,
        queryCategories,
        setQueryCategories,
        viewMode,
    });

    const { categoriesList, handleCategoriesQuery } = useCategory({
        lang: supportedLanguage,
        store: STORE_CODE,
        currentProductsPage,
        handleSetProductsPage,
        setQueryCategories,
        queryCategories,
    });

    const cart = useAddToCart({ auth, loadingUser: userData?.isFetching, storeName });
    const favorites = useAddToFavorites({ loadingUser: userData?.isFetching, storeName });

    useEffect(() => {
        if (STORE_CODE !== storeCode) {
            navigate(STORE_ROUTE?.root(STORE_CODE));
        }
    }, [storeCode, STORE_CODE, store]); // eslint-disable-line

    useEffect(() => {
        if (!storeDataRes || loadStore) return;
        setStore({ ...STORES_DATA.find(el => el.code === STORE_CODE), ...storeDataRes.data }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeDataRes]);

    useEffect(() => {
        if (!store?.supportedLanguages) return;
        setSupportedLanguage(store?.supportedLanguages?.find(el => el.code === lang) ? lang : 'en');
    }, [lang, store?.supportedLanguages]);

    if (!store) return <Loader type="circular" />;

    return (
        <Box display="flex" flexDirection="column" justifyContent="space-between">
            <CssBaseline />

            <Header
                headerHeight={HEADER_HEIGHT}
                appXPadding={HEADER_PADDINGS}
                string={currentLanguage?.string}
                lang={supportedLanguage}
                setLang={setLang}
                logo={store?.logo?.path}
                storeHeaderName={store?.name}
                store={store}
                cart={cart}
                favorites={favorites}
                auth={auth}
                user={userData}
                handleOpenDialog={handleOpenDialog}
            />

            <Box className="AppBody" mt={`${HEADER_HEIGHT + INSTRUMENTAL_BAR_HEIGHT}px`} sx={{ flexGrow: 1 }}>
                <OutletContainer
                    context={{
                        //main data | user options
                        lang,
                        supportedLanguage,
                        string: currentLanguage?.string,
                        scrollPosition,
                        setScrollPosition,
                        viewMode,
                        setViewMode,
                        handleOpenDialog,

                        //store data
                        infoAlert,
                        store,
                        setInfoAlert,

                        //user data
                        auth: auth,
                        currentUserData: userData.currentUserData,
                        loadingUserData: userData.isFetching,
                        updateUserData: userData.updateUserData,
                        setCurrentUserData: userData.setCurrentUserData,

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

                        //css data
                        instrumentalBarHeight: INSTRUMENTAL_BAR_HEIGHT,
                        instrumentalBarPadding: INSTRUMENTAL_BAR_PADDINGS,
                        headerHeight: HEADER_HEIGHT,
                        footerMenuHeight: FOOTER_MENU_HEIGHT,
                        appXPadding: BODY_PADDINGS,

                        //cart & favorites
                        cart: cart,
                        favorites: favorites,
                    }}
                />
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
                handleOpenDialog={handleOpenDialog}
            />
            <DialogApp
                location={ROUTES?.STORE}
                string={currentLanguage?.string}
                activeDialogWindow={activeDialogWindow}
                handleOpenDialog={handleOpenDialog}
                setAuth={setAuth}
                cart={cart}
                favorites={favorites}
            />
        </Box>
    );
}
