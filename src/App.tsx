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
import { STORE_CONFIG } from 'store_constants/stores_config';
import Head from 'layouts/Head';
import { ViewModeType } from 'store_constants/types';
import Home from 'layouts/Home/Home';
import HomePage from 'pages/Home/HomePage';
import InformationPage from 'pages/Information/InformationPage';
import axios from 'axios'; // eslint-disable-line
import { HOME_ROUTE, LOGIN_ROUTE, ROUTES, STORE_ROUTE } from 'constants/routes';
import SecurityLayout from 'layouts/Security/Security';
import NewPassword from 'layouts/Security/NewPassword';

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
    const [country, setCountry] = useState<any>(null);
    const [city, setCity] = useState<any>(null);

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
                    setCountry(userCountry);
                    setCity(userCity);
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

    const handleCheckAccess = (route: string | null) => {
        switch (route) {
            case ROUTES.SECURITY:
                return Boolean(REQUIRED_REGISTRATION && !auth);
            case ROUTES.HOME:
                return Boolean(HOME_PAGE_ACTIVE && (!REQUIRED_REGISTRATION || (REQUIRED_REGISTRATION && auth)));
            case ROUTES.STORE:
                return Boolean(!REQUIRED_REGISTRATION || (REQUIRED_REGISTRATION && auth));
            default:
                return false;
        }
    };

    if (auth === null || !STORE_CODE) return <></>;

    const handleRedirect = () => {
        if (!REQUIRED_REGISTRATION || auth) {
            return HOME_PAGE_ACTIVE ? HOME_ROUTE?.root(STORE_CODE) : STORE_ROUTE?.root(STORE_CODE);
        } else {
            return LOGIN_ROUTE?.root(STORE_CODE, 'login');
        }
    };

    return (
        <>
            <Head />
            <ThemeProvider theme={mainTheme}>
                <Router>
                    <Routes>
                        <>
                            <Route>
                                <Route
                                    path={`${ROUTES?.NEW_PASSWORD}/:storeCode/:tokenId`}
                                    element={
                                        <NewPassword lang={lang} setLang={setLang} auth={auth} setAuth={setAuth} />
                                    }
                                />

                                {REQUIRED_REGISTRATION && !auth && (
                                    <>
                                        <Route
                                            path={`${ROUTES?.SECURITY}/:storeCode/:formType`}
                                            element={
                                                <SecurityLayout
                                                    lang={lang}
                                                    setLang={setLang}
                                                    auth={auth}
                                                    setAuth={setAuth}
                                                />
                                            }
                                        />

                                        <Route
                                            path="*"
                                            element={
                                                <Navigate
                                                    to={
                                                        REQUIRED_REGISTRATION
                                                            ? LOGIN_ROUTE?.root(STORE_CODE, 'login')
                                                            : handleRedirect()
                                                    }
                                                    replace
                                                />
                                            }
                                        />
                                    </>
                                )}
                            </Route>
                            {handleCheckAccess(ROUTES?.HOME) && (
                                <Route
                                    path={ROUTES?.HOME}
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
                                    <Route index path={`${ROUTES?.HOME}/:storeCode`} element={<HomePage />} />
                                    <Route
                                        path={`${ROUTES?.HOME}/:storeCode/contacts`}
                                        element={<ContactsManagePage />}
                                    />
                                    <Route path={`${ROUTES?.HOME}/:storeCode/profile`} element={<UserProfile />} />
                                    <Route path={`${ROUTES?.HOME}/:storeCode/orders`} element={<UserOrders />} />
                                    <Route path={`${ROUTES?.HOME}/:storeCode/info`} element={<InformationPage />} />
                                    <Route path="*" element={<Navigate to={ROUTES?.HOME} replace />} />
                                </Route>
                            )}

                            {handleCheckAccess(ROUTES?.STORE) && (
                                <Route
                                    path={ROUTES?.STORE}
                                    element={
                                        <Catalog
                                            lang={lang}
                                            setLang={setLang}
                                            viewMode={viewMode}
                                            setViewMode={setViewMode}
                                            auth={auth}
                                            setAuth={setAuth}
                                            country={country}
                                            city={city}
                                            userData={{
                                                currentUserData,
                                                isFetching,
                                                updateUserData,
                                                setCurrentUserData,
                                            }}
                                        />
                                    }
                                >
                                    <Route index path={`${ROUTES?.STORE}/:storeCode`} element={<CatalogPage />} />
                                    <Route
                                        path={`${ROUTES?.STORE}/:storeCode/contacts`}
                                        element={<ContactsManagePage />}
                                    />
                                    <Route
                                        path={`${ROUTES?.STORE}/:storeCode/product/:productId/model/:modelSku`}
                                        element={<ProductDetailsPage />}
                                    />
                                    <Route path={`${ROUTES?.STORE}/:storeCode/cart`} element={<CartPage />} />

                                    <Route path={`${ROUTES?.STORE}/:storeCode/favorites`} element={<FavoritesPage />} />

                                    <Route path={`${ROUTES?.STORE}/:storeCode/profile`} element={<UserProfile />} />

                                    <Route path={`${ROUTES?.STORE}/:storeCode/orders`} element={<UserOrders />} />
                                    <Route path={`${ROUTES?.STORE}/:storeCode/info`} element={<InformationPage />} />
                                    <Route path="*" element={<Navigate to={ROUTES?.STORE} replace />} />
                                </Route>
                            )}
                        </>
                        <Route path="*" element={<Navigate to={handleRedirect()} replace />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </>
    );
};

export default App;
