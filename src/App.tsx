import { ThemeProvider } from '@mui/material';
import { useState } from 'react';
import mainTheme from 'theme/mainTheme';
import { useUserApi } from 'api/useUserApi';
import { StoreInterface, UserDataInterface } from 'types';
import { STORE_CONFIG } from 'store_constants/stores_config';
import Head from 'layouts/Head';
import { ViewModeType } from 'store_constants/types';
import AppRouting from 'AppRouting';
import AppLogic from 'AppLogic';
import { useStoresApi } from 'api/useStoresApi';
import { useAddToCart } from 'layouts/hooks/useAddToCart';
import { useAddToFavorites } from 'layouts/hooks/useAddToFavorites';
import { Toaster } from 'react-hot-toast';

const App = () => {
    const { STORE_CODE, APP_LANGUAGE } = STORE_CONFIG;
    const [lang, setLang] = useState<string>(APP_LANGUAGE);
    const [viewMode, setViewMode] = useState<ViewModeType | null>(null);
    const [auth, setAuth] = useState<boolean | null>(null);
    const [currentUserData, setCurrentUserData] = useState<UserDataInterface | any>(null);
    const [infoAlert, setInfoAlert] = useState<{ ws_info: boolean } | null>(null);
    const [store, setStore] = useState<StoreInterface | null>(null);

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

    return (
        <>
            <Toaster
                toastOptions={{
                    style: { width: '100vw' },
                    duration: 5000,
                }}
                position="top-right"
            />
            <Head />
            <ThemeProvider theme={mainTheme}>
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
            </ThemeProvider>
        </>
    );
};

export default App;
