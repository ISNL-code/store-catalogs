import { useEffect } from 'react';
import { useIsMount } from 'hooks/useIsMount';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { AxiosResponse } from 'axios';
import { STORAGE_KEYS } from 'constants/local_storage_keys';
import { STORES_DATA } from 'dataBase/STORES';
import { StoreInterface, UserDataInterface } from 'types/app_models';
import { DEFAULT_VALUES } from 'defaultData/default';
import { ViewModeType } from 'store_constants/types';
import { Store_Data_Response_Interface } from 'types/response_models';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import { getStorageItem, setStorageItem } from 'utils/storageUtils';
import { telegramSender } from 'utils/telegramSender';

interface Props {
    lang: string;
    auth: boolean | null;
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
    apiToken: string | null;
    setApiToken: (token: string | null) => void;
}

const StoresLogic = ({
    setAuth,
    auth,
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
    setApiToken,
    apiToken,
}: Props) => {
    const mount = useIsMount();
    const { APP_LANGUAGE, USER_OPTIONS } = STORE_CONFIG;
    const { VIEW_MODE } = USER_OPTIONS;

    // visit alert
    useEffect(() => {
        telegramSender({ action: `VISIT-APP` });
        return;
    }, []); // eslint-disable-line

    // authorization
    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const storedItems = await getStorageItem(STORAGE_KEYS?.ACCESS_TOKEN_KEY);

                if (storedItems) {
                    userData
                        .fetchUserData()
                        .then(res => {
                            if (res.status === 'error') {
                                setAuth(false);
                            } else {
                                console.log('AUTH1');
                                setAuth(true);
                                setApiToken(storedItems);
                                userData.setCurrentUserData(res?.data?.data);
                            }
                        })
                        .catch(err => {
                            setAuth(false);
                            console.log(err);
                        });
                } else {
                    setAuth(false);
                }
            } catch (error) {
                console.error('Error getting storage item:', error);
            }
        };

        fetchAuth();
    }, []); // eslint-disable-line

    useEffect(() => {
        if (!auth) return;
        const fetchAuth = async () => {
            try {
                const storedItems = await getStorageItem(STORAGE_KEYS?.ACCESS_TOKEN_KEY);

                if (storedItems || apiToken) {
                    userData
                        .fetchUserData()
                        .then(res => {
                            if (res.status === 'error') {
                                setAuth(false);
                            } else {
                                userData.setCurrentUserData(res?.data?.data);
                            }
                        })
                        .catch(err => {
                            setAuth(false);
                            console.log(err);
                        });
                } else {
                    setAuth(false);
                }
            } catch (error) {
                console.error('Error getting storage item:', error);
            }
        };

        fetchAuth();
    }, [auth]); // eslint-disable-line

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
    }, []); // eslint-disable-line

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
    }, []); // eslint-disable-line

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
