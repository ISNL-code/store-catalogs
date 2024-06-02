import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WelcomePage from 'layouts/WelcomeLayout/Welcome';
import { Suspense, useCallback, useMemo } from 'react';
import { HOME_ROUTE, LOGIN_ROUTE, ROUTES, STORE_ROUTE } from './routes';
import Home from 'layouts/Home/Home';
import { useAppStorage } from 'hooks/useAppStorage';
import { useUserApi } from 'api/useUserApi';
import { LangResInterface, useGetLanguage } from 'hooks/useGetLanguage';
import { useAddToCart } from 'layouts/hooks/useAddToCart';
import { useAddToFavorites } from 'layouts/hooks/useAddToFavorites';
import useImageStorage from 'layouts/hooks/useImageStorage';
import { useAddToCartDataInterface, useAddToFavoriteDataInterface } from 'types/app_models';
import { STORE_CONFIG } from 'store_constants/stores_config';
import HomePage from 'pages/Home/HomePage';
import StoresLogic from 'StoresLogic';
import { useStoresApi } from 'api/useStoresApi';
import MainCatalog from 'layouts/Catalog/MainCatalog';
import Catalog from 'pages/Catalog/Catalog';
import ProductDetails from 'pages/ProductDetails/ProductDetails';
import PAGE_404 from 'pages/TechPages/404';
import Cart from 'pages/Cart/Cart';
import Favorites from 'pages/Favorites/Favorites';
import UserOrders from 'pages/Orders/UserOrders';
import UserProfile from 'pages/Profile/UserProfile';
import InformationPage from 'pages/Information/InformationPage';
import ContactsManagePage from 'pages/Contacts/ContactsManagePage';
import PAGE_401 from 'pages/TechPages/401';
import PAGE_403 from 'pages/TechPages/403';
import PAGE_500 from 'pages/TechPages/500';
import SecurityLayout from 'layouts/Security/Security';

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

    //eslint-disable-next-line
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

    //eslint-disable-next-line
    const handleRedirect = useCallback(() => {
        if (!REQUIRED_REGISTRATION || auth) {
            return HOME_PAGE_ACTIVE ? HOME_ROUTE?.root(STORE_CODE) : STORE_ROUTE?.root(STORE_CODE);
        } else {
            return LOGIN_ROUTE?.root(STORE_CODE, 'login');
        }
    }, [REQUIRED_REGISTRATION, auth, HOME_PAGE_ACTIVE, STORE_CODE]);

    if (!currentStoreData) return null;

    const router = createBrowserRouter([
        {
            path: '/',
            errorElement: <PAGE_404 />,
            loader: () => <div>Loading...</div>,
            element: <WelcomePage />,
        },
        {
            path: `${ROUTES?.SECURITY}/:storeCode/:formType`,
            errorElement: <PAGE_404 />,
            loader: () => <div>Loading...</div>,
            element: <SecurityLayout />,
        },
        {
            path: ROUTES?.HOME,
            errorElement: <PAGE_404 />,
            loader: () => <div>Loading...</div>,
            element: (
                <Suspense fallback={<div>Loading...</div>}>
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
                </Suspense>
            ),
            children: [
                {
                    path: ':storeCode',
                    errorElement: <PAGE_404 />,
                    loader: () => <div>Loading...</div>,
                    element: (
                        <Suspense fallback={<div>Loading...</div>}>
                            <HomePage />
                        </Suspense>
                    ),
                },
            ],
        },
        {
            path: ROUTES?.STORE,
            errorElement: <PAGE_404 />,
            loader: () => <div>Loading...</div>,
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <MainCatalog
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
                </Suspense>
            ),
            children: [
                {
                    path: ':storeCode',
                    errorElement: <PAGE_404 />,
                    loader: () => <div>Loading...</div>,
                    element: (
                        <Suspense fallback={<div>Loading...</div>}>
                            <Catalog />
                        </Suspense>
                    ),
                },
                {
                    path: ':storeCode/product/:productId/model/:modelSku',
                    errorElement: <PAGE_404 />,
                    loader: () => <div>Loading...</div>,
                    element: (
                        <Suspense fallback={<div>Loading...</div>}>
                            <ProductDetails />
                        </Suspense>
                    ),
                },
                {
                    path: ':storeCode/cart',
                    errorElement: <PAGE_404 />,
                    loader: () => <div>Loading...</div>,
                    element: (
                        <Suspense fallback={<div>Loading...</div>}>
                            <Cart />
                        </Suspense>
                    ),
                },
                {
                    path: ':storeCode/favorites',
                    errorElement: <PAGE_404 />,
                    loader: () => <div>Loading...</div>,
                    element: (
                        <Suspense fallback={<div>Loading...</div>}>
                            <Favorites />
                        </Suspense>
                    ),
                },
                {
                    path: ':storeCode/orders',
                    errorElement: <PAGE_404 />,
                    loader: () => <div>Loading...</div>,
                    element: (
                        <Suspense fallback={<div>Loading...</div>}>
                            <UserOrders />
                        </Suspense>
                    ),
                },
                {
                    path: ':storeCode/profile',
                    errorElement: <PAGE_404 />,
                    loader: () => <div>Loading...</div>,
                    element: (
                        <Suspense fallback={<div>Loading...</div>}>
                            <UserProfile />
                        </Suspense>
                    ),
                },
                {
                    path: ':storeCode/info',
                    errorElement: <PAGE_404 />,
                    loader: () => <div>Loading...</div>,
                    element: (
                        <Suspense fallback={<div>Loading...</div>}>
                            <InformationPage />
                        </Suspense>
                    ),
                },
                {
                    path: ':storeCode/contacts',
                    errorElement: <PAGE_404 />,
                    loader: () => <div>Loading...</div>,
                    element: (
                        <Suspense fallback={<div>Loading...</div>}>
                            <ContactsManagePage />
                        </Suspense>
                    ),
                },
            ],
        },
        {
            path: ROUTES?.PAGE_401,
            loader: () => <div>Loading...</div>,
            element: <PAGE_401 />,
        },
        {
            path: ROUTES?.PAGE_403,
            loader: () => <div>Loading...</div>,
            element: <PAGE_403 />,
        },
        {
            path: ROUTES?.PAGE_404,
            loader: () => <div>Loading...</div>,
            element: <PAGE_404 />,
        },
        {
            path: ROUTES?.PAGE_500,
            loader: () => <div>Loading...</div>,
            element: <PAGE_500 />,
        },
    ]);

    return <RouterProvider router={router} />;

    //     <Router>
    //     <Routes>
    //         <Route
    //             path={`${ROUTES?.NEW_PASSWORD}/:storeCode/:tokenId`}
    //             element={
    //                 <NewPassword
    //                     lang={lang}
    //                     setLang={setLang}
    //                     setAuth={setAuth}
    //                     currentLanguage={currentLanguage}
    //                     store={currentStoreData}
    //                 />
    //             }
    //         />

    //         <Route path="*" element={<Navigate to={handleRedirect()} replace />} />
    //     </Routes>
    // </Router>
};

export default StoresRouting;
