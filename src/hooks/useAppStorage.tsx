import { useState, useCallback } from 'react';
import { StoreInterface, UserDataInterface } from 'types/app_models';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { ViewModeType } from 'store_constants/types';

export interface AppStorageInterface {
    auth: boolean | null;
    setAuth: (newAuth: boolean) => void;
    apiToken: string | null;
    setApiToken: (token: string | null) => void;
    lang: string;
    setLang: (newLang: string) => void;
    viewMode: ViewModeType | null;
    setViewMode: (newViewMode: ViewModeType) => void;
    infoAlert: { ws_info: boolean } | null;
    setInfoAlert: (newInfo: { ws_info: boolean }) => void;
    currentStoreData: StoreInterface | null;
    setCurrentStoreData: (newData: StoreInterface) => void;
    currentUserData: UserDataInterface | null;
    setCurrentUserData: (newData: UserDataInterface) => void;
}
export const useAppStorage = (): AppStorageInterface => {
    const { APP_LANGUAGE } = STORE_CONFIG;
    const [lang, setLang] = useState<string>(APP_LANGUAGE);
    const [viewMode, setViewMode] = useState<ViewModeType | null>(null);
    const [auth, setAuth] = useState<boolean | null>(null);
    const [apiToken, setApiToken] = useState<string | null>(null);
    const [infoAlert, setInfoAlert] = useState<{ ws_info: boolean } | null>(null);
    const [currentUserData, setCurrentUserData] = useState<UserDataInterface | any>(null);
    const [currentStoreData, setCurrentStoreData] = useState<StoreInterface | null>(null);

    const memoizedSetLang = useCallback((newLang: string) => setLang(newLang), []); // eslint-disable-line
    const memoizedSetViewMode = useCallback((newViewMode: ViewModeType) => setViewMode(newViewMode), []); // eslint-disable-line
    const memoizedSetAuth = useCallback((newAuth: boolean) => setAuth(newAuth), []); // eslint-disable-line
    const memoizedSetApiToken = useCallback((token: string | null) => setApiToken(token), []); // eslint-disable-line
    const memoizedSetCurrentUserData = useCallback((newData: UserDataInterface) => setCurrentUserData(newData), []); // eslint-disable-line
    const memoizedSetInfoAlert = useCallback((newInfo: { ws_info: boolean }) => setInfoAlert(newInfo), []); // eslint-disable-line
    const memoizedSetCurrentStoreData = useCallback((newData: StoreInterface) => setCurrentStoreData(newData), []); // eslint-disable-line

    return {
        auth,
        setAuth: memoizedSetAuth,
        apiToken,
        setApiToken: memoizedSetApiToken,
        lang,
        setLang: memoizedSetLang,
        viewMode,
        setViewMode: memoizedSetViewMode,
        infoAlert,
        setInfoAlert: memoizedSetInfoAlert,
        currentStoreData,
        setCurrentStoreData: memoizedSetCurrentStoreData,
        currentUserData,
        setCurrentUserData: memoizedSetCurrentUserData,
    };
};
