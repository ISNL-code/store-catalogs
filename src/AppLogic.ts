import { useEffect } from 'react';
import { useIsMount } from 'hooks/useIsMount';
import { STORE_CONFIG } from 'store_constants/stores_config';
import axios from 'axios';
import { STORAGE_KEYS } from 'constants/local_storage_keys';
import { STORES_DATA } from 'dataBase/STORES';

interface Props {
    setAuth;
    updateUserData;
    setCurrentUserData;
    lang;
    setLang;
    infoAlert;
    setInfoAlert;
    viewMode;
    setViewMode;
    storeDataRes;
    setStore;
    loadStore;
    userData;
}

const AppLogic = ({
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
}: Props) => {
    const mount = useIsMount();
    const { APP_LANGUAGE, USER_OPTIONS, STORE_NAME, STORE_CODE } = STORE_CONFIG;
    const { VIEW_MODE } = USER_OPTIONS;

    // visit alert
    useEffect(() => {
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
            updateUserData().then(res => {
                if (res.status === 'error') {
                    setAuth(false);
                    localStorage.removeItem(STORAGE_KEYS?.ACCESS_TOKEN_KEY);
                } else {
                    setAuth(true);
                    setCurrentUserData(res?.data?.data);
                }
            });
        } else {
            setAuth(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        if (!userData) return;
        setCurrentUserData(userData?.data);
    }, [userData]); // eslint-disable-line

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

    //set store data
    useEffect(() => {
        if (!storeDataRes || loadStore) return;
        setStore({ ...STORES_DATA.find(el => el.code === STORE_CODE), ...storeDataRes.data }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeDataRes]);
};

export default AppLogic;
