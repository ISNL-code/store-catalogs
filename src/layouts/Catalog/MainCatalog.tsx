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

export default function MainCatalog({ lang, setLang, auth, setAuth }) {
    const [openModalType, setOpenModalType] = useState<string | null>(null);
    const { storeCode } = useParams();
    const { sx, l } = useDevice();
    const { currentLanguage } = useGetLanguage({ lang: lang?.code });
    const [scrollPosition, setScrollPosition] = useState(0);
    const [queryCategories, setQueryCategories] = useState<string[] | []>([]);
    const [store, setStore] = useState<StoreInterface | null>(null);
    const [supportedLanguage, setSupportedLanguage] = useState({ code: 'en' });
    const headerHeight = 50;
    const footerHeight = sx ? 70 : 0;
    const instrumentalBarHeight = 36;
    const appXPadding = l ? 2 : 4;
    const { data: storeDataRes, remove: removeStoreData } = useStoresApi().useGetStoreByCode({ code: storeCode });
    const { categoriesList } = useCategory({ lang, store: storeCode });

    const {
        loadProducts,
        loadMoreProducts,
        clearProductsRes,
        updateProducts,
        page,
        setPage,
        productsList,
        totalCount,
        currentCount,
        totalPages,
        setProductsList,
    } = useProducts({
        lang: supportedLanguage,
        store: storeCode,
        queryCategories,
    });

    useEffect(() => {
        return () => {
            removeStoreData();
            clearProductsRes();
        };
    }, []);

    useEffect(() => {
        if (!storeDataRes) return;
        setStore({ ...storeDataRes.data, ...STORES_DATA.find(el => el.code === storeCode) });
    }, [storeDataRes]);

    useEffect(() => {
        setSupportedLanguage(
            store?.supportedLanguages?.find(el => el.code === lang.code) ? { code: lang.code } : { code: 'en' }
        );
    }, [lang]);

    const handleCategoriesQuery = (data, checked, root, rootID) => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
        if (root) {
            if (checked) {
                if (page > 0) {
                    setPage(_ => 0);
                    setQueryCategories(queryCategories.filter(el => !data.find(item => el !== item)));
                    return;
                }
                if (page === 0) {
                    setQueryCategories(queryCategories.filter(el => !data.find(item => el !== item)));
                    return;
                }
                return;
            }
            if (!checked) {
                if (!queryCategories.length && page > 0) {
                    setPage(_ => 0);
                    setQueryCategories(data);
                    return;
                }
                if (!queryCategories.length && page === 0) {
                    setQueryCategories(data);
                    return;
                }
                if (page > 0) {
                    setPage(_ => 0);
                    setQueryCategories([...queryCategories, ...data]);
                    return;
                }
                if (page === 0) {
                    setQueryCategories([...queryCategories, ...data]);
                    return;
                }
                return;
            }
        }
        if (!root) {
            if (checked) {
                if (page > 0) {
                    setPage(_ => 0);
                    setQueryCategories(queryCategories.filter(el => el !== data && el !== rootID));
                    return;
                }
                if (page === 0) {
                    setQueryCategories(queryCategories.filter(el => el !== data && el !== rootID));
                    return;
                }
                return;
            }
            if (!checked) {
                if (!queryCategories.length && page > 0) {
                    setPage(_ => 0);
                    setQueryCategories([data]);
                    return;
                }
                if (!queryCategories.length && page === 0) {
                    setQueryCategories([data]);
                    return;
                }
                if (page > 0) {
                    setPage(_ => 0);
                    setQueryCategories([...queryCategories, data]);
                    return;
                }
                if (page === 0) {
                    setQueryCategories([...queryCategories, data]);
                    return;
                }
                return;
            }
            return;
        }
    };

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
                withCart={store?.additionalStoreSettings?.cart}
                withFavorites={store?.additionalStoreSettings?.favorites}
                withContacts={store?.mainStoreSettings?.contacts}
                logo={store?.logo?.path}
                storeHeaderName={store?.name}
                setOpenModalType={setOpenModalType}
                openModalType={openModalType}
            />
            <Box
                px={appXPadding}
                pt={1}
                sx={{ mt: `${headerHeight + instrumentalBarHeight}px`, mb: `${footerHeight}px` }}
            >
                <Outlet
                    context={{
                        lang: lang?.code,
                        string: currentLanguage.string as string,
                        store,
                        categoriesList,
                        productsList: productsList,
                        setProductsList: setProductsList,
                        loadProducts: loadProducts,
                        loadMoreProducts: loadMoreProducts,
                        updateProducts: updateProducts,
                        scrollPosition: scrollPosition,
                        setScrollPosition: setScrollPosition,
                        instrumentalBarHeight: instrumentalBarHeight,
                        headerHeight: headerHeight,
                        footerHeight: footerHeight,
                        appXPadding: appXPadding,
                        currentCount: currentCount,
                        totalCount: totalCount,
                        totalPages: totalPages,
                        setPage: setPage,
                        page: page,
                        auth: auth,
                        queryCategories: queryCategories,
                        setQueryCategories: setQueryCategories,
                        handleCategoriesQuery: handleCategoriesQuery,
                        setOpenModalType: setOpenModalType,
                        openModalType: openModalType,
                        contacts: store?.contacts,
                    }}
                />
            </Box>
            <Modals
                string={currentLanguage.string as string}
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
                headerHeight={headerHeight}
            />
        </Box>
    );
}
