import { ViewModeType } from 'store_constants/types';

export interface HomeContextInterface {
    //main data | user options
    lang: string;
    string: Record<string, any>;
    handleOpenDialog;
    handleSetDialogState;
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
    handleSetDialogState;
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
    productsList: LoadedProductListInterface[] | null | [];
    setProductsList;
    loadProducts: boolean;
    loadMoreProducts: boolean;
    updateProducts;
    productCountPerPage: number;
    totalProductsCount: number;
    totalProductsPages: number;
    handleSetProductsPage: (val) => void;
    currentProductsPage: number;

    //categories data
    categoriesList: {};
    queryCategories: string[];
    setQueryCategories;
    handleCategoriesQuery;
    setApplyFilters;

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

export interface useAddToCartDataInterface {
    cartItems: any[];
    handleSetCartItems: (data: any) => void;
    handleClearCartItems: (array: string[]) => void;
    handleClearCart: () => void;
}

export interface useAddToFavoriteDataInterface {
    favoriteItems: any[];
    handleSetFavoriteItems: (data: any) => void;
    handleClearFavorites: () => void;
}

export interface StoresContextInterface {
    lang: string;
    string: any;
    sortedStores: string;
    scrollPosition: number;
    setScrollPosition;
    instrumentalBarHeight: number;
    headerHeight: number;
    footerHeight: number;
    appXPadding: number;
    setSortedStores;
    auth: boolean;
    setFilteredStores;
    filteredByTypeStores: {}[];
    setOpenModalType;
    openModalType: string | null;
    setStoreToApprove;
    favoritesStores: StoreInterface[] | null;
    setFavoriteStores;
    storesList: StoreInterface[];
    updateFavoritesRes;
    loadStores: boolean;
    loadFavoritesStores: boolean;
}

export interface StoreInterface {
    id: number;
    code: string;
    name: string;
    defaultLanguage: string;
    currency: string;
    inBusinessSince: string;
    email: string;
    phone: string;
    template: string | number | null;
    useCache: boolean;
    currencyFormatNational: boolean;
    retailer: boolean;
    dimension: string;
    weight: string;
    currentUserLanguage: string | number | null;
    address: {
        stateProvince: string;
        country: string;
        address: string;
        postalCode: string;
        city: string;
        active: boolean;
    };
    logo: { name: string; path: string } | null;
    parent: string | number | null;
    supportedLanguages: LangInterface[];
    readableAudit: {
        created: string | number | null;
        modified: string;
        user: string;
    };
    //add
    mainImage: string;
    descriptions: any;
    securityStoreSettings: any;
    storeProductTypes: any;
    description: any;
    managers: [
        {
            firstName: string;
            lastName: string;
            emailAddress: string;
            contacts: {
                phone: string;
                viber: string;
                whatsapp: string;
                telegram: string;
                emailAddress: string;
            };
        }
    ];
}

export interface UserDataInterface {
    id: number;
    emailAddress: string;
    billing: {
        postalCode: string | null;
        countryCode: string | null;
        firstName: string;
        lastName: string;
        bilstateOther: string | null;
        company: string | null;
        phone: string | null;
        address: string | null;
        city: string | null;
        stateProvince: string | null;
        billingAddress: boolean;
        latitude: string | null;
        longitude: string | null;
        zone: string | null;
        country: string;
    };
    delivery: {
        postalCode: null | string;
        countryCode: null | string;
        firstName: string;
        lastName: string;
        bilstateOther: null | string;
        company: null | string;
        phone: string;
        address: string;
        city: string;
        stateProvince: null | string;
        billingAddress: boolean;
        latitude: null | string;
        longitude: null | string;
        zone: null | string;
        country: null | string;
    };
    gender: string;
    language: string;
    firstName: string;
    lastName: string;
    provider: null;
    storeCode: null;
    userName: string;
    rating: number;
    ratingCount: number;
    attributes: [];
    groups: [
        {
            name: 'CUSTOMER';
            type: 'CUSTOMER';
            id: number;
        }
    ];
    favoriteStores: [];
}

export interface ItemDescriptionInterface {
    id: number;
    language: string;
    name: string;
    description: string;
    friendlyUrl: string;
    keyWords: string;
    highlights: string;
    metaDescription: string;
    title: string;
}

export interface PriceDescriptionInterface {
    id: number;
    originalPrice: string;
    finalPrice: string;
    defaultPrice: boolean;
    discounted: boolean;
    description: {
        id: number;
        language: string;
        name: string | number | null;
        description: string | number | null;
        friendlyUrl: string | number | null;
        keyWords: string | number | null;
        highlights: string | number | null;
        metaDescription: string | number | null;
        title: string | number | null;
        priceAppender: string | number | null;
    };
}

export interface ProductImageInterface {
    id: number;
    imageName: string;
    imageUrl: string;
    externalUrl: string | number | null;
    videoUrl: string | number | null;
    imageType: number;
    order: number;
    defaultImage: boolean;
}

export interface OptionValueInterface {
    id: number;
    code: string;
    name: string | number | null;
    defaultValue: boolean;
    sortOrder: number;
    image: string | number | null;
    order: number;
    price: string | number | null;
    description: ItemDescriptionInterface;
}

export interface ProductOptionsInterface {
    id: number;
    code: string;
    type: string;
    readOnly: boolean;
    name: string;
    lang: string;
    variant: boolean;
    option;
    Values: OptionValueInterface[];
}

export interface VariationInterface {
    id: number;
    code: string;
    date: string | number | null;
    sortOrder: number;
    defaultValue: boolean;
    option: {
        id: 100;
        code: string;
        type: string;
        readOnly: boolean;
        name: string | number | null;
        lang: string;
        variant: boolean;
        optionValues: OptionValueInterface[];
    };
    optionValue: OptionValueInterface;
}

export interface LangInterface {
    code: string;
    id: number;
}

export interface AddressInterface {
    stateProvince: string;
    country: string;
    address: string;
    postalCode: string;
    city: string;
    active: boolean;
}

export interface InventoryInterface {
    id: number;
    quantity: number;
    region: string;
    regionVariant: string | number | null;
    owner: string | number | null;
    dateAvailable: string | number | null;
    available: boolean;
    productQuantityOrderMin: number;
    productQuantityOrderMax: number;
    creationDate: string | number | null;
    store: StoreInterface;
    sku: string;
    prices: PriceDescriptionInterface[];
    price: string;
}

export interface ProductVariantInterface {
    id: number;
    productShipeable: boolean;
    available: boolean;
    visible: boolean;
    sortOrder: number;
    dateAvailable: string;
    creationDate: string | number | null;
    store: string;
    productId: number;
    sku: string;
    variantSku: string;
    defaultSelection: boolean;
    variation: VariationInterface;
    variationValue: string | number | null;
    code: string;
    images: ProductImageInterface[];
    inventory: InventoryInterface[];
}

export interface ChildCategoryInterface {
    id: number;
    code: string;
    description: ItemDescriptionInterface;
    sortOrder: number;
    visible: boolean;
    featured: boolean;
    lineage: string;
    depth: number;
    parent: ParentCategoryInterface;
    productCount: number;
    store: string;
    children: ChildCategoryInterface[];
}

export interface ParentCategoryInterface {
    id: number;
    code: string;
    description: ItemDescriptionInterface;
    sortOrder: number;
    visible: boolean;
    featured: boolean;
    lineage: string;
    depth: number;
    parent: string | number | null;
    productCount: 0;
    store: string;
    children: ChildCategoryInterface[];
}

export interface CategoryInterface {
    id: number;
    code: string;
    description: ItemDescriptionInterface;
    sortOrder: number;
    visible: boolean;
    featured: boolean;
    lineage: string;
    depth: number;
    parent: {
        id: number;
        code: string;
        description: ItemDescriptionInterface;
        sortOrder: number;
        visible: boolean;
        featured: boolean;
        lineage: string;
        depth: number;
        parent: ParentCategoryInterface;
        productCount: number;
        store: string;
        children: ChildCategoryInterface[];
    };
    productCount: number;
    store: string;
    children: ChildCategoryInterface[];
}

export interface ProductCardInterface {
    id: number;
    productShipeable: boolean;
    available: boolean;
    visible: boolean;
    sortOrder: number;
    dateAvailable: string;
    creationDate: string;
    price: number;
    quantity: number;
    sku: string;
    preOrder: boolean;
    productVirtual: boolean;
    quantityOrderMaximum: number;
    quantityOrderMinimum: number;
    productIsFree: boolean;
    productSpecifications: {};
    rating: number;
    ratingCount: number;
    refSku: boolean;
    rentalDuration: number;
    rentalPeriod: number;
    description: ItemDescriptionInterface;
    productPrice: PriceDescriptionInterface;
    finalPrice: string;
    originalPrice: string;
    discounted: boolean;
    image: ProductImageInterface;
    images: ProductImageInterface[];
    manufacturer: {
        id: number;
        code: string;
        order: number;
        description: string | number | null;
    };
    attributes: [];
    options: ProductOptionsInterface[];
    variants: ProductVariantInterface[];
    properties: [];
    categories: CategoryInterface[];
    type: string | number | null;
    canBePurchased: boolean;
    owner: string | number | null;
}

export interface LoadedProductListInterface {
    id: number;
    variants: ProductVariantInterface[];
    promoTags: any[];
    name: string;
    price: string;
    langIsNotSupported: boolean;
}

export interface FavoritesProductsInterface {
    attributes: any[];
    favoriteProductId: number;
    variantId: number;
    product: LoadedProductListInterface;
}

export interface OrderInterFace {
    id: number;
    totals: {
        id: number;
        title: null;
        text: null;
        code: string;
        order: number;
        module: string;
        value: number;
    }[];
    attributes: any[];
    paymentType: string;
    paymentModule: string;
    shippingModule: null;
    previousOrderStatus: null;
    orderStatus: string;
    creditCard: null;
    datePurchased: string;
    currency: string;
    customerAgreed: boolean;
    confirmedAddress: true;
    comments: null;
    customer: {
        id: number;
        emailAddress: string;
        billing: {
            postalCode: null | string;
            countryCode: null | string;
            firstName: string;
            lastName: string;
            bilstateOther: null | string;
            company: string;
            phone: string;
            address: null | string;
            city: null | string;
            stateProvince: null | string;
            billingAddress: boolean;
            latitude: null | string;
            longitude: null | string;
            zone: null | string;
            country: StaticRange;
        };
        delivery: AddressInterface;
        gender: string;
        language: string;
        firstName: string;
        lastName: string;
        provider: null | string;
        storeCode: null | string;
        userName: string;
        rating: number;
        ratingCount: number;
        attributes: any[];
        groups: [
            {
                name: 'CUSTOMER';
                type: 'CUSTOMER';
                id: string;
            }
        ];
        favoriteStores: [];
    };
    products: ProductCardInterface[];
    billing: {
        postalCode: null;
        countryCode: null;
        firstName: string;
        lastName: string;
        bilstateOther: null;
        company: string;
        phone: string;
        address: null;
        city: null;
        stateProvince: null;
        billingAddress: boolean;
        latitude: null;
        longitude: null;
        zone: null;
        country: string;
        email: string;
        countryName: null;
        provinceName: null;
    };
    delivery: AddressInterface;
    store: StoreInterface;
    total: {
        id: number;
        title: null | string;
        text: null | string;
        code: string;
        order: number;
        module: string;
        value: number;
    };
    tax: null;
    shipping: null;
}
