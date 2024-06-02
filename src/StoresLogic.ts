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
import { getStorageItem, setStorageItem } from 'utils/storageUtils';

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
            const token = 'YOUR_TELEGRAM_BOT_TOKEN';
            const chatId = 'YOUR_CHAT_ID';
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
    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const storedItems = await getStorageItem(STORAGE_KEYS?.ACCESS_TOKEN_KEY);
                if (storedItems) {
                    const res = await userData.fetchUserData();
                    if (res.status === 'error') {
                        setAuth(false);
                    } else {
                        setAuth(true);
                        userData.setCurrentUserData(res?.data?.data);
                    }
                } else {
                    setAuth(false);
                }
            } catch (error) {
                console.error('Error getting storage item:', error);
            }
        };

        fetchAuth();
    }, [setAuth, userData]); // eslint-disable-line

    // set app user lang
    useEffect(() => {
        const fetchLang = async () => {
            try {
                const storedItems = await getStorageItem(STORAGE_KEYS?.LANGUAGE_KEY);
                if (storedItems) {
                    setLang(JSON.parse(storedItems));
                } else {
                    setLang(APP_LANGUAGE);
                    await setStorageItem(STORAGE_KEYS?.LANGUAGE_KEY, JSON.stringify(APP_LANGUAGE));
                }
            } catch (error) {
                console.error('Error getting storage item:', error);
            }
        };

        fetchLang();
    }, [setLang, APP_LANGUAGE]); // eslint-disable-line

    useEffect(() => {
        if (mount) return;
        const updateLang = async () => {
            try {
                await setStorageItem(STORAGE_KEYS?.LANGUAGE_KEY, JSON.stringify(lang));
            } catch (error) {
                console.error('Error setting storage item:', error);
            }
        };

        updateLang();
    }, [lang, mount]); // eslint-disable-line

    // set app user view mode of catalog list
    useEffect(() => {
        const fetchViewMode = async () => {
            try {
                const storedItems = await getStorageItem(STORAGE_KEYS?.VIEW_MODE_KEY);
                if (storedItems) {
                    setViewMode(JSON.parse(storedItems));
                } else {
                    setViewMode(VIEW_MODE);
                    await setStorageItem(STORAGE_KEYS?.VIEW_MODE_KEY, JSON.stringify(VIEW_MODE));
                }
            } catch (error) {
                console.error('Error getting storage item:', error);
            }
        };

        fetchViewMode();
    }, [setViewMode, VIEW_MODE]); // eslint-disable-line

    useEffect(() => {
        if (mount) return;
        const updateViewMode = async () => {
            try {
                await setStorageItem(STORAGE_KEYS?.VIEW_MODE_KEY, JSON.stringify(viewMode));
            } catch (error) {
                console.error('Error setting storage item:', error);
            }
        };

        updateViewMode();
    }, [viewMode, mount]); // eslint-disable-line

    // set app user information alerts
    useEffect(() => {
        const infoAlert = { ws_info: true };
        const setAlert = async () => {
            try {
                setInfoAlert(infoAlert);
                await setStorageItem(STORAGE_KEYS?.INFO_ALERT_KEY, JSON.stringify(infoAlert));
            } catch (error) {
                console.error('Error setting storage item:', error);
            }
        };

        setAlert();
    }, [setInfoAlert]); // eslint-disable-line

    useEffect(() => {
        if (mount) return;
        const updateInfoAlert = async () => {
            try {
                await setStorageItem(STORAGE_KEYS?.INFO_ALERT_KEY, JSON.stringify(infoAlert));
            } catch (error) {
                console.error('Error setting storage item:', error);
            }
        };

        updateInfoAlert();
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
    }, [storeDataRes, isStoreLoading, setCurrentStoreData]);
};

export default StoresLogic;
