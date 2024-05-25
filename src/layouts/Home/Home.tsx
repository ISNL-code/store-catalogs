import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useGetLanguage } from 'hooks/useGetLanguage';
import { useDevice } from 'hooks/useDevice';
import { useEffect } from 'react';
import HomeHeader from './HomeHeader';
import HomeMobileMenu from './HomeMobileMenu';
import { HomeContextInterface } from 'types';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { useFormsApp } from 'layouts/hooks/useFormsApp';
import DialogApp from 'layouts/DialogApp';
import { HOME_ROUTE, ROUTES } from 'constants/routes';
import Loader from 'components/atoms/Loader/Loader';

const OutletContainer = ({ context }: { context: HomeContextInterface }) => {
    return <Outlet context={context} />;
};

export default function Home({ lang, setLang, auth, setAuth, userData, store, favorites, cart }) {
    const { STORE_CODE, STORE_NAME, OPTIONS } = STORE_CONFIG;
    const { PLAN_OPTIONS } = OPTIONS;
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
    const { activeDialogWindow, handleOpenDialog, handleSetDialogState, dialogState } = useFormsApp();

    useEffect(() => {
        if (STORE_CODE !== storeCode) {
            navigate(HOME_ROUTE?.root(STORE_CODE));
        }
    }, [storeCode, STORE_CODE, store]); // eslint-disable-line

    if (!store) return <Loader type="circular" />;

    return (
        <Box display="flex" flexDirection="column" justifyContent="space-between">
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
                cart={cart}
                favorites={favorites}
            />

            <Box className="HomeBody" mt={`${HEADER_HEIGHT + INSTRUMENTAL_BAR_HEIGHT}px`} sx={{ flexGrow: 1 }}>
                <OutletContainer
                    context={{
                        //main data
                        lang: lang?.code,
                        string: currentLanguage?.string,
                        handleOpenDialog,
                        //user data
                        auth: auth,
                        currentUserData: userData.currentUserData,
                        loadingUserData: userData.isFetchingUser,
                        updateUserData: userData.updateUserData,
                        setCurrentUserData: userData.setCurrentUserData,
                        userDataError: userData.userError,
                        handleSetDialogState,
                        dialogState,

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
                withCart={PLAN_OPTIONS?.cart}
                withFavorites={PLAN_OPTIONS?.favorites}
                cart={cart}
                favorites={favorites}
            />
            <DialogApp
                location={ROUTES?.HOME}
                string={currentLanguage?.string}
                activeDialogWindow={activeDialogWindow}
                handleOpenDialog={handleOpenDialog}
                setAuth={setAuth}
                dialogState={dialogState}
            />
        </Box>
    );
}
