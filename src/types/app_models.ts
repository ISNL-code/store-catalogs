export interface DialogStateInterface {
    imageUrl?: string;
    note?: string;
    availableSizes?: { name?: string; code?: string }[];
    variantSku?: string;
}

export interface LocalStorageProductInterface {
    productId: number;
    variantSku: string;
    storeCode: string;
}
export interface useAddToCartDataInterface {
    cartItems: LocalStorageProductInterface[];
    handleSetCartItems: (data: LocalStorageProductInterface) => void;
    handleClearCartItems: (array: string[]) => void;
    handleClearCart: () => void;
    clearSingleItem: (val) => void;
}

export interface useAddToFavoriteDataInterface {
    favoriteItems: LocalStorageProductInterface[];
    handleSetFavoriteItems: (data: LocalStorageProductInterface) => void;
    handleClearFavorites: () => void;
    clearSingleItem: (val) => void;
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
    currency: string;
    logo: { path: string };
    supportedLanguages: {
        code: string;
        id: number;
    }[];
    code: string;
    name: string;
    // need to add backend now from hard code
    managers?: {
        firstName: string;
        lastName: string;
        emailAddress: string;
        options: { manager: boolean };
        contacts: {
            emailAddress?: string;
            phone?: string;
            viber?: string;
            whatsapp?: string;
            telegram?: string;
        };
    }[];
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
    language: string;
    firstName: string;
    lastName: string;
    storeCode: null;
    userName: string;
}

export interface ImageInterface {
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
    price: number;
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
    discounted: boolean;
    variants: ProductVariantInterface[];
    originalPrice: number;
    promoTags: any[];
    productSizes: any[];
    options: {
        id: number;
        code: string | 'SIZE' | 'COLOR' | 'PROMO';
        type: string;
        name: string | 'SIZE' | 'COLOR' | 'PROMO';
        variant: boolean;
        optionValues: {
            id: number;
            code: string;
        }[];
    }[];
}

export interface CategoryDataInterface {
    id: number;
    depth: number;
    parent: CategoryDataInterface | null;
    description: DescriptionInterface;
    children: CategoryDataInterface[];
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
