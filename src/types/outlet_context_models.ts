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
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export interface HomeContextInterface {
    //main data | user options
    lang: string;
    string: Record<string, any>;
    handleOpenDialog;
    handleSetDialogState: Dispatch<SetStateAction<DialogStateInterface>>;
    savedImages: { image: File | Blob; imageUrl: string }[];
    handleSaveImage: (image: { file: File | Blob; imageUrl: string }) => void;
    dialogState;

    //store data
    store: StoreInterface | null;

    // user data
    auth: boolean | null;
    apiToken: string | null;
    currentUserData: UserDataInterface | null;
    loadingUserData: boolean;
    updateUserData: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
    setCurrentUserData: (newData: UserDataInterface) => void;
    userDataError: { response: { status: string } };

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
    viewMode: ViewModeType | null;
    setViewMode: (newViewMode: ViewModeType) => void;
    handleOpenDialog;
    handleSetDialogState: Dispatch<SetStateAction<DialogStateInterface>>;
    dialogState;
    savedImages: { image: File | Blob; imageUrl: string }[];
    handleSaveImage: (image: { file: File | Blob; imageUrl: string }) => void;

    //store data
    store: StoreInterface;

    // user data
    auth: boolean | null;
    apiToken: string | null;
    currentUserData: UserDataInterface | null;
    loadingUserData: boolean;
    updateUserData: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
    setCurrentUserData: (newData: UserDataInterface) => void;
    userDataError: { response: { status } };

    //products data
    productsList: ProductDataInterface[] | null | [];
    setProductsList: Dispatch<SetStateAction<ProductDataInterface[] | null>>;
    isLoadingProducts: boolean;
    productCountPerPage: number;
    totalProductsCount: number;
    totalProductsPages: number;
    handleSetProductsPage: (val) => void;
    currentProductsPage: number;

    //favorites data
    isLoadingFavorites: boolean;
    favoritesList: ProductDataInterface[] | null | [];
    fetchFavoriteProducts;

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
