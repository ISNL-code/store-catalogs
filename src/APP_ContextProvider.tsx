import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { useUserApi } from 'api/useUserApi';
import { useStoresApi } from 'api/useStoresApi';
import { useAddToCart } from 'layouts/hooks/useAddToCart';
import { useAddToFavorites } from 'layouts/hooks/useAddToFavorites';
import { useGetLanguage } from 'hooks/useGetLanguage';
import useImageStorage from 'layouts/hooks/useImageStorage';
import { StoreInterface, UserDataInterface } from 'types/app_models';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { ViewModeType } from 'store_constants/types';

interface AppContextProps {
    auth: boolean | null;
    setAuth: (auth: boolean | null) => void;
    lang: string;
    setLang: (lang: string) => void;
    viewMode: ViewModeType | null;
    setViewMode: (viewMode: ViewModeType | null) => void;
    infoAlert: { ws_info: boolean } | null;
    setInfoAlert: (infoAlert: { ws_info: boolean } | null) => void;
    currentUserData: UserDataInterface | any;
    setCurrentUserData: (data: UserDataInterface | any) => void;
    updateUserData: () => void;
    store: StoreInterface | null;
    setStore: (store: StoreInterface | null) => void;
    isFetchingUser: boolean;
    userError: any;
    storeDataRes: any;
    loadStore: boolean;
    cart: any;
    favorites: any;
    currentLanguage: any;
    handleSaveImage: any;
    loadedImages: any;
    userData: any;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { STORE_CODE, APP_LANGUAGE, STORE_NAME } = STORE_CONFIG;
    const [lang, setLang] = useState<string>(APP_LANGUAGE);
    const [viewMode, setViewMode] = useState<ViewModeType | null>(null);
    const [auth, setAuth] = useState<boolean | null>(null);
    const [currentUserData, setCurrentUserData] = useState<UserDataInterface | any>(null);
    const [infoAlert, setInfoAlert] = useState<{ ws_info: boolean } | null>(null);
    const [store, setStore] = useState<StoreInterface | null>(null);
    const { handleSaveImage, loadedImages } = useImageStorage();

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

    const { currentLanguage } = useGetLanguage({ lang, storeName: STORE_NAME });
    const cart = useAddToCart({ loadingUser: isFetchingUser });
    const favorites = useAddToFavorites({ loadingUser: isFetchingUser });

    const value = useMemo(
        () => ({
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
            updateUserData,
            store,
            setStore,
            isFetchingUser,
            userError,
            storeDataRes,
            loadStore,
            cart,
            favorites,
            currentLanguage,
            handleSaveImage,
            loadedImages,
            userData,
        }),
        // eslint-disable-next-line
        [
            auth,
            lang,
            viewMode,
            infoAlert,
            currentUserData,
            store,
            isFetchingUser,
            userError,
            storeDataRes,
            loadStore,
            cart,
            favorites,
            currentLanguage,
            handleSaveImage,
            loadedImages,
            userData,
        ]
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
