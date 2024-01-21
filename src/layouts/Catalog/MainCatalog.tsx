import { Outlet, useParams } from 'react-router-dom';
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
import { useFavoritesProductsApi } from 'api/useFavoritesProductsApi';
import { useAddToCart } from './hooks/useAddToCart';

export default function MainCatalog({ lang, setLang, auth, setAuth, userData }) {
    const { sx, l } = useDevice();
    const headerHeight = 50;
    const footerHeight = sx ? 70 : 0;
    const instrumentalBarHeight = 36;
    const appXPadding = l ? 2 : 4;
    const [openModalType, setOpenModalType] = useState<string | null>(null);
    const { storeCode } = useParams();
    const { currentLanguage } = useGetLanguage({ lang: lang?.code });
    const [scrollPosition, setScrollPosition] = useState(0);
    const [queryCategories, setQueryCategories] = useState<string[] | []>([]);
    const [store, setStore] = useState<StoreInterface | null>(null);
    const [supportedLanguage, setSupportedLanguage] = useState<any>();

    const { data: storeDataRes, isFetching: loadStore } = useStoresApi().useGetStoreByCode({
        code: storeCode,
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
        store: storeCode,
        queryCategories,
        setQueryCategories,
    });

    const { categoriesList, handleCategoriesQuery } = useCategory({
        lang: supportedLanguage,
        store: storeCode,
        currentProductsPage,
        handleSetProductsPage,
        setQueryCategories,
        queryCategories,
    });

    const cart = useAddToCart({ auth, loadingUser: userData?.isFetching });

    useEffect(() => {
        if (!storeDataRes || loadStore) return;
        setStore({ ...storeDataRes.data, ...STORES_DATA.find(el => el.code === storeCode) });
    }, [storeDataRes]);

    useEffect(() => {
        if (!store?.supportedLanguages) return;
        setSupportedLanguage(
            store?.supportedLanguages?.find(el => el.code === lang?.code) ? { code: lang?.code } : { code: 'en' }
        );
    }, [lang, store?.supportedLanguages]);

    return (
        <Box
            sx={{
                overflow: 'hidden',
            }}
        >
            <CssBaseline />

            <Header
                headerHeight={headerHeight}
                appXPadding={appXPadding}
                string={currentLanguage?.string}
                lang={lang}
                setLang={setLang}
                auth={auth}
                logo={store?.logo?.path}
                storeHeaderName={store?.name}
                setOpenModalType={setOpenModalType}
                openModalType={openModalType}
                store={store}
                cart={cart}
            />
            <Box
                px={appXPadding}
                pt={1}
                sx={{ mt: `${headerHeight + instrumentalBarHeight}px`, mb: `${footerHeight}px` }}
            >
                <Outlet
                    context={{
                        //main data
                        lang: lang?.code,
                        supportedLanguage: supportedLanguage?.code,
                        string: currentLanguage?.string,
                        scrollPosition: scrollPosition,
                        setScrollPosition: setScrollPosition,
                        setOpenModalType: setOpenModalType,
                        openModalType: openModalType,

                        //store data
                        store,

                        //user data
                        currentUserData: userData.currentUser,
                        loadingUserData: userData.isFetching,

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
                    }}
                />
            </Box>
            <Modals
                string={currentLanguage?.string as string}
                setAuth={setAuth}
                lang={lang?.code}
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
            />
        </Box>
    );
}
