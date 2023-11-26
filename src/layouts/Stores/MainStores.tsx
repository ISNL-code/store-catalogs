import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './StoresHeader ';
import MobileMenu from './MobileMenu';
import { useGetLanguage } from 'hooks/useGetLanguage';
import { useDevice } from 'hooks/useDevice';
import { useEffect, useState } from 'react';
import Modals from 'layouts/Modals';
import { StoreInterface } from 'types';
import { useStoresApi } from 'api/useStoresApi';

export default function MainStores({ lang, setLang, auth, setAuth }) {
    const [openModalType, setOpenModalType] = useState<string | null>(null);
    const [storeToApprove, setStoreToApprove] = useState<string | null>(null);
    const [favoritesStores, setFavoriteStores] = useState<string[] | null>(null);
    const { sx, l } = useDevice();
    const { currentLanguage } = useGetLanguage({ lang: lang?.code });
    const [sortedStores, setSortedStores] = useState<string>('');
    const [filteredStores, setFilteredStores] = useState<string[] | []>([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const headerHeight = 50;
    const footerHeight = sx ? 70 : 0;
    const instrumentalBarHeight = 36;
    const appXPadding = l ? 2 : 4;
    const [storesList, setStoresList] = useState<StoreInterface[] | null>(null);
    const storesData = useStoresApi().useGetStoresList;
    const { data: storesDataRes, isFetching: loadStores } = useStoresApi().useGetAllStores();

    const { refetch: updateFavoritesRes, isFetching: loadFavoritesStores } = useStoresApi().useGetAllFavoritesStores({
        auth,
    });

    useEffect(() => {
        if (!auth) return setFavoriteStores(null);
        console.log('first');
        updateFavoritesRes().then(res => {
            if (!res) return;
            setFavoriteStores([
                ...res?.data?.data.map(el => {
                    return { ...el, ...storesData.find(item => item.code === el.code) };
                }),
            ]);
        });
    }, [auth]);

    useEffect(() => {
        if (!storesDataRes) return;
        setStoresList(
            storesDataRes.data.map((item, index) => {
                return { ...item, ...storesData[index] };
            })
        );
    }, [storesDataRes]);

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
                setSortedStores={setSortedStores}
                auth={auth}
                setOpenModalType={setOpenModalType}
                openModalType={openModalType}
                favoritesCount={favoritesStores?.length}
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
                        sortedStores: sortedStores,
                        scrollPosition: scrollPosition,
                        setScrollPosition: setScrollPosition,
                        instrumentalBarHeight: instrumentalBarHeight,
                        headerHeight: headerHeight,
                        footerHeight: footerHeight,
                        appXPadding: appXPadding,
                        setSortedStores: setSortedStores,
                        auth: auth,
                        setFilteredStores: setFilteredStores,
                        filteredStores: filteredStores,
                        setOpenModalType,
                        openModalType: openModalType,
                        setStoreToApprove: setStoreToApprove,
                        favoritesStores,
                        setFavoriteStores,
                        storesList,
                        updateFavoritesRes,
                        storesData,
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
            <MobileMenu
                appXPadding={appXPadding}
                string={currentLanguage?.string}
                auth={auth}
                isShown={!!sx}
                setSortedStores={setSortedStores}
                openModalType={openModalType}
                setOpenModalType={setOpenModalType}
                favoritesCount={favoritesStores?.length}
                headerHeight={headerHeight}
            />
        </Box>
    );
}
