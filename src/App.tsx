import { ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import mainTheme from 'theme/mainTheme';
import { useIsMount } from 'hooks/useIsMount';
import { ACCESS_TOKEN_KEY } from 'constants/constants';
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
import Home from 'layouts/Home/Home';
import HomePage from 'pages/Home/HomePage';

const App = () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const mount = useIsMount();
    const [lang, setLang] = useState<any>({ code: 'en', label: 'English' });
    const [auth, setAuth] = useState<boolean | null>(false);
    const { refetch: updateUserData, isFetching } = useUserApi().useGetUserData({ auth, lang: lang?.code });
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
        const getLang = localStorage.getItem('my-lang-cocktail');

        if (!getLang) {
            localStorage.removeItem('my-lang-cocktail');
            setLang({ code: 'en', label: 'English' });
            return;
        }
        const savedLanguage = JSON.parse(getLang);
        const catalogPriceMode = localStorage.getItem('catalog_mode');
        if (!catalogPriceMode) localStorage.setItem('catalog_mode', JSON.stringify(3));
        setLang(savedLanguage);
    }, []);

    useEffect(() => {
        if (mount) return;
        localStorage.setItem('my-lang-cocktail', JSON.stringify(lang));
    }, [lang, mount]);

    return (
        <ThemeProvider theme={mainTheme}>
            <Router>
                <Routes>
                    {
                        <>
                            <Route path={'/'} element={<Home lang={lang} setLang={setLang} />}>
                                <Route path={'/'} element={<HomePage />} />
                            </Route>
                            <Route
                                path={'/catalog'}
                                element={
                                    <Catalog
                                        lang={lang}
                                        setLang={setLang}
                                        auth={auth}
                                        setAuth={setAuth}
                                        userData={{ currentUserData, isFetching, updateUserData, setCurrentUserData }}
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

                                <Route path={'/catalog/:storeCode/:storeName/favorites'} element={<FavoritesPage />} />

                                <Route path={'/catalog/:storeCode/:storeName/profile'} element={<UserProfile />} />

                                <Route path={'/catalog/:storeCode/:storeName/orders'} element={<UserOrders />} />
                            </Route>
                            <Route path="*" element={<Navigate to="/catalog" replace />} />
                        </>
                    }
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
