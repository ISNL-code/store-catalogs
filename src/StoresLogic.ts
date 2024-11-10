import { useEffect } from 'react';
import { useIsMount } from 'hooks/useIsMount';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { AxiosResponse } from 'axios';
import { STORAGE_KEYS } from 'constants/local_storage_keys';
import { StoreInterface, UserDataInterface } from 'types/app_models';
import { DEFAULT_VALUES } from 'defaultData/default';
import { ViewModeType } from 'store_constants/types';
import { Store_Data_Response_Interface } from 'types/response_models';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import { getStorageItem, setStorageItem } from 'utils/storageUtils';

interface Props {
    lang: string;
    auth: boolean | null;
    viewMode: ViewModeType | null;
    storeDataRes?: AxiosResponse<Store_Data_Response_Interface, any>;
    setCurrentStoreData: (newData: StoreInterface) => void;
    isStoreLoading: boolean;
    setViewMode: (newViewMode: ViewModeType) => void;
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

    // authorization
    useEffect(() => {
        if (mount) return;
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
    }, [mount]); // eslint-disable-line

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
                    setViewMode(ViewModeType[JSON.parse(storedItems)]);
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
        if (mount || !viewMode) return;
        const updateViewMode = async () => {
            try {
                await setStorageItem(STORAGE_KEYS?.VIEW_MODE_KEY, JSON.stringify(ViewModeType[viewMode]));
            } catch (error) {
                console.error('Error setting storage item:', error);
            }
        };

        updateViewMode();
    }, [viewMode, mount]); // eslint-disable-line

    useEffect(() => {
        if (!storeDataRes || isStoreLoading) return;

        const store = storeDataRes?.data;

        const storeData: StoreInterface = {
            currency: store?.currency || DEFAULT_VALUES?.currency,
            logo: { path: store?.logo?.path || DEFAULT_VALUES?.logo },
            supportedLanguages: store?.supportedLanguages,
            code: store?.code,
            name: store?.name,
        };

        setCurrentStoreData(storeData); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeDataRes, isStoreLoading, setCurrentStoreData]);
};

export default StoresLogic;
