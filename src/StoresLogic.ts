import { useEffect } from 'react';
import { useIsMount } from 'hooks/useIsMount';
import { STORE_CONFIG } from 'store_constants/stores_config';
import axios, { AxiosResponse } from 'axios';
import { STORAGE_KEYS } from 'constants/local_storage_keys';
import { STORES_DATA } from 'dataBase/STORES';
import { StoreInterface, UserDataInterface } from 'types/app_models';
import { DEFAULT_VALUES } from 'defaultData/default';
import { ViewModeType } from 'store_constants/types';
import { Store_Data_Response_Interface } from 'types/response_models';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';

interface Props {
    lang: string;
    viewMode: ViewModeType | null;
    infoAlert: { ws_info: boolean } | null;
    storeDataRes?: AxiosResponse<Store_Data_Response_Interface, any>;
    setCurrentStoreData: (newData: StoreInterface) => void;
    isStoreLoading: boolean;
    setViewMode: (newViewMode: ViewModeType) => void;
    setInfoAlert: (newInfo: { ws_info: boolean }) => void;
    setAuth: (newAuth: boolean) => void;
    setLang: (newLang: string) => void;
    userData: {
        currentUserData: UserDataInterface | null;
        isFetchingUser: boolean;
        setCurrentUserData: (newData: UserDataInterface) => void;
        fetchUserData: <TPageData>(
            options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
        ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
        userError: any;
    };
}

const StoresLogic = ({
    setAuth,
    userData,
    lang,
    setLang,
    infoAlert,
    setInfoAlert,
    viewMode,
    setViewMode,
    storeDataRes,
    setCurrentStoreData,
    isStoreLoading,
}: Props) => {
    const mount = useIsMount();
    const { APP_LANGUAGE, USER_OPTIONS, STORE_NAME } = STORE_CONFIG;
    const { VIEW_MODE } = USER_OPTIONS;

    // visit alert
    useEffect(() => {
        if (window.location.origin.includes('localhost')) return;
        try {
            const token = '6904212535:AAGvPEjkJds0aayd-oD1YVMbhLKeKt72yaE';
            const chatId = '480774886'; // Узнайте ваш Chat ID, написав своему боту /myid
            const url = `https://api.telegram.org/bot${token}/sendMessage`;

            axios
                .get('https://ipapi.co/json/')
                .then(response => {
                    const userCountry = response.data.country_name;
                    const userCity = response.data.city;

                    axios.post(url, {
                        chat_id: chatId,
                        text: `${STORE_NAME} ВХОД ${userCountry}/${userCity}`,
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }

        return;
    }, []); // eslint-disable-line

    // authorization
    const token = localStorage.getItem(STORAGE_KEYS?.ACCESS_TOKEN_KEY);
    useEffect(() => {
        if (token) {
            //нужна адекватная проверка на валидность токена и рефреш
            userData.fetchUserData().then(res => {
                if (res.status === 'error') {
                    setAuth(false);
                    localStorage.removeItem(STORAGE_KEYS?.ACCESS_TOKEN_KEY);
                } else {
                    setAuth(true);
                    userData.setCurrentUserData(res?.data?.data);
                }
            });
        } else {
            setAuth(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    // set app user lang
    useEffect(() => {
        const getLang = localStorage.getItem(STORAGE_KEYS?.LANGUAGE_KEY);

        if (!getLang) {
            setLang(APP_LANGUAGE);
            localStorage.setItem(STORAGE_KEYS?.LANGUAGE_KEY, JSON.stringify(APP_LANGUAGE));
        } else {
            const savedLanguage = JSON.parse(getLang);
            setLang(savedLanguage);
        }
    }, []); // eslint-disable-line

    useEffect(() => {
        if (mount) return;
        localStorage.setItem(STORAGE_KEYS?.LANGUAGE_KEY, JSON.stringify(lang));
    }, [lang, mount]); // eslint-disable-line

    // set app user view mode of catalog list
    useEffect(() => {
        const getViewMode: any = localStorage.getItem(STORAGE_KEYS?.VIEW_MODE_KEY);

        if (!getViewMode || (JSON.parse(getViewMode) !== 'card' && JSON.parse(getViewMode) !== 'grid_m')) {
            setViewMode(VIEW_MODE);
            localStorage.setItem(STORAGE_KEYS?.VIEW_MODE_KEY, JSON.stringify(VIEW_MODE));
        } else {
            const savedViewMode = JSON.parse(getViewMode);
            setViewMode(savedViewMode);
        }
    }, []); // eslint-disable-line

    useEffect(() => {
        if (mount) return;
        localStorage.setItem(STORAGE_KEYS?.VIEW_MODE_KEY, JSON.stringify(viewMode));
    }, [viewMode, mount]); // eslint-disable-line

    // set app user information alerts
    useEffect(() => {
        const infoAlert = { ws_info: true };
        setInfoAlert(infoAlert);
        localStorage.setItem(STORAGE_KEYS?.INFO_ALERT_KEY, JSON.stringify(infoAlert));
    }, []); // eslint-disable-line

    useEffect(() => {
        if (mount) return;
        localStorage.setItem(STORAGE_KEYS?.INFO_ALERT_KEY, JSON.stringify(infoAlert));
    }, [infoAlert, mount]); // eslint-disable-line

    useEffect(() => {
        if (!storeDataRes || isStoreLoading) return;

        const store = storeDataRes?.data;
        const store_db = STORES_DATA.find(el => el.code === store?.code);

        const storeData: StoreInterface = {
            currency: store?.currency || DEFAULT_VALUES?.currency,
            logo: { path: store?.logo?.path || DEFAULT_VALUES?.logo },
            supportedLanguages: store?.supportedLanguages,
            code: store?.code,
            name: store?.name,
            managers: store_db?.managers || [],
        };

        setCurrentStoreData(storeData); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeDataRes]);
};

export default StoresLogic;
