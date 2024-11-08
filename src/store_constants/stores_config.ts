import { ALBERTO_BINI_EU_WS } from './stores_configs/ALBERTO_BINI_EU_WS';
import { ALBERTO_BINI_KZ_WS } from './stores_configs/ALBERTO_BINI_KZ_WS';
import { ALBERTO_BINI_MAIN } from './stores_configs/ALBERTO_BINI_MAIN';
import { ALBERTO_BINI_SALES } from './stores_configs/ALBERTO_BINI_SALES';
import { DEVELOP_STORE } from './stores_configs/A_DEVELOP_STORE';
import { PASMA } from './stores_configs/PASMA';
import { RETAIL_ALBERTO_BINI } from './stores_configs/RETAIL_ALBERTO_BINI';
import { YULIA_TRUBA_MAIN } from './stores_configs/YULIA_TRUBA_MAIN';
import { StoreType, STORE_CONFIG_Interface, ViewModeType } from './types';

const stores = [
    DEVELOP_STORE,
    ALBERTO_BINI_MAIN,
    ALBERTO_BINI_EU_WS,
    ALBERTO_BINI_SALES,
    YULIA_TRUBA_MAIN,
    RETAIL_ALBERTO_BINI,
    PASMA,
    ALBERTO_BINI_KZ_WS,
];

const storeConfig = (): STORE_CONFIG_Interface => {
    const currentUrl = window.location.origin;
    const matchingDomain = stores.find(domain => domain.URL.some(url => currentUrl.includes(url)));

    return {
        STORAGE_KEY: matchingDomain?.storage_key || 'sn_def',
        ACTIVE: matchingDomain?.active || false,
        STATUS: matchingDomain?.status || null,
        REQUIRED_REGISTRATION: matchingDomain?.required_registration || false,
        STORE_NAME: matchingDomain?.store_name || '',
        STORE_CODE: matchingDomain?.store_code || '',
        APP_LANGUAGE: matchingDomain?.app_lang || 'en',
        HTML_LANG: matchingDomain?.web_lang || 'en',
        SUPPORTED_COUNTRIES: matchingDomain?.supported_countries || null,
        SIDE_LINKS: matchingDomain?.links || [],
        TELEGRAM_SENDER: matchingDomain?.telegram_sender || false,
        MANAGERS: matchingDomain?.managers || null,
        OPTIONS: {
            NO_REG_ORDER: matchingDomain?.options?.no_reg_order || false,
            TELEGRAM_BOT: matchingDomain?.options?.telegram_bot || null,
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
                feedback: false,
                categories: false,
                productShare: false,
                cart: false,
                favorites: false,
                tableSizes: false,
            },
        },
        WEB_HEAD_DATA: {
            STORE_TITLE: matchingDomain?.web_head_data?.store_title || '',
            STORE_DESCRIPTION: matchingDomain?.web_head_data?.store_description || '',
            GOOGLE_ANALYTICS_ID: matchingDomain?.web_head_data?.google_analytics_id || '',
            GOOGLE_ADS_ID: matchingDomain?.web_head_data?.google_ads_id || '',
            CONVERSION_ID: matchingDomain?.web_head_data?.conversion_id || '',
            STORE_LOGO: matchingDomain?.web_head_data?.store_logo || '',
            STORE_POSTER: matchingDomain?.web_head_data?.store_poster || '',
            KEYWORDS: matchingDomain?.web_head_data?.keywords || {},
        },
        USER_OPTIONS: { VIEW_MODE: matchingDomain?.user_options?.view_mode || ViewModeType?.card },
        ALERTS: matchingDomain?.alerts || [],
    };
};

export const STORE_CONFIG = storeConfig();
