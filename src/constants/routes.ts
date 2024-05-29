// ROOT

export const ROUTES = {
    LANDING: '/sales-nest/landing',
    SECURITY: '/sales-nest/security',
    HOME: '/sales-nest/home',
    STORE: '/sales-nest/store',
    NEW_PASSWORD: '/sales-nest/new-password',

    PAGE_401: '/sales-nest/auth-error',
    PAGE_403: '/sales-nest/bad-request',
    PAGE_404: '/sales-nest/page-not-found',
    PAGE_500: '/sales-nest/server-error',
};

// Landing Page

export const LANDING_ROUTE = {
    root: () => `${ROUTES?.LANDING}/welcome`,
    contacts: () => `${ROUTES?.LANDING}/contacts`,
};

// New Password

export const NEW_PASSWORD_ROUTE = {
    root: (storeCode, token) => `${ROUTES?.NEW_PASSWORD}/${storeCode}/${token}`,
};

// Login

export const LOGIN_ROUTE = {
    root: (storeCode, formType) => `${ROUTES?.SECURITY}/${storeCode}/${formType}`,
};

// Home

export const HOME_ROUTE = {
    root: storeCode => `${ROUTES?.HOME}/${storeCode}`,
};

// Catalog

export const STORE_ROUTE = {
    root: storeCode => `${ROUTES?.STORE}/${storeCode}`,
    product: (storeCode, productId, sku) =>
        `${ROUTES?.STORE}/${storeCode}/product/${productId}/model/${sku?.replaceAll('/', '_')}`,
    cart: storeCode => `${ROUTES?.STORE}/${storeCode}/cart`,
    favorites: storeCode => `${ROUTES?.STORE}/${storeCode}/favorites`,
    profile: storeCode => `${ROUTES?.STORE}/${storeCode}/profile`,
    orders: storeCode => `${ROUTES?.STORE}/${storeCode}/orders`,
    contacts: storeCode => `${ROUTES?.STORE}/${storeCode}/contacts`,
    info: storeCode => `${ROUTES?.STORE}/${storeCode}/info`,
};

// ERROR PAGES

export const ERROR_PAGE = {
    page_401: () => `${ROUTES?.PAGE_401}`,
    page_403: () => `${ROUTES?.PAGE_403}`,
    page_404: () => `${ROUTES?.PAGE_404}`,
    page_500: () => `${ROUTES?.PAGE_500}`,
};

// ADDITIONAL PATHS

export const SHARE_PATH = {
    share_product_sku: (storeCode, productId, sku) =>
        `${window.location.origin}${STORE_ROUTE?.product(storeCode, productId, sku)}`,
};

export const RESET_PASSWORD_PATH = storeCode => `${window.location.origin}${ROUTES?.NEW_PASSWORD}/${storeCode}`;
