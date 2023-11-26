import { ThemeProvider } from '@mui/material';
import Main from 'layouts/Stores/MainStores';
import StoresPage from 'pages/Stores/Stores';
import MyStoresPage from 'pages/MyStores/MyStores';
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
import ContactsPage from 'pages/Contacts/ContactsPage';
import { useUserApi } from 'api/useUserApi';

const App = () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const mount = useIsMount();
    const [lang, setLang] = useState({ code: 'ua', label: 'Ukraine' });
    const [auth, setAuth] = useState<boolean | null>(false);
    const { refetch: updateUserData } = useUserApi().useGetUserData({ auth });

    useEffect(() => {
        if (token) {
            updateUserData().then(res => {
                if (res.status === 'error') {
                    setAuth(false);
                    localStorage.removeItem(ACCESS_TOKEN_KEY);
                } else {
                    setAuth(true);
                }
            });
        }
    }, []);

    useEffect(() => {
        const savedLanguage = JSON.parse(localStorage.getItem('my-lang') as string);
        if (!savedLanguage) return;
        setLang(savedLanguage);
    }, []);

    useEffect(() => {
        if (mount) return;
        localStorage.setItem('my-lang', JSON.stringify(lang));
    }, [lang, mount]);

    return (
        <ThemeProvider theme={mainTheme}>
            <Router>
                <Routes>
                    {
                        <>
                            <Route
                                path={'/'}
                                element={<Main lang={lang} setLang={setLang} auth={auth} setAuth={setAuth} />}
                            >
                                <Route path={'/'} element={<StoresPage />} />
                                <Route path={'/my-stores'} element={<MyStoresPage />} />
                            </Route>
                            <Route
                                path={'/catalog'}
                                element={<Catalog lang={lang} setLang={setLang} auth={auth} setAuth={setAuth} />}
                            >
                                <Route path={'/catalog/:storeCode/:storeName'} element={<CatalogPage />} />
                                <Route path={'/catalog/:storeCode/:storeName/contacts'} element={<ContactsPage />} />
                                <Route
                                    path={'/catalog/:storeCode/:storeName/details/:productId/model/:modelSKU'}
                                    element={<ProductDetailsPage />}
                                />
                                <Route path={'/catalog/:storeCode/:storeName/cart'} element={<CartPage />} />
                                <Route path={'/catalog/:storeCode/:storeName/favorites'} element={<FavoritesPage />} />
                            </Route>
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </>
                    }
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
