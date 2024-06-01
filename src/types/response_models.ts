export interface Categories_Response_Interface {
    categories: Category_Data_Response_Interface[];
    totalPages: number;
    number: number;
    recordsTotal: number;
    recordsFiltered: number;
}

export interface Products_Response_Interface {
    products: Product_Data_Response_Interface[];
    number: number;
    recordsFiltered: number;
    recordsTotal: number;
    totalPages: number;
}

export interface User_Data_Response_Interface {
    id: number;
    emailAddress: string;
    billing: {
        postalCode: string | null;
        countryCode: string | null;
        firstName: string;
        lastName: string;
        bilstateOther: string | null;
        company: string | null;
        phone: string;
        address: string | null;
        city: string | null;
        stateProvince: string | null;
        billingAddress: boolean;
        latitude: number | null;
        longitude: number | null;
        zone: string | null;
        country: string;
    };
    delivery: {
        postalCode: string | null;
        countryCode: string | null;
        firstName: string;
        lastName: string;
        bilstateOther: string | null;
        company: string | null;
        phone: string;
        address: string | null;
        city: string | null;
        stateProvince: string | null;
        billingAddress: boolean;
        latitude: number | null;
        longitude: number | null;
        zone: string | null;
        country: string | null;
    };
    gender: string;
    language: string;
    firstName: string;
    lastName: string;
    provider: string | null;
    storeCode: string | null;
    userName: string;
    rating: number;
    ratingCount: number;
    attributes: any[];
    groups: {
        name: string;
        type: string;
        id: number;
    }[];
    favoriteStores: any[];
}

export interface Store_Data_Response_Interface {
    id: number;
    code: string;
    name: string;
    defaultLanguage: string;
    currency: string;
    inBusinessSince: string;
    email: string;
    phone: string;
    template: string | null;
    useCache: boolean;
    currencyFormatNational: boolean;
    retailer: boolean;
    dimension: string;
    weight: string;
    currentUserLanguage: string | null;
    address: {
        stateProvince: string | null;
        country: string;
        address: string;
        postalCode: string;
        city: string;
        active: boolean;
    };
    logo: {
        name: string;
        path: string;
    };
    parent: string | null;
    supportedLanguages: {
        code: string;
        id: number;
    }[];
    readableAudit: {
        created: string | null;
        modified: string;
        user: string;
    };
}

// ========= CATEGORIES INTERFACES ========== //

interface Category_Data_Response_Interface {
    id: number;
    code: string;
    description: Category_Description_Response_Interface;
    sortOrder: number;
    visible: boolean;
    featured: boolean;
    lineage: string;
    depth: number;
    parent: Category_Data_Response_Interface | null;
    productCount: number;
    store: string;
    children: Category_Data_Response_Interface[];
}

interface Category_Description_Response_Interface {
    id: number;
    language: string;
    name: string;
    description: string;
    friendlyUrl: string;
    keyWords: string | null;
    highlights: string;
    metaDescription: string;
    title: string;
}

// ========= PRODUCT INTERFACES ========== //

export interface Product_Data_Response_Interface {
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
    productSpecifications: {
        height: null | any;
        weight: null | any;
        length: null | any;
        width: null | any;
        model: null | any;
        manufacturer: null | any;
        dimensionUnitOfMeasure: string;
        weightUnitOfMeasure: string;
    };
    rating: number;
    ratingCount: number;
    refSku: null | any;
    rentalDuration: number;
    rentalPeriod: number;
    description: Description_Response_Interface;
    productPrice: {
        id: number;
        originalPrice: number;
        finalPrice: string;
        defaultPrice: boolean;
        discounted: boolean;
        description: null | any;
    };
    finalPrice: string;
    originalPrice: number;
    discounted: boolean;
    image: null | any;
    images: any[];
    manufacturer: Manufacturer;
    attributes: any[];
    options: Option_Response[];
    variants: Variant[];
    properties: any[];
    categories: Category_Description_Response_Interface[];
    type: null | any;
    canBePurchased: boolean;
    owner: null | any;
}

interface Option_Response {
    id: number;
    code: string;
    type: string;
    readOnly: boolean;
    name: string;
    lang: string;
    variant: boolean;
    optionValues: OptionValue_Response[];
}

interface OptionValue_Response {
    id: number;
    code: string;
    name: string;
    defaultValue: boolean;
    sortOrder: number;
    image: null | any;
    order: number;
    price: null | any;
    description: null | Description_Response_Interface;
}

interface Variant {
    id: number;
    productShipeable: boolean;
    available: boolean;
    visible: boolean;
    sortOrder: number;
    dateAvailable: string;
    creationDate: null | string;
    store: string;
    productId: number;
    sku: string;
    defaultSelection: boolean;
    variation: Variation;
    variationValue: null | any;
    code: string;
    images: Image[];
    inventory: Inventory[];
}

interface Variation {
    id: number;
    code: string;
    date: null | string;
    sortOrder: number;
    defaultValue: boolean;
    option: Option_Response;
    optionValue: OptionValue_Response;
}

interface Inventory {
    id: number;
    quantity: number;
    region: string;
    regionVariant: null | any;
    owner: null | any;
    dateAvailable: null | any;
    available: boolean;
    productQuantityOrderMin: number;
    productQuantityOrderMax: number;
    creationDate: null | any;
    store: Store_Data_Response_Interface;
    sku: string;
    prices: Price[];
    price: string;
}

interface Price {
    id: number;
    originalPrice: number;
    finalPrice: string;
    defaultPrice: boolean;
    discounted: boolean;
    description: null | any;
}

// SHARED interfaces
interface Description_Response_Interface {
    id: number;
    language: string;
    name: string;
    description: string;
    friendlyUrl: string;
    keyWords: null | string;
    highlights: string;
    metaDescription: string;
    title: string;
}

interface Image {
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

interface Manufacturer {
    id: number;
    code: string;
    order: number;
    description: Description_Response_Interface;
}
