import { ThemeProvider } from '@mui/material';
import { useState } from 'react';
import mainTheme from 'theme/mainTheme';
import { useUserApi } from 'api/useUserApi';
import { StoreInterface, UserDataInterface } from 'types';
import { STORE_CONFIG } from 'store_constants/stores_config';
import Head_Stores_HTML from 'layouts/Head_Stores_HTML';
import { ViewModeType } from 'store_constants/types';
import AppRouting from 'AppRouting';
import AppLogic from 'AppLogic';
import { useStoresApi } from 'api/useStoresApi';
import { useAddToCart } from 'layouts/hooks/useAddToCart';
import { useAddToFavorites } from 'layouts/hooks/useAddToFavorites';
import { Toaster } from 'react-hot-toast';
import { useDevice } from 'hooks/useDevice';
import LandingModeRouting from 'LandingModeRouting';
import LandingLogic from 'LandingLogic';
import { APP_CONFIG, WEB_MODE_ENUMS } from 'APP_CONFIG';
import Head_Landing_HTML from 'layouts/Head_Landing_HTML';

const App = () => {
    const { WEB_MODE } = APP_CONFIG;
    const { STORE_CODE, APP_LANGUAGE } = STORE_CONFIG;
    const [lang, setLang] = useState<string>(APP_LANGUAGE);
    const [viewMode, setViewMode] = useState<ViewModeType | null>(null);
    const [auth, setAuth] = useState<boolean | null>(null);
    const [currentUserData, setCurrentUserData] = useState<UserDataInterface | any>(null);
    const [infoAlert, setInfoAlert] = useState<{ ws_info: boolean } | null>(null);
    const [store, setStore] = useState<StoreInterface | null>(null);
    const { sx } = useDevice();

    const {
        data: userData,
        refetch: updateUserData,
        isFetching: isFetchingUser,
        error: userError,
    } = useUserApi().useGetUserData({
        storeCode: STORE_CODE,
    });

    const { data: storeDataRes, isFetching: loadStore } = useStoresApi().useGetStoreByCode({
        code: STORE_CODE,
    });

    const cart = useAddToCart({ loadingUser: isFetchingUser });
    const favorites = useAddToFavorites({ loadingUser: isFetchingUser });

    if (WEB_MODE === WEB_MODE_ENUMS?.STORE_MODE) {
        AppLogic({
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
        });

        if (auth === null || !STORE_CODE) return <></>;
    }

    if (WEB_MODE === WEB_MODE_ENUMS?.LANDING_MODE) {
        LandingLogic();
    }

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{ style: { width: '100vw', maxWidth: sx ? '100vw' : '' }, duration: 3000 }}
            />

            <ThemeProvider theme={mainTheme}>
                {WEB_MODE === WEB_MODE_ENUMS?.LANDING_MODE && (
                    <>
                        <Head_Landing_HTML />
                        <LandingModeRouting lang={lang} setLang={setLang} />
                    </>
                )}
                {WEB_MODE === WEB_MODE_ENUMS?.STORE_MODE && (
                    <>
                        <Head_Stores_HTML />
                        <AppRouting
                            auth={auth}
                            setAuth={setAuth}
                            lang={lang}
                            setLang={setLang}
                            currentUserData={currentUserData}
                            isFetchingUser={isFetchingUser}
                            updateUserData={updateUserData}
                            setCurrentUserData={setCurrentUserData}
                            userError={userError}
                            viewMode={viewMode}
                            setViewMode={setViewMode}
                            infoAlert={infoAlert}
                            setInfoAlert={setInfoAlert}
                            store={store}
                            favorites={favorites}
                            cart={cart}
                        />
                    </>
                )}
            </ThemeProvider>
        </>
    );
};

export default App;
