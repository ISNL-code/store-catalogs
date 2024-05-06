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

const App = () => {
    const { ACCESS_TOKEN_KEY, STORE_CODE, LANGUAGE_KEY, APP_LANGUAGE } = STORE_CONFIG;
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const mount = useIsMount();
    const [lang, setLang] = useState<string>(APP_LANGUAGE);
    const [auth, setAuth] = useState<boolean | null>(false);
    const { refetch: updateUserData, isFetching } = useUserApi().useGetUserData({
        storeCode: STORE_CODE,
    });
    const [currentUserData, setCurrentUserData] = useState<UserDataInterface | any>(null);

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
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        if (mount) return;
        localStorage.setItem(LANGUAGE_KEY, JSON.stringify(lang));
    }, [lang, mount]); // eslint-disable-line

    useEffect(() => {
        const getLang = localStorage.getItem(LANGUAGE_KEY);

        if (!getLang) {
            setLang(APP_LANGUAGE);
            localStorage.setItem(LANGUAGE_KEY, JSON.stringify(APP_LANGUAGE));
            return;
        }
        const savedLanguage = JSON.parse(getLang);

        setLang(savedLanguage);
    }, []); // eslint-disable-line

    return (
        <>
            <Head />
            <ThemeProvider theme={mainTheme}>
                <Router>
                    <Routes>
                        {
                            <>
                                <Route
                                    path={'/catalog'}
                                    element={
                                        <Catalog
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

                                    <Route path={'/catalog/:storeCode/:storeName/profile'} element={<UserProfile />} />

                                    <Route path={'/catalog/:storeCode/:storeName/orders'} element={<UserOrders />} />
                                </Route>
                                <Route path="*" element={<Navigate to="/catalog" replace />} />
                            </>
                        }
                    </Routes>
                </Router>
            </ThemeProvider>
        </>
    );
};

export default App;
