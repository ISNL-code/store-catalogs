import { ALBERTO_BINI_EU } from './stores_configs/ALBERTO_BINI_EU';
import { ALBERTO_BINI_KZ } from './stores_configs/ALBERTO_BINI_KZ';
import { ALBERTO_BINI_MAIN } from './stores_configs/ALBERTO_BINI_MAIN';
import { ALBERTO_BINI_OUTLET } from './stores_configs/ALBERTO_BINI_OUTLET';
import { ALBERTO_BINI_SALES } from './stores_configs/ALBERTO_BINI_SALES';
import { DEVELOP_STORE } from './stores_configs/A_DEVELOP_STORE';
import { KREMEN_BELTS_MAIN } from './stores_configs/KREMEN_BELTS_MAIN';
import { KREMEN_BELTS_SALES } from './stores_configs/KREMEN_BELTS_SALES';
import { StoreType, STORE_CONFIG_Interface, ViewModeType } from './types';

const stores = [
    DEVELOP_STORE,
    ALBERTO_BINI_OUTLET,
    ALBERTO_BINI_MAIN,
    ALBERTO_BINI_KZ,
    ALBERTO_BINI_EU,
    KREMEN_BELTS_MAIN,
    ALBERTO_BINI_SALES,
    KREMEN_BELTS_SALES,
];

const storeConfig = (): STORE_CONFIG_Interface => {
    const currentUrl = window.location.href;
    const matchingDomain = stores.find(domain => domain.URL.some(url => currentUrl.includes(url)));

    return {
        APP_STORE_URL: matchingDomain?.appStoreUrl || null,
        PLAY_MARKET_URL: matchingDomain?.playMarketUrl || null,
        ACTIVE: matchingDomain?.active || true,
        STORE_NAME: matchingDomain?.store_name || '',
        STORE_CODE: matchingDomain?.store_code || '',
        BASE_URL: matchingDomain?.base_url || '',
        ACCESS_TOKEN_KEY: matchingDomain?.token_key || 'sales_nest_token',
        CART_KEY: matchingDomain?.cart_key || 'sales_nest_cart',
        FAVORITE_KEY: matchingDomain?.favorite_url || 'sales_nest_favorite',
        LANGUAGE_KEY: matchingDomain?.lang_key || 'sales_nest_lang',
        APP_LANGUAGE: matchingDomain?.app_lang || 'en',
        HTML_LANG: matchingDomain?.web_lang || 'en',
        VIEW_MODE_KEY: 'sales_nest_view_mode',
        SIDE_LINKS: matchingDomain?.links || [],
        OPTIONS: {
            PRODUCT_IMAGE_OPTIONS: matchingDomain?.options?.product_image_options || { width: 1, height: 1 },
            MAIN_PRICE_MULTIPLICATION: matchingDomain?.options?.main_price_multiplication || 1,
            SALE_PRICE_MULTIPLICATION: matchingDomain?.options?.sale_price_multiplication || 1,
            CURRENCY_MULTIPLICATION: matchingDomain?.options?.currency_multiplication || 1,
            CUSTOM_CURRENCY: matchingDomain?.options?.custom_currency || null,
            STORE_TYPE: matchingDomain?.options?.store_type || StoreType?.default,
            HOME_PAGE_ACTIVE: matchingDomain?.options?.home_page_active || false,
            CUSTOM_LOGO: matchingDomain?.options?.custom_logo || false,
            PLAN_OPTIONS: matchingDomain?.options?.plan_options || {
                prices: false,
                sizes: false,
                contacts: false,
                categories: false,
                productShare: false,
                cart: false,
                favorites: false,
                video: false,
                tableSizes: false,
                platformAvailable: false,
                appleStore: false,
                playMarket: false,
                admins: 1,
                products: 50,
                productModels: 5,
                photos: 5,
                videos: null,
            },
        },
        WEB_HEAD_DATA: {
            STORE_TITLE: matchingDomain?.web_head_data?.store_title || '',
            STORE_DESCRIPTION: matchingDomain?.web_head_data?.store_description || '',
            GOOGLE_ANALYTICS_ID: matchingDomain?.web_head_data?.google_analytics_id || '',
            STORE_LOGO: matchingDomain?.web_head_data?.store_logo || '',
        },
        USER_OPTIONS: { VIEW_MODE: matchingDomain?.user_options?.view_mode || ViewModeType?.grid_l },
    };
};

export const STORE_CONFIG = storeConfig();
