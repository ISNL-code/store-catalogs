import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
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
import StoresLogic from 'StoresLogic';
import { useAppStorage } from 'hooks/useAppStorage';
import { useUserApi } from 'api/useUserApi';
import { useStoresApi } from 'api/useStoresApi';
import { LangResInterface, useGetLanguage } from 'hooks/useGetLanguage';
import { useAddToCartDataInterface, useAddToFavoriteDataInterface } from 'types/app_models';
import { useAddToCart } from 'layouts/hooks/useAddToCart';
import { useAddToFavorites } from 'layouts/hooks/useAddToFavorites';
import Loader from 'components/atoms/Loader/Loader';
import useImageStorage from 'layouts/hooks/useImageStorage';

const StoresRouting = () => {
    const { STORE_CODE, OPTIONS, REQUIRED_REGISTRATION, STORE_NAME } = STORE_CONFIG;
    const { HOME_PAGE_ACTIVE } = OPTIONS;

    const {
        auth,
        setAuth,
        lang,
        setLang,
        viewMode,
        setViewMode,
        infoAlert,
        setInfoAlert,
        currentStoreData,
        setCurrentStoreData,
        currentUserData,
        setCurrentUserData,
    } = useAppStorage();

    const {
        refetch: fetchUserData,
        isFetching: isFetchingUser,
        error: userError,
    } = useUserApi().useGetUserData({
        storeCode: STORE_CODE,
    });

    const { data: storeDataRes, isFetching: isStoreLoading } = useStoresApi().useGetStoreByCode({
        code: STORE_CODE,
    });

    const { currentLanguage }: LangResInterface = useGetLanguage({ lang, storeName: STORE_NAME });
    const cart: useAddToCartDataInterface = useAddToCart({ loadingUser: isFetchingUser });
    const favorites: useAddToFavoriteDataInterface = useAddToFavorites({ loadingUser: isFetchingUser });
    const { handleSaveImage, savedImages } = useImageStorage();

    const memoizedAppLogic = useMemo(
        () => ({
            setAuth,
            setLang,
            setInfoAlert,
            setViewMode,
            setCurrentStoreData,
            userData: { currentUserData, isFetchingUser, setCurrentUserData, fetchUserData, userError },
            lang,
            infoAlert,
            viewMode,
            storeDataRes,
            isStoreLoading,
        }),
        [lang, auth, infoAlert, storeDataRes, currentUserData] // eslint-disable-line
    );

    StoresLogic(memoizedAppLogic);

    const handleCheckAccess = useCallback(
        (route: string | null) => {
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
        },
        [REQUIRED_REGISTRATION, HOME_PAGE_ACTIVE, auth]
    );

    const handleRedirect = useCallback(() => {
        if (!REQUIRED_REGISTRATION || auth) {
            return HOME_PAGE_ACTIVE ? HOME_ROUTE?.root(STORE_CODE) : STORE_ROUTE?.root(STORE_CODE);
        } else {
            return LOGIN_ROUTE?.root(STORE_CODE, 'login');
        }
    }, [REQUIRED_REGISTRATION, auth, HOME_PAGE_ACTIVE, STORE_CODE]);

    if (!storeDataRes || !currentStoreData) return <Loader type="circular" />;

    return (
        <Router>
            <Routes>
                <Route
                    path={`${ROUTES?.NEW_PASSWORD}/:storeCode/:tokenId`}
                    element={
                        <NewPassword
                            lang={lang}
                            setLang={setLang}
                            setAuth={setAuth}
                            currentLanguage={currentLanguage}
                            store={currentStoreData}
                        />
                    }
                />
                <Route path={`${ROUTES?.PAGE_401}`} element={<PAGE_401 />} />
                <Route path={`${ROUTES?.PAGE_403}`} element={<PAGE_403 />} />
                <Route path={`${ROUTES?.PAGE_404}`} element={<PAGE_404 />} />
                <Route path={`${ROUTES?.PAGE_500}`} element={<PAGE_500 />} />

                {REQUIRED_REGISTRATION && !auth && (
                    <>
                        <Route
                            path={`${ROUTES?.SECURITY}/:storeCode/:formType`}
                            element={
                                <SecurityLayout
                                    lang={lang}
                                    setLang={setLang}
                                    setAuth={setAuth}
                                    store={currentStoreData}
                                    currentLanguage={currentLanguage}
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

                {handleCheckAccess(ROUTES?.HOME) && (
                    <Route
                        path={ROUTES?.HOME}
                        element={
                            <Home
                                store={currentStoreData}
                                lang={lang}
                                setLang={setLang}
                                auth={auth}
                                setAuth={setAuth}
                                userData={{
                                    currentUserData,
                                    isFetchingUser,
                                    setCurrentUserData,
                                    fetchUserData,
                                    userError,
                                }}
                                cart={cart}
                                favorites={favorites}
                                currentLanguage={currentLanguage}
                                handleSaveImage={handleSaveImage}
                                savedImages={savedImages}
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
                                store={currentStoreData}
                                lang={lang}
                                setLang={setLang}
                                viewMode={viewMode}
                                setViewMode={setViewMode}
                                auth={auth}
                                setAuth={setAuth}
                                userData={{
                                    currentUserData,
                                    isFetchingUser,
                                    setCurrentUserData,
                                    fetchUserData,
                                    userError,
                                }}
                                infoAlert={infoAlert}
                                setInfoAlert={setInfoAlert}
                                cart={cart}
                                favorites={favorites}
                                currentLanguage={currentLanguage}
                                handleSaveImage={handleSaveImage}
                                savedImages={savedImages}
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

export default StoresRouting;
