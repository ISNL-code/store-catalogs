import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useGetLanguage } from 'hooks/useGetLanguage';
import { useDevice } from 'hooks/useDevice';
import { useEffect, useState } from 'react';
import HomeHeader from './HomeHeader';
import HomeMobileMenu from './HomeMobileMenu';
import { HomeContextInterface, StoreInterface } from 'types';
import { useStoresApi } from 'api/useStoresApi';
import { STORES_DATA } from 'dataBase/STORES';
import { STORE_CONFIG } from 'constants/stores_config';
import Modals from 'layouts/Modals';

export default function Home({ lang, setLang, auth, setAuth, userData }) {
    const { STORE_CODE, STORE_NAME } = STORE_CONFIG;
    const { sx } = useDevice();
    const INSTRUMENTAL_BAR_HEIGHT = 36;
    const INSTRUMENTAL_BAR_PADDINGS = sx ? 2 : 4;
    const HEADER_HEIGHT = 50;
    const FOOTER_MENU_HEIGHT = sx ? '70px' : 0;
    const HEADER_PADDINGS = sx ? 2 : 4;
    const BODY_PADDINGS = sx ? 0 : 4;
    const FOOTER_PADDINGS = sx ? 2 : 4;
    const [openModalType, setOpenModalType] = useState<string | null>(null);
    const { currentLanguage } = useGetLanguage({ lang, storeName: STORE_NAME });

    const [store, setStore] = useState<StoreInterface | null>(null);

    const { data: storeDataRes, isFetching: loadStore } = useStoresApi().useGetStoreByCode({
        code: STORE_CODE,
    });

    useEffect(() => {
        if (!storeDataRes || loadStore) return;
        setStore({ ...STORES_DATA.find(el => el.code === STORE_CODE), ...storeDataRes.data });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeDataRes]);

    if (!store) return <></>;

    return (
        <Box>
            <CssBaseline />

            <HomeHeader
                headerHeight={HEADER_HEIGHT}
                appXPadding={HEADER_PADDINGS}
                string={currentLanguage?.string}
                lang={lang}
                setLang={setLang}
                setOpenModalType={setOpenModalType}
                logo={store?.logo?.path}
                storeHeaderName={store?.name}
                storeCode={store?.code}
                store={store}
                openModalType={openModalType}
                auth={auth}
                user={userData}
            />

            <Box className="HomeBody" mt={`${HEADER_HEIGHT + INSTRUMENTAL_BAR_HEIGHT}px`} flexGrow={1}>
                <Outlet
                    context={
                        {
                            //main data
                            lang: lang?.code,
                            string: currentLanguage?.string,
                            openModalType: openModalType,
                            setOpenModalType: setOpenModalType,

                            //css data
                            instrumentalBarHeight: INSTRUMENTAL_BAR_HEIGHT,
                            instrumentalBarPadding: INSTRUMENTAL_BAR_PADDINGS,
                            headerHeight: HEADER_HEIGHT,
                            footerMenuHeight: FOOTER_MENU_HEIGHT,
                            appXPadding: BODY_PADDINGS,

                            //store data
                            store,
                        } as HomeContextInterface
                    }
                />
            </Box>
            <HomeMobileMenu
                menuHeight={FOOTER_MENU_HEIGHT}
                appXPadding={FOOTER_PADDINGS}
                isShown={!!sx}
                string={currentLanguage?.string}
                storeHeaderName={store?.name}
                storeCode={store?.code}
                auth={auth}
                headerHeight={HEADER_HEIGHT}
                store={store}
                setOpenModalType={setOpenModalType}
                openModalType={openModalType}
                user={userData}
            />
            <Modals
                string={currentLanguage?.string as string}
                setAuth={setAuth}
                lang={lang}
                openModalType={openModalType}
                setOpenModalType={setOpenModalType}
            />
        </Box>
    );
}
