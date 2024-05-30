import { Dispatch, SetStateAction } from 'react';
import {
    CategoryDataInterface,
    DialogStateInterface,
    ProductDataInterface,
    StoreInterface,
    UserDataInterface,
    useAddToCartDataInterface,
    useAddToFavoriteDataInterface,
} from './app_models';

import { ViewModeType } from 'store_constants/types';

export interface HomeContextInterface {
    //main data | user options
    lang: string;
    string: Record<string, any>;
    handleOpenDialog;
    handleSetDialogState: Dispatch<SetStateAction<DialogStateInterface>>;
    dialogState;

    //store data
    store: StoreInterface;

    // user data
    auth: boolean;
    currentUserData: UserDataInterface | null;
    loadingUserData: boolean;
    updateUserData: any;
    setCurrentUserData: any;
    userDataError: { response: { status } };

    //css data
    instrumentalBarHeight: number;
    instrumentalBarPadding: number;
    headerHeight: number;
    appXPadding: number;
    footerMenuHeight: number;
}

export interface LandingContextInterface {
    //main
    string: Record<string, any>;
    handleOpenDialog;
    handleSetDialogState: Dispatch<SetStateAction<DialogStateInterface>>;

    //css
    headerHeight: number;
    appXPadding: number;
    instrumentalBarHeight: number;
    instrumentalBarPadding: number;
}

export interface CatalogContextInterface {
    //main data | user options
    lang: string;
    string: Record<string, any>;
    scrollPosition: number;
    setScrollPosition;
    viewMode: ViewModeType;
    setViewMode;
    handleOpenDialog;
    handleSetDialogState: Dispatch<SetStateAction<DialogStateInterface>>;
    dialogState;

    //store data
    store: StoreInterface;
    infoAlert: { ws_info: boolean };
    setInfoAlert;

    // user data
    auth: boolean;
    currentUserData: UserDataInterface | null;
    loadingUserData: boolean;
    updateUserData: any;
    setCurrentUserData: any;
    userDataError: { response: { status } };

    //products data
    productsList: ProductDataInterface[] | null | [];
    setProductsList;
    isLoadingProducts: boolean;
    isLoadingMoreProducts: boolean;
    productCountPerPage: number;
    totalProductsCount: number;
    totalProductsPages: number;
    handleSetProductsPage: (val) => void;
    currentProductsPage: number;

    //categories data
    categoriesList: CategoryDataInterface[] | [];
    queryCategories: string[];
    setQueryCategories;

    //css data
    instrumentalBarHeight: number;
    instrumentalBarPadding: number;
    headerHeight: number;
    footerMenuHeight: number;
    appXPadding: number;

    //cart & favorites
    cart: useAddToCartDataInterface;
    favorites: useAddToFavoriteDataInterface;
}
