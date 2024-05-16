import { Outlet, useNavigate, useParams } from 'react-router-dom';
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
import { STORE_CONFIG } from 'store_constants/stores_config';
import { useFormsApp } from 'layouts/hooks/useFormsApp';
import DialogApp from 'layouts/DialogApp';
import { HOME_ROUTE } from 'constants/routes';

const OutletContainer = ({ context }: { context: HomeContextInterface }) => {
    return <Outlet context={context} />;
};

export default function Home({ lang, setLang, auth, setAuth, userData }) {
    const { STORE_CODE, STORE_NAME } = STORE_CONFIG;
    const { storeCode } = useParams();
    const navigate = useNavigate();
    const { sx } = useDevice();
    const INSTRUMENTAL_BAR_HEIGHT = 36;
    const INSTRUMENTAL_BAR_PADDINGS = sx ? 2 : 4;
    const HEADER_HEIGHT = 50;
    const FOOTER_MENU_HEIGHT = sx ? '65px' : '0';
    const HEADER_PADDINGS = sx ? 2 : 4;
    const BODY_PADDINGS = sx ? 0 : 4;
    const FOOTER_PADDINGS = sx ? 2 : 4;
    const { currentLanguage } = useGetLanguage({ lang, storeName: STORE_NAME });
    const { activeDialogWindow, handleOpenDialog } = useFormsApp();
    const [store, setStore] = useState<StoreInterface | null>(null);
    const { data: storeDataRes, isFetching: loadStore } = useStoresApi().useGetStoreByCode({
        code: STORE_CODE,
    });

    useEffect(() => {
        if (storeCode) {
            if (STORE_CODE !== storeCode) navigate(HOME_ROUTE?.root(STORE_CODE));
        }
    }, [storeCode, STORE_CODE]); // eslint-disable-line

    useEffect(() => {
        if (!storeDataRes || loadStore) return;
        setStore({ ...STORES_DATA.find(el => el.code === STORE_CODE), ...storeDataRes.data });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeDataRes]);

    useEffect(() => {
        navigate(HOME_ROUTE?.root(STORE_CODE)); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store]);

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
                logo={store?.logo?.path}
                storeHeaderName={store?.name}
                store={store}
                auth={auth}
                user={userData}
                handleOpenDialog={handleOpenDialog}
            />

            <Box className="HomeBody" mt={`${HEADER_HEIGHT + INSTRUMENTAL_BAR_HEIGHT}px`} flexGrow={1}>
                <OutletContainer
                    context={{
                        //main data
                        lang: lang?.code,
                        string: currentLanguage?.string,
                        handleOpenDialog,
                        //user data
                        auth: auth,
                        currentUserData: userData.currentUserData,
                        loadingUserData: userData.isFetching,
                        updateUserData: userData.updateUserData,
                        setCurrentUserData: userData.setCurrentUserData,
                        //css data
                        instrumentalBarHeight: INSTRUMENTAL_BAR_HEIGHT,
                        instrumentalBarPadding: INSTRUMENTAL_BAR_PADDINGS,
                        headerHeight: HEADER_HEIGHT,
                        footerMenuHeight: FOOTER_MENU_HEIGHT,
                        appXPadding: BODY_PADDINGS,
                        //store data
                        store,
                    }}
                />
            </Box>
            <HomeMobileMenu
                menuHeight={FOOTER_MENU_HEIGHT}
                appXPadding={FOOTER_PADDINGS}
                isShown={!!sx}
                string={currentLanguage?.string}
                auth={auth}
                headerHeight={HEADER_HEIGHT}
                user={userData}
                handleOpenDialog={handleOpenDialog}
            />
            <DialogApp
                location={HOME_ROUTE?.root(STORE_CODE)}
                string={currentLanguage?.string}
                activeDialogWindow={activeDialogWindow}
                handleOpenDialog={handleOpenDialog}
                setAuth={setAuth}
            />
        </Box>
    );
}
