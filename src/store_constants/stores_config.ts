import { ALBERTO_BINI_EU_RETAIL } from './stores_configs/ALBERTO_BINI_EU_RETAIL';
import { ALBERTO_BINI_EU_WS } from './stores_configs/ALBERTO_BINI_EU_WS';
import { ALBERTO_BINI_KZ_RETAIL } from './stores_configs/ALBERTO_BINI_KZ_RETAIL';
import { ALBERTO_BINI_KZ_WS } from './stores_configs/ALBERTO_BINI_KZ_WS';
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
    ALBERTO_BINI_KZ_WS,
    ALBERTO_BINI_EU_WS,
    ALBERTO_BINI_EU_RETAIL,
    ALBERTO_BINI_KZ_RETAIL,
    KREMEN_BELTS_MAIN,
    ALBERTO_BINI_SALES,
    KREMEN_BELTS_SALES,
];

const storeConfig = (): STORE_CONFIG_Interface => {
    const currentUrl = window.location.origin;
    const matchingDomain = stores.find(domain => domain.URL.some(url => currentUrl.includes(url)));

    return {
        STORAGE_KEY: matchingDomain?.storage_key || 'sn_def',
        APP_STORE_URL: matchingDomain?.appStoreUrl || null,
        PLAY_MARKET_URL: matchingDomain?.playMarketUrl || null,
        ACTIVE: matchingDomain?.active || true,
        REQUIRED_REGISTRATION: matchingDomain?.required_registration || false,
        STORE_NAME: matchingDomain?.store_name || '',
        STORE_CODE: matchingDomain?.store_code || '',
        BASE_URL: matchingDomain?.base_url || '',
        APP_LANGUAGE: matchingDomain?.app_lang || 'en',
        HTML_LANG: matchingDomain?.web_lang || 'en',
        SUPPORTED_COUNTRIES: matchingDomain?.supported_countries || null,
        SIDE_LINKS: matchingDomain?.links || [],
        TELEGRAM_SENDER: matchingDomain?.telegram_sender || false,
        OPTIONS: {
            PRODUCT_IMAGE_OPTIONS: matchingDomain?.options?.product_image_options || { width: 1, height: 1 },
            MAIN_PRICE_MULTIPLICATION: matchingDomain?.options?.main_price_multiplication || 1,
            SALE_PRICE_MULTIPLICATION: matchingDomain?.options?.sale_price_multiplication || 1,
            CURRENCY_MULTIPLICATION: matchingDomain?.options?.currency_multiplication || 1,
            RETAIL_PRICE_MULTIPLICATION: matchingDomain?.options?.retail_price_multiplication || 1,
            CUSTOM_CURRENCY: matchingDomain?.options?.custom_currency || null,
            MIN_ITEMS_TO_BUY: matchingDomain?.options?.min_items_to_buy || 1,
            STORE_TYPE: matchingDomain?.options?.store_type || StoreType?.default,
            HOME_PAGE_ACTIVE: matchingDomain?.options?.home_page_active || false,
            INFORMATION_PAGE_ACTIVE: matchingDomain?.options?.informative_page_active || false,
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
            STORE_POSTER: matchingDomain?.web_head_data?.store_poster || '',
            KEYWORDS: matchingDomain?.web_head_data?.keywords || {},
        },
        USER_OPTIONS: { VIEW_MODE: matchingDomain?.user_options?.view_mode || ViewModeType?.card },
    };
};

export const STORE_CONFIG = storeConfig();
