import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import CatalogPage from 'pages/Catalog/Catalog';
import Catalog from 'layouts/Catalog/MainCatalog';
import ProductDetailsPage from 'pages/ProductDetails/ProductDetails';
import FavoritesPage from 'pages/Favorites/Favorites';
import CartPage from 'pages/Cart/Cart';
import ContactsManagePage from 'pages/Contacts/ContactsManagePage';
import UserProfile from 'pages/Profile/UserProfile';
import UserOrders from 'pages/Orders/UserOrders';
import { STORE_CONFIG } from 'store_constants/stores_config';
import Home from 'layouts/Home/Home';
import HomePage from 'pages/Home/HomePage';
import InformationPage from 'pages/Information/InformationPage';
import { HOME_ROUTE, LOGIN_ROUTE, ROUTES, STORE_ROUTE } from 'constants/routes';
import SecurityLayout from 'layouts/Security/Security';
import NewPassword from 'layouts/Security/NewPassword';
import PAGE_401 from 'pages/TechPages/401';
import PAGE_403 from 'pages/TechPages/403';
import PAGE_404 from 'pages/TechPages/404';
import PAGE_500 from 'pages/TechPages/500';

interface Props {
    auth: boolean | null;
    setAuth;
    lang: string;
    setLang;
    currentUserData;
    isFetchingUser: boolean;
    updateUserData;
    setCurrentUserData;
    userError;
    viewMode;
    setViewMode;
    infoAlert;
    setInfoAlert;
    store;
    favorites;
    cart;
}

const AppRouting = ({
    auth,
    setAuth,
    lang,
    setLang,
    currentUserData,
    isFetchingUser,
    updateUserData,
    setCurrentUserData,
    userError,
    viewMode,
    setViewMode,
    infoAlert,
    setInfoAlert,
    store,
    favorites,
    cart,
}: Props) => {
    const { STORE_CODE, OPTIONS, REQUIRED_REGISTRATION } = STORE_CONFIG;
    const { HOME_PAGE_ACTIVE } = OPTIONS;

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

    const handleRedirect = () => {
        if (!REQUIRED_REGISTRATION || auth) {
            return HOME_PAGE_ACTIVE ? HOME_ROUTE?.root(STORE_CODE) : STORE_ROUTE?.root(STORE_CODE);
        } else {
            return LOGIN_ROUTE?.root(STORE_CODE, 'login');
        }
    };

    return (
        <Router>
            <Routes>
                <Route
                    path={`${ROUTES?.NEW_PASSWORD}/:storeCode/:tokenId`}
                    element={<NewPassword lang={lang} setLang={setLang} auth={auth} setAuth={setAuth} />}
                />
                <Route path={`${ROUTES?.PAGE_401}`} element={<PAGE_401 />} />
                <Route path={`${ROUTES?.PAGE_403}`} element={<PAGE_403 />} />
                <Route path={`${ROUTES?.PAGE_404}`} element={<PAGE_404 />} />
                <Route path={`${ROUTES?.PAGE_500}`} element={<PAGE_500 />} />

                {REQUIRED_REGISTRATION && !auth && (
                    <>
                        <Route
                            path={`${ROUTES?.SECURITY}/:storeCode/:formType`}
                            element={<SecurityLayout lang={lang} setLang={setLang} setAuth={setAuth} store={store} />}
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

                {handleCheckAccess(ROUTES?.HOME) && (
                    <Route
                        path={ROUTES?.HOME}
                        element={
                            <Home
                                store={store}
                                lang={lang}
                                setLang={setLang}
                                auth={auth}
                                setAuth={setAuth}
                                userData={{
                                    currentUserData,
                                    isFetchingUser,
                                    updateUserData,
                                    setCurrentUserData,
                                    userError,
                                }}
                                cart={cart}
                                favorites={favorites}
                            />
                        }
                    >
                        <Route index element={<Navigate to={HOME_ROUTE?.root(STORE_CODE)} replace />} />
                        <Route index path={`${ROUTES?.HOME}/:storeCode`} element={<HomePage />} />
                        <Route path="*" element={<Navigate to={STORE_ROUTE?.root(STORE_CODE)} replace />} />
                    </Route>
                )}

                {handleCheckAccess(ROUTES?.STORE) && (
                    <Route
                        path={ROUTES?.STORE}
                        element={
                            <Catalog
                                store={store}
                                lang={lang}
                                setLang={setLang}
                                viewMode={viewMode}
                                setViewMode={setViewMode}
                                auth={auth}
                                setAuth={setAuth}
                                userData={{
                                    currentUserData,
                                    isFetchingUser,
                                    updateUserData,
                                    setCurrentUserData,
                                    userError,
                                }}
                                infoAlert={infoAlert}
                                setInfoAlert={setInfoAlert}
                                cart={cart}
                                favorites={favorites}
                            />
                        }
                    >
                        <Route index element={<Navigate to={STORE_ROUTE?.root(STORE_CODE)} replace />} />
                        <Route index path={`${ROUTES?.STORE}/:storeCode`} element={<CatalogPage />} />
                        <Route
                            path={`${ROUTES?.STORE}/:storeCode/product/:productId/model/:modelSku`}
                            element={<ProductDetailsPage />}
                        />
                        <Route path={`${ROUTES?.STORE}/:storeCode/cart`} element={<CartPage />} />
                        <Route path={`${ROUTES?.STORE}/:storeCode/favorites`} element={<FavoritesPage />} />
                        <Route path={`${ROUTES?.STORE}/:storeCode/info`} element={<InformationPage />} />
                        <Route path={`${ROUTES?.STORE}/:storeCode/profile`} element={<UserProfile />} />
                        <Route path={`${ROUTES?.STORE}/:storeCode/contacts`} element={<ContactsManagePage />} />
                        <Route path={`${ROUTES?.STORE}/:storeCode/orders`} element={<UserOrders />} />
                        <Route path="*" element={<Navigate to={STORE_ROUTE?.root(STORE_CODE)} replace />} />
                    </Route>
                )}

                <Route path="*" element={<Navigate to={handleRedirect()} replace />} />
            </Routes>
        </Router>
    );
};

export default AppRouting;
