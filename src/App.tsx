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
import ContactsManagePage from 'pages/Contacts/ContactsManagePage';
import { useUserApi } from 'api/useUserApi';
import { UserDataInterface } from 'types';
import HomePage from 'pages/Home/HomePage';
import LandingRequestContacts from 'pages/Contacts/LandingRequestContacts';
import Slider from 'react-slick';

const App = () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const mount = useIsMount();
    const [lang, setLang] = useState<any>({ code: 'ua', label: 'Ukraine' });
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
            setLang({ code: 'ua', label: 'Ukraine' });
            return;
        }
        const savedLanguage = JSON.parse(getLang);

        setLang(savedLanguage);
    }, []);

    useEffect(() => {
        if (mount) return;
        localStorage.setItem('my-lang-cocktail', JSON.stringify(lang));
    }, [lang, mount]);
    // return (
    //     <Slider
    //         style={{ height: 200, width: 200, border: '1px solid #000' }}
    //         dots={true}
    //         infinite
    //         speed={500}
    //         slidesToShow={1}
    //         slidesToScroll={1}
    //     >
    //         <div style={{ height: 200, width: 200, border: '1px solid #000' }}>qwe</div>
    //         <div style={{ height: 200, width: 200, border: '1px solid #000' }}>qwe</div>
    //     </Slider>
    // );
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
                                <Route path={'/'} element={<HomePage />} />
                                <Route path={'/stores'} element={<StoresPage />} />
                                <Route path={'/my-stores'} element={<MyStoresPage />} />
                                <Route path={'/catalog/land-contacts'} element={<LandingRequestContacts />} />
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
