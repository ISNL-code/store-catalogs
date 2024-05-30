import { useCallback, useMemo, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import mainTheme from 'theme/mainTheme';
import { STORE_CONFIG } from 'store_constants/stores_config';
import AppRouting from 'AppRouting';
import AppLogic from 'AppLogic';
import { Toaster } from 'react-hot-toast';
import { useDevice } from 'hooks/useDevice';
import LandingModeRouting from 'LandingModeRouting';
import LandingLogic from 'LandingLogic';
import { APP_CONFIG, WEB_MODE_ENUMS } from 'APP_CONFIG';
import HeadLandingHTML from 'layouts/Head-Landing-HTML';
import HeadStoresHTML from 'layouts/Head-Stores-HTML';
import { AppProvider, useAppContext } from 'APP_ContextProvider';

const AppContent = ({ clearCache }) => {
    const { WEB_MODE } = APP_CONFIG;
    const { STORE_CODE } = STORE_CONFIG;
    const {
        auth,
        setAuth,
        lang,
        setLang,
        viewMode,
        setViewMode,
        infoAlert,
        setInfoAlert,
        currentUserData,
        setCurrentUserData,
        isFetchingUser,
        updateUserData,
        userError,
        store,
        setStore,
        storeDataRes,
        loadStore,
        cart,
        favorites,
        currentLanguage,
        userData,
    } = useAppContext();

    const { sx } = useDevice();

    const memoizedSetLang = useCallback(newLang => setLang(newLang), []); // eslint-disable-line
    const memoizedSetViewMode = useCallback(newViewMode => setViewMode(newViewMode), []); // eslint-disable-line
    const memoizedSetAuth = useCallback(newAuth => setAuth(newAuth), []); // eslint-disable-line
    const memoizedSetCurrentUserData = useCallback(newData => setCurrentUserData(newData), []); // eslint-disable-line
    const memoizedSetInfoAlert = useCallback(newInfo => setInfoAlert(newInfo), []); // eslint-disable-line

    useEffect(() => {
        clearCache();
    }, [clearCache]);

    const memoizedAppLogic = useMemo(
        () => ({
            setAuth,
            updateUserData,
            setCurrentUserData,
            lang,
            setLang,
            infoAlert,
            setInfoAlert,
            viewMode,
            setViewMode,
            storeDataRes,
            setStore,
            loadStore,
            userData,
        }),
        // eslint-disable-next-line
        [
            setAuth,
            updateUserData,
            setCurrentUserData,
            lang,
            infoAlert,
            viewMode,
            storeDataRes,
            setStore,
            loadStore,
            userData,
        ]
    );

    if (WEB_MODE === WEB_MODE_ENUMS.STORE_MODE) {
        AppLogic(memoizedAppLogic);

        if (auth === null || !STORE_CODE) return <></>;
    }

    if (WEB_MODE === WEB_MODE_ENUMS.LANDING_MODE) {
        LandingLogic();
    }

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{ style: { width: '100vw', maxWidth: sx ? '100vw' : '' }, duration: 3000 }}
            />

            <ThemeProvider theme={mainTheme}>
                {WEB_MODE === WEB_MODE_ENUMS.LANDING_MODE && (
                    <>
                        <HeadLandingHTML />
                        <LandingModeRouting lang={lang} setLang={memoizedSetLang} currentLanguage={currentLanguage} />
                    </>
                )}
                {WEB_MODE === WEB_MODE_ENUMS.STORE_MODE && (
                    <>
                        <HeadStoresHTML />
                        <AppRouting
                            auth={auth}
                            setAuth={memoizedSetAuth}
                            lang={lang}
                            setLang={memoizedSetLang}
                            currentUserData={currentUserData}
                            isFetchingUser={isFetchingUser}
                            updateUserData={updateUserData}
                            setCurrentUserData={memoizedSetCurrentUserData}
                            userError={userError}
                            viewMode={viewMode}
                            setViewMode={memoizedSetViewMode}
                            infoAlert={infoAlert}
                            setInfoAlert={memoizedSetInfoAlert}
                            store={store}
                            favorites={favorites}
                            cart={cart}
                            currentLanguage={currentLanguage}
                        />
                    </>
                )}
            </ThemeProvider>
        </>
    );
};

const App = ({ clearCache }) => {
    return (
        <AppProvider>
            <AppContent clearCache={clearCache} />
        </AppProvider>
    );
};

export default App;
