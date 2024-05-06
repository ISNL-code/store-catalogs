export enum StoreType {
    sales = 'sales',
    wholesales = 'wholesales',
    default = 'default',
}
export interface STORE_CONFIG_Interface {
    STORE_NAME: string;
    STORE_CODE: string; // use for get current store data
    ACCESS_TOKEN_KEY: string; // use for local storage
    BASE_URL: string; // use for auth interceptor
    CART_KEY: string; // use for local storage
    FAVORITE_KEY: string; // use for local storage
    OPTIONS: {
        MAIN_PRICE_MULTIPLICATION: number; // use in custom catalogs for multiple main prices
        SALE_PRICE_MULTIPLICATION: number; // use in custom catalogs for multiple sales prices
        CURRENCY_MULTIPLICATION: number; // use in custom catalogs for multiple  prices if use different from default currency
        CUSTOM_CURRENCY: string | null; // use in custom catalogs  if use different from default currency
        STORE_TYPE: StoreType; // use in custom catalogs for identification of store type
    };
    WEB_HEAD_DATA: { STORE_TITLE: string; STORE_DESCRIPTION: string; GOOGLE_ANALYTICS_ID: string; STORE_LOGO: string };
}
