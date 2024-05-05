import { ALBERTO_BINI_MAIN } from './stores_configs/ALBERTO_BINI_MAIN';
import { DEVELOP_STORE } from './stores_configs/A_DEVELOP_STORE';
import { StoreType, STORE_CONFIG_Interface } from './types';

const stores = [DEVELOP_STORE, ALBERTO_BINI_MAIN];

const storeConfig = (): STORE_CONFIG_Interface => {
    const currentUrl = window.location.href;
    const matchingDomain = stores.find(domain => domain.URL.some(url => currentUrl.includes(url)));

    return {
        STORE_CODE: matchingDomain?.store_code || '',
        BASE_URL: matchingDomain?.base_url || '',
        ACCESS_TOKEN_KEY: matchingDomain?.token_key || '',
        CART_KEY: matchingDomain?.cart_key || '',
        FAVORITE_KEY: matchingDomain?.favorite_url || '',
        OPTIONS: {
            MAIN_PRICE_MULTIPLICATION: matchingDomain?.options?.main_price_multiplication || 1,
            SALE_PRICE_MULTIPLICATION: matchingDomain?.options?.sale_price_multiplication || 1,
            CURRENCY_MULTIPLICATION: matchingDomain?.options?.currency_multiplication || 1,
            CUSTOM_CURRENCY: matchingDomain?.options?.custom_currency || null,
            STORE_TYPE: matchingDomain?.options?.store_type || StoreType?.default,
        },
    };
};

export const STORE_CONFIG = storeConfig();
