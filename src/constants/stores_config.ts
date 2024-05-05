const domains = [
    {
        URL: ['http://localhost:3000'],
        store_code: 'ALBERTO_BINI',
        token_key: 'sn-shop-dev-tkn',
        cart_key: 'sn-shop-dev-cart',
        favorite_url: 'sn-shop-dev-favorites',
        base_url: 'https://kremen-belts.com/api',
    },
    {
        URL: ['https://alberto-bini.netlify.app'],
        store_code: 'ALBERTO_BINI',
        token_key: 'abm-tkn',
        cart_key: 'abm-cart',
        favorite_url: 'abm-favorites',
        base_url: 'https://kremen-belts.com/api',
    },
];

interface STORE_CONFIG_Interface {
    STORE_CODE: string; // use for get current store data
    ACCESS_TOKEN_KEY: string; // use for local storage
    BASE_URL: string; // use for auth interceptor
    CART_KEY: string; // use for local storage
    FAVORITE_KEY: string; // use for local storage
}

const storeConfig = (): STORE_CONFIG_Interface => {
    const currentUrl = window.location.href;
    const matchingDomain = domains.find(domain => domain.URL.some(url => currentUrl.includes(url)));

    return {
        STORE_CODE: matchingDomain?.store_code || '',
        BASE_URL: matchingDomain?.base_url || '',
        ACCESS_TOKEN_KEY: matchingDomain?.token_key || '',
        CART_KEY: matchingDomain?.cart_key || '',
        FAVORITE_KEY: matchingDomain?.favorite_url || '',
    };
};

export const STORE_CONFIG = storeConfig();
