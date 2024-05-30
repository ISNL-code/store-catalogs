export interface DialogStateInterface {
    imageUrl?: string;
    note?: string;
}

export interface LocalStorageProductInterface {
    productId?: number;
    variantSku: string;
    storeCode?: string;
    userId?: number;
}
export interface useAddToCartDataInterface {
    cartItems: LocalStorageProductInterface[];
    handleSetCartItems: (data: LocalStorageProductInterface) => void;
    handleClearCartItems: (array: string[]) => void;
    handleClearCart: () => void;
}

export interface useAddToFavoriteDataInterface {
    favoriteItems: LocalStorageProductInterface[];
    handleSetFavoriteItems: (data: LocalStorageProductInterface) => void;
    handleClearFavorites: () => void;
}

export interface OrderInterface {
    id: number;
    orderStatus: string;
    datePurchased: string;
    products: any;
    total: { value: string };
    currency: string;
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
    supportedLanguages: any[];
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

interface ImageInterface {
    id: number;
    imageUrl: string;
    order: number;
    imageType: number;
    imageName: string;
    externalUrl: null | any;
    videoUrl: null | any;
    defaultImage: boolean;
    imageSizeTable: boolean;
}

export interface ProductVariantInterface {
    variantId: number;
    productId: number;
    productSku: string;
    variantSku: string;
    images: ImageInterface[];
    originalPrice: number;
    price: string;
    quantity: number;
    selected: boolean;
    colorCode: string;
    colorName: string | null;
}

export interface ProductDataInterface {
    id: number;
    name: string;
    description: string;
    table_size_img: { imageUrl: string };
    variants: ProductVariantInterface[];
    originalPrice: string | number;
    promoTags: any[];
    productSizes: any[];
}

export interface FavoritesProductsInterface {
    attributes: any[];
    favoriteProductId: number;
    variantId: number;
    product: ProductDataInterface;
}

export interface CategoryDataInterface {
    depth: number;
    id: number;
    parent: any;
    children: any[];
    description: any;
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

export interface OptionValueInterface {
    id: number;
    code: string;
    name: string;
    defaultValue: boolean;
    sortOrder: number;
    image: string | number | null;
    order: number;
    price: string | number | null;
    description: DescriptionInterface;
}

export interface DescriptionInterface {
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

export interface ChildCategoryInterface {
    id: number;
    code: string;
    description: DescriptionInterface;
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
    description: DescriptionInterface;
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
    description: DescriptionInterface;
    sortOrder: number;
    visible: boolean;
    featured: boolean;
    lineage: string;
    depth: number;
    parent: {
        id: number;
        code: string;
        description: DescriptionInterface;
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
