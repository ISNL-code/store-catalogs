import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './MainCatalogHeader';
import MobileMenu from './MainCatalogMobileMenu';
import { useDevice } from 'hooks/useDevice';
import { useEffect, useState, useCallback } from 'react';
import { useCategory } from '../hooks/useCategory';
import { useProducts } from '../hooks/useProducts';
import { CatalogContextInterface } from 'types/outlet_context_models';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { useFormsApp } from 'layouts/hooks/useFormsApp';
import DialogApp from 'layouts/DialogApp';
import { ROUTES, STORE_ROUTE } from 'router/routes';
import { ViewModeType } from 'store_constants/types';
import {
    StoreInterface,
    UserDataInterface,
    useAddToCartDataInterface,
    useAddToFavoriteDataInterface,
} from 'types/app_models';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { LanguageDataInterface } from 'hooks/useGetLanguage';
import { useFavorites } from 'layouts/hooks/useFavorites';
import Loader from 'components/atoms/Loader/Loader';
import { telegramSender } from 'utils/telegramSender';
import { useIsMount } from 'hooks/useIsMount';

interface Props {
    apiToken: string | null;
    setApiToken: (token: string | null) => void;
    lang: string;
    setViewMode: (newViewMode: ViewModeType) => void;
    setAuth: (newAuth: boolean) => void;
    setLang: (newLang: string) => void;
    auth: boolean | null;
    userData: {
        currentUserData: UserDataInterface | null;
        isFetchingUser: boolean;
        setCurrentUserData: (newData: UserDataInterface) => void;
        fetchUserData: <TPageData>(
            options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
        ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
        userError: any;
    };
    viewMode: ViewModeType | null;
    store: StoreInterface | null;
    favorites: useAddToFavoriteDataInterface;
    cart: useAddToCartDataInterface;
    currentLanguage: LanguageDataInterface;
    savedImages: { image: File | Blob; imageUrl: string }[];
    handleSaveImage: (image: { file: File | Blob; imageUrl: string }) => void;
}

const OutletContainer = ({ context }: { context: CatalogContextInterface }) => {
    return <Outlet context={context} />;
};

export default function MainCatalog({
    setLang,
    setAuth,
    setViewMode,
    lang,
    auth,
    userData,
    viewMode,
    store,
    favorites,
    cart,
    currentLanguage,
    handleSaveImage,
    savedImages,
    apiToken,
    setApiToken,
}: Props) {
    const { OPTIONS, STORE_CODE } = STORE_CONFIG;
    const { PLAN_OPTIONS } = OPTIONS;
    const { storeCode } = useParams();
    const navigate = useNavigate();
    const { sx } = useDevice();
    const HEADER_HEIGHT = 50;
    const FOOTER_MENU_HEIGHT = sx ? 65 : 0;
    const INSTRUMENTAL_BAR_HEIGHT = 36;
    const INSTRUMENTAL_BAR_PADDINGS = sx ? 2 : 4;
    const HEADER_PADDINGS = sx ? 2 : 4;
    const BODY_PADDINGS = sx ? 0 : 4;
    const FOOTER_PADDINGS = sx ? 2 : 4;
    const [scrollPosition, setScrollPosition] = useState(0);
    const { activeDialogWindow, handleOpenDialog, handleSetDialogState, dialogState } = useFormsApp();

    const {
        isLoadingProducts,
        currentProductsPage,
        handleSetProductsPage,
        productsList,
        totalProductsCount,
        productCountPerPage,
        totalProductsPages,
        setProductsList,
        queryCategories,
        setQueryCategories,
    } = useProducts({
        lang,
        store: STORE_CODE,
    });

    const mount = useIsMount();

    const { isLoadingFavorites, favoritesList, fetchFavoriteProducts } = useFavorites({
        lang,
        store: STORE_CODE,
        favorites,
    });

    const { categoriesList } = useCategory({
        lang,
        store: STORE_CODE,
    });

    useEffect(() => {
        if (mount) return;
        telegramSender({
            action: `ЗАШЕЛ НА ЛИСТИНГ ${window.location.origin}`,
            name: 'listing',
        });
    }, [mount]);

    useEffect(() => {
        if (STORE_CODE !== storeCode) {
            navigate(STORE_ROUTE?.root(STORE_CODE));
        }
    }, [storeCode, STORE_CODE, navigate]);

    const memoizedHandleOpenDialog = useCallback(handleOpenDialog, []); // eslint-disable-line
    const memoizedSetLang = useCallback(setLang, []); // eslint-disable-line
    const memoizedSetAuth = useCallback(setAuth, []); // eslint-disable-line

    if (!store) return <Loader />;

    return (
        <Box display="flex" flexDirection="column" justifyContent="space-between">
            <CssBaseline />

            <Header
                headerHeight={HEADER_HEIGHT}
                appXPadding={HEADER_PADDINGS}
                string={currentLanguage?.string}
                lang={lang}
                setLang={memoizedSetLang}
                logo={store?.logo?.path}
                store={store}
                cart={cart}
                favorites={favorites}
                auth={auth}
                user={userData}
                handleOpenDialog={memoizedHandleOpenDialog}
            />

            <Box className="AppBody" mt={`${HEADER_HEIGHT + INSTRUMENTAL_BAR_HEIGHT}px`} sx={{ flexGrow: 1 }}>
                <OutletContainer
                    context={{
                        //main data | user options
                        lang,
                        string: currentLanguage?.string,
                        scrollPosition,
                        setScrollPosition,
                        viewMode,
                        setViewMode,
                        handleOpenDialog,
                        handleSetDialogState,
                        dialogState,
                        handleSaveImage,
                        savedImages,

                        //store data

                        store,

                        //user data
                        auth,
                        apiToken,
                        currentUserData: userData.currentUserData,
                        loadingUserData: userData.isFetchingUser,
                        updateUserData: userData.fetchUserData,
                        setCurrentUserData: userData.setCurrentUserData,
                        userDataError: userData.userError,

                        //products data
                        productsList,
                        setProductsList,
                        isLoadingProducts,
                        productCountPerPage,
                        totalProductsCount,
                        totalProductsPages,
                        handleSetProductsPage,
                        currentProductsPage,

                        //favorites data
                        isLoadingFavorites,
                        favoritesList,
                        fetchFavoriteProducts,

                        //categories data
                        categoriesList,
                        queryCategories,
                        setQueryCategories,

                        //css data
                        instrumentalBarHeight: INSTRUMENTAL_BAR_HEIGHT,
                        instrumentalBarPadding: INSTRUMENTAL_BAR_PADDINGS,
                        headerHeight: HEADER_HEIGHT,
                        footerMenuHeight: FOOTER_MENU_HEIGHT,
                        appXPadding: BODY_PADDINGS,

                        //cart & favorites
                        cart,
                        favorites,
                    }}
                />
            </Box>

            <MobileMenu
                menuHeight={FOOTER_MENU_HEIGHT}
                appXPadding={FOOTER_PADDINGS}
                string={currentLanguage?.string}
                auth={auth}
                headerHeight={HEADER_HEIGHT}
                user={userData}
                isShown={!!sx}
                withCart={PLAN_OPTIONS?.cart}
                withFavorites={PLAN_OPTIONS?.favorites}
                cart={cart}
                favorites={favorites}
                handleOpenDialog={memoizedHandleOpenDialog}
            />
            <DialogApp
                location={ROUTES?.STORE}
                string={currentLanguage?.string}
                activeDialogWindow={activeDialogWindow}
                handleOpenDialog={memoizedHandleOpenDialog}
                setAuth={memoizedSetAuth}
                cart={cart}
                favorites={favorites}
                dialogState={dialogState}
                lang={lang}
                setApiToken={setApiToken}
                handleSetDialogState={handleSetDialogState}
            />
        </Box>
    );
}
