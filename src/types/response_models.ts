export interface CategoriesResponseInterface {
    totalPages: number;
    number: number;
    recordsTotal: number;
    recordsFiltered: number;
    categories: Category[];
}

interface Category {
    id: number;
    code: string;
    description: CategoryDescription;
    sortOrder: number;
    visible: boolean;
    featured: boolean;
    lineage: string;
    depth: number;
    parent: Category | null;
    productCount: number;
    store: string;
    children: Category[];
}

interface CategoryDescription {
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

export interface Product {
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
    description: Description;
    productPrice: {
        id: number;
        originalPrice: string;
        finalPrice: string;
        defaultPrice: boolean;
        discounted: boolean;
        description: null | any;
    };
    finalPrice: string;
    originalPrice: string;
    discounted: boolean;
    image: null | any;
    images: any[];
    manufacturer: Manufacturer;
    attributes: any[];
    options: Option[];
    variants: Variant[];
    properties: any[];
    categories: Category[];
    type: null | any;
    canBePurchased: boolean;
    owner: null | any;
}

interface Description {
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

interface Manufacturer {
    id: number;
    code: string;
    order: number;
    description: Description;
}

interface Option {
    id: number;
    code: string;
    type: string;
    readOnly: boolean;
    name: string;
    lang: string;
    variant: boolean;
    optionValues: OptionValue[];
}

interface OptionValue {
    id: number;
    code: string;
    name: null | string;
    defaultValue: boolean;
    sortOrder: number;
    image: null | any;
    order: number;
    price: null | any;
    description: null | Description;
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
    option: Option;
    optionValue: OptionValue;
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
    store: Store;
    sku: string;
    prices: Price[];
    price: string;
}

interface Store {
    id: number;
    code: string;
    name: string;
    defaultLanguage: string;
    currency: string;
    inBusinessSince: string;
    email: string;
    phone: string;
    template: null | any;
    useCache: boolean;
    currencyFormatNational: boolean;
    retailer: boolean;
    dimension: string;
    weight: string;
    currentUserLanguage: null | any;
    address: Address;
    logo: Logo;
    parent: null | any;
    supportedLanguages: SupportedLanguage[];
    readableAudit: ReadableAudit;
}

interface Address {
    stateProvince: null | any;
    country: string;
    address: string;
    postalCode: string;
    city: string;
    active: boolean;
}

interface Logo {
    name: string;
    path: string;
}

interface SupportedLanguage {
    code: string;
    id: number;
}

interface ReadableAudit {
    created: null | any;
    modified: string;
    user: string;
}

interface Price {
    id: number;
    originalPrice: string;
    finalPrice: string;
    defaultPrice: boolean;
    discounted: boolean;
    description: null | any;
}

interface Category {
    id: number;
    code: string;
    description: CategoryDescription;
    sortOrder: number;
    visible: boolean;
    featured: boolean;
    lineage: string;
    depth: number;
    parent: Category | null;
    productCount: number;
    store: string;
    children: Category[];
}

interface CategoryDescription {
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

export interface ProductsResponseInterface {
    number: number;
    products: Product[];
    recordsFiltered: number;
    recordsTotal: number;
    totalPages: number;
}

export interface ProductsResponseInterface {
    number: number;
    products: Product[];
    recordsFiltered: number;
    recordsTotal: number;
    totalPages: number;
}
