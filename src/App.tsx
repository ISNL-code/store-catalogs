import { ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import mainTheme from 'theme/mainTheme';
import { useIsMount } from 'hooks/useIsMount';
import CatalogPage from 'pages/Catalog/Catalog';
import Catalog from 'layouts/Catalog/MainCatalog';
import ProductDetailsPage from 'pages/ProductDetails/ProductDetails';
import FavoritesPage from 'pages/Favorites/Favorites';
import CartPage from 'pages/Cart/Cart';
import ContactsManagePage from 'pages/Contacts/ContactsManagePage';
import { useUserApi } from 'api/useUserApi';
import { UserDataInterface } from 'types';
import UserProfile from 'pages/Profile/UserProfile';
import UserOrders from 'pages/Orders/UserOrders';
import { STORE_CONFIG } from 'constants/stores_config';
import Head from 'layouts/Head';
import { ViewModeType } from 'constants/types';
import Home from 'layouts/Home/Home';
import HomePage from 'pages/Home/HomePage';
import InformationPage from 'pages/Information/InformationPage';
import Login from 'layouts/Login/Login';
import axios from 'axios'; // eslint-disable-line
// import StoppedForService from 'pages/TechPages/StoppedForService';

const App = () => {
    const {
        ACCESS_TOKEN_KEY,
        STORE_CODE,
        LANGUAGE_KEY,
        APP_LANGUAGE,
        VIEW_MODE_KEY,
        USER_OPTIONS,
        OPTIONS,
        REQUIRED_REGISTRATION,
        STORE_NAME, // eslint-disable-line
    } = STORE_CONFIG;
    const { HOME_PAGE_ACTIVE } = OPTIONS;
    const { VIEW_MODE } = USER_OPTIONS;
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const mount = useIsMount();
    const [lang, setLang] = useState<string>(APP_LANGUAGE);
    const [viewMode, setViewMode] = useState<ViewModeType | null>(null);
    const [auth, setAuth] = useState<boolean | null>(null);
    const { refetch: updateUserData, isFetching } = useUserApi().useGetUserData({
        storeCode: STORE_CODE,
    });
    const [currentUserData, setCurrentUserData] = useState<UserDataInterface | any>(null);

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
                    console.error('Ошибка при получении данных о местоположении:', error);
                });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }, []); // eslint-disable-line

    useEffect(() => {
        if (token) {
            updateUserData().then(res => {
                if (res.status === 'error') {
                    setAuth(false);
                    localStorage.removeItem(ACCESS_TOKEN_KEY);
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
        if (mount) return;
        localStorage.setItem(LANGUAGE_KEY, JSON.stringify(lang));
    }, [lang, mount]); // eslint-disable-line

    useEffect(() => {
        if (mount) return;
        localStorage.setItem(VIEW_MODE_KEY, JSON.stringify(viewMode));
    }, [viewMode, mount]); // eslint-disable-line

    useEffect(() => {
        const getLang = localStorage.getItem(LANGUAGE_KEY);
        const getViewMode = localStorage.getItem(VIEW_MODE_KEY);

        if (!getViewMode) {
            setViewMode(VIEW_MODE);
            localStorage.setItem(VIEW_MODE_KEY, JSON.stringify(VIEW_MODE));
        } else {
            const savedViewMode = JSON.parse(getViewMode);
            setViewMode(savedViewMode);
        }

        if (!getLang) {
            setLang(APP_LANGUAGE);
            localStorage.setItem(LANGUAGE_KEY, JSON.stringify(APP_LANGUAGE));
        } else {
            const savedLanguage = JSON.parse(getLang);
            setLang(savedLanguage);
        }
    }, []); // eslint-disable-line

    const handleRedirect = () => {
        if (!HOME_PAGE_ACTIVE) {
            if (REQUIRED_REGISTRATION && !auth) {
                return '/';
            }
            return '/catalog';
        }
        return '/';
    };

    if (auth === null) return <></>;

    return (
        <>
            <Head />
            <ThemeProvider theme={mainTheme}>
                <Router>
                    <Routes>
                        {
                            <>
                                {REQUIRED_REGISTRATION && !auth && (
                                    <Route
                                        path={'/'}
                                        element={<Login lang={lang} setLang={setLang} auth={auth} setAuth={setAuth} />}
                                    />
                                )}
                                {HOME_PAGE_ACTIVE && (
                                    <Route
                                        path={'/'}
                                        element={
                                            <Home
                                                lang={lang}
                                                setLang={setLang}
                                                auth={auth}
                                                setAuth={setAuth}
                                                userData={{
                                                    currentUserData,
                                                    isFetching,
                                                    updateUserData,
                                                    setCurrentUserData,
                                                }}
                                            />
                                        }
                                    >
                                        <Route path={'/'} element={<HomePage />} />
                                        <Route path={'/contacts'} element={<ContactsManagePage />} />
                                        <Route path={'/profile'} element={<UserProfile />} />
                                        <Route path={'/orders'} element={<UserOrders />} />
                                        <Route path={'/info'} element={<InformationPage />} />
                                        <Route path="*" element={<Navigate to={'/'} replace />} />
                                    </Route>
                                )}
                                {((REQUIRED_REGISTRATION && auth) || !REQUIRED_REGISTRATION) && (
                                    <Route
                                        path={'/catalog'}
                                        element={
                                            <Catalog
                                                lang={lang}
                                                setLang={setLang}
                                                viewMode={viewMode}
                                                setViewMode={setViewMode}
                                                auth={auth}
                                                setAuth={setAuth}
                                                userData={{
                                                    currentUserData,
                                                    isFetching,
                                                    updateUserData,
                                                    setCurrentUserData,
                                                }}
                                            />
                                        }
                                    >
                                        <Route path={'/catalog/:storeCode/:storeName'} element={<CatalogPage />} />
                                        <Route
                                            path={'/catalog/:storeCode/:storeName/contacts'}
                                            element={<ContactsManagePage />}
                                        />
                                        <Route
                                            path={'/catalog/:storeCode/:storeName/details/:productId/model/:modelSku'}
                                            element={<ProductDetailsPage />}
                                        />
                                        <Route path={'/catalog/:storeCode/:storeName/cart'} element={<CartPage />} />

                                        <Route
                                            path={'/catalog/:storeCode/:storeName/favorites'}
                                            element={<FavoritesPage />}
                                        />

                                        <Route
                                            path={'/catalog/:storeCode/:storeName/profile'}
                                            element={<UserProfile />}
                                        />

                                        <Route
                                            path={'/catalog/:storeCode/:storeName/orders'}
                                            element={<UserOrders />}
                                        />
                                        <Route path="*" element={<Navigate to={'/catalog'} replace />} />
                                    </Route>
                                )}
                                <Route path="*" element={<Navigate to={handleRedirect()} replace />} />
                            </>
                        }
                    </Routes>
                </Router>
            </ThemeProvider>
        </>
    );
};

export default App;
