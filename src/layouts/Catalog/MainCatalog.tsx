import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './CatalogHeader';
import MobileMenu from './MobileMenu';
import { useGetLanguage } from 'hooks/useGetLanguage';
import { useDevice } from 'hooks/useDevice';
import { useEffect, useState } from 'react';
import { useStoresApi } from 'api/useStoresApi';
import { useCategory } from './hooks/useCategory';
import { useProducts } from './hooks/useProducts';
import Modals from 'layouts/Modals';
import { StoreInterface } from 'types';
import { STORES_DATA } from 'dataBase/STORES';
import { useAddToCart } from './hooks/useAddToCart';
import { useAddToFavorites } from './hooks/useAddToFavorites';
import { STORE_CONFIG } from 'constants/stores_config';

export default function MainCatalog({ lang, setLang, auth, setAuth, userData }) {
    const { STORE_CODE } = STORE_CONFIG;
    const { storeName, storeCode } = useParams();
    const navigate = useNavigate();
    const { sx, l } = useDevice();
    const headerHeight = 50;
    const footerHeight = sx ? 70 : 0;
    const instrumentalBarHeight = 36;
    const appXPadding = l ? 2 : 4;
    const [openModalType, setOpenModalType] = useState<string | null>(null);
    const { currentLanguage } = useGetLanguage({ lang });
    const [scrollPosition, setScrollPosition] = useState(0);
    const [queryCategories, setQueryCategories] = useState<string[] | []>([]);
    const [store, setStore] = useState<StoreInterface | null>(null);
    const [supportedLanguage, setSupportedLanguage] = useState<string | null>(null);

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
        if (storeCode) {
            if (STORE_CODE !== storeCode) navigate('/');
        }
    }, [storeCode, STORE_CODE]); // eslint-disable-line

    useEffect(() => {
        if (!storeDataRes || loadStore) return;
        setStore({ ...STORES_DATA.find(el => el.code === STORE_CODE), ...storeDataRes.data }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeDataRes]);

    useEffect(() => {
        if (!store?.supportedLanguages) return;
        setSupportedLanguage(store?.supportedLanguages?.find(el => el.code === lang) ? lang : 'en');
    }, [lang, store?.supportedLanguages]);

    useEffect(() => {
        if (!store?.name || storeName) return;
        navigate(`${STORE_CODE}/${store?.name.toLowerCase().replaceAll(' ', '-')}`); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store]);

    if (!store) return <></>;

    return (
        <Box>
            <CssBaseline />

            <Header
                headerHeight={headerHeight}
                appXPadding={appXPadding}
                string={currentLanguage?.string}
                lang={supportedLanguage}
                setLang={setLang}
                auth={auth}
                logo={store?.logo?.path}
                storeHeaderName={store?.name}
                setOpenModalType={setOpenModalType}
                openModalType={openModalType}
                store={store}
                cart={cart}
                favorites={favorites}
                user={userData}
            />

            <Box
                px={sx ? 0 : appXPadding}
                pt={sx ? 0 : 1}
                sx={{ mt: `${headerHeight + instrumentalBarHeight}px`, mb: `${footerHeight}px` }}
            >
                <Outlet
                    context={{
                        //main data
                        lang: lang,
                        supportedLanguage: supportedLanguage,
                        string: currentLanguage?.string,
                        scrollPosition: scrollPosition,
                        setScrollPosition: setScrollPosition,
                        setOpenModalType: setOpenModalType,
                        openModalType: openModalType,

                        //store data
                        store,

                        //user data
                        currentUserData: userData.currentUserData,
                        loadingUserData: userData.isFetching,
                        updateUserData: userData.updateUserData,
                        setCurrentUserData: userData.setCurrentUserData,

                        //products data
                        productsList: productsList,
                        setProductsList: setProductsList,
                        loadProducts: loadProducts,
                        loadMoreProducts: loadMoreProducts,
                        updateProducts: updateProducts,
                        productCountPerPage: productCountPerPage,
                        totalProductsCount: totalProductsCount,
                        totalProductsPages: totalProductsPages,
                        handleSetProductsPage: handleSetProductsPage,
                        currentProductsPage: currentProductsPage,

                        //categories data
                        categoriesList,
                        queryCategories: queryCategories,
                        setQueryCategories: setQueryCategories,
                        handleCategoriesQuery: handleCategoriesQuery,

                        //css data
                        instrumentalBarHeight: instrumentalBarHeight,
                        headerHeight: headerHeight,
                        footerHeight: footerHeight,
                        appXPadding: appXPadding,
                        auth: auth,

                        //cart & favorites
                        cart: cart,
                        favorites: favorites,
                    }}
                />
            </Box>
            <Modals
                string={currentLanguage?.string as string}
                setAuth={setAuth}
                lang={lang}
                openModalType={openModalType}
                setOpenModalType={setOpenModalType}
            />
            <MobileMenu
                appXPadding={appXPadding}
                string={currentLanguage?.string}
                auth={auth}
                isShown={!!sx}
                withCart={store?.additionalStoreSettings?.cart}
                withShare={store?.mainStoreSettings?.productShare}
                setOpenModalType={setOpenModalType}
                openModalType={openModalType}
                cart={cart}
                favorites={favorites}
                headerHeight={headerHeight}
                store={store}
                user={userData}
            />
        </Box>
    );
}
