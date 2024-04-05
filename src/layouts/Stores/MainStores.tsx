import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './StoresHeader ';
// import MobileMenu from './MobileMenu';
import { useGetLanguage } from 'hooks/useGetLanguage';
import { useDevice } from 'hooks/useDevice';
import { useEffect, useState } from 'react';
import Modals from 'layouts/Modals';
import { StoreInterface } from 'types';
import { useStoresApi } from 'api/useStoresApi';
import { STORES_DATA } from 'dataBase/STORES';

export default function MainStores({ lang, setLang, auth, setAuth }) {
    const [openModalType, setOpenModalType] = useState<string | null>(null);
    const [storeToApprove, setStoreToApprove] = useState<string | null>(null);
    const [favoritesStores, setFavoriteStores] = useState<string[] | null>(null);
    const { sx, l, xxs } = useDevice();
    const { currentLanguage } = useGetLanguage({ lang: lang?.code });
    const [sortedStores, setSortedStores] = useState<string>('');
    const [filteredByTypeStores, setFilteredByTypeStores] = useState<string[] | []>([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const headerHeight = xxs ? 50 : 65;
    const footerHeight = sx ? 70 : 0;
    const instrumentalBarHeight = 36;
    const appXPadding = l ? 2 : 4;
    const [storesList, setStoresList] = useState<StoreInterface[] | null>(null);
    const { data: storesDataRes, isFetching: loadStores } = useStoresApi().useGetAllStores();

    const { refetch: updateFavoritesRes, isFetching: loadFavoritesStores } = useStoresApi().useGetAllFavoritesStores({
        auth,
    });

    useEffect(() => {
        if (!auth) return setFavoriteStores(null);

        updateFavoritesRes().then(res => {
            if (!res) return;

            setFavoriteStores([
                ...res?.data?.data.map(item => {
                    const addStoreData = STORES_DATA?.find(el => el.code === item.code);
                    const description =
                        addStoreData?.descriptions.find(el => el.language === lang.code) ||
                        addStoreData?.descriptions.find(el => el.language === 'en');
                    return {
                        ...item,
                        ...addStoreData,
                        description,
                    };
                }),
            ]);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth, lang]);

    useEffect(() => {
        if (!storesDataRes) return;
        setStoresList(
            storesDataRes?.data
                ?.filter(el => el.code !== 'DEFAULT')
                .map(item => {
                    const addStoreData = STORES_DATA?.find(el => el.code === item.code);
                    const description =
                        addStoreData?.descriptions.find(el => el.language === lang.code) ||
                        addStoreData?.descriptions.find(el => el.language === 'en');
                    return {
                        ...item,
                        ...addStoreData,
                        description,
                    };
                })
        );
    }, [storesDataRes, lang]);

    return (
        <Box
            sx={{
                overFlow: 'hidden',
            }}
        >
            <CssBaseline />

            <Header
                headerHeight={headerHeight}
                appXPadding={appXPadding}
                string={currentLanguage?.string}
                lang={lang}
                setLang={setLang}
            />
            <Box sx={{ mt: `${headerHeight}px` }}>
                <Outlet
                    context={{
                        lang: lang?.code,
                        string: currentLanguage.string as string,
                        sortedStores: sortedStores,
                        scrollPosition: scrollPosition,
                        setScrollPosition: setScrollPosition,
                        instrumentalBarHeight: instrumentalBarHeight,
                        headerHeight: headerHeight,
                        footerHeight: footerHeight,
                        appXPadding: appXPadding,
                        setSortedStores: setSortedStores,
                        auth: auth,
                        setFilteredByTypeStores: setFilteredByTypeStores,
                        filteredByTypeStores: filteredByTypeStores,
                        setOpenModalType,
                        openModalType: openModalType,
                        setStoreToApprove: setStoreToApprove,
                        favoritesStores,
                        setFavoriteStores,
                        storesList,
                        updateFavoritesRes,
                        loadStores,
                        loadFavoritesStores,
                    }}
                />
            </Box>
            <Modals
                string={currentLanguage.string as string}
                setAuth={setAuth}
                lang={lang?.code}
                openModalType={openModalType}
                setOpenModalType={setOpenModalType}
                storeToApprove={storeToApprove}
            />
            {/* <MobileMenu
                appXPadding={appXPadding}
                string={currentLanguage?.string}
                auth={auth}
                isShown={!!sx}
                setSortedStores={setSortedStores}
                openModalType={openModalType}
                setOpenModalType={setOpenModalType}
                favoritesCount={favoritesStores?.length}
                headerHeight={headerHeight}
            /> */}
        </Box>
    );
}
