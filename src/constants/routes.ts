// Login

export const LOGIN_ROUTE = {
    root: () => `/login`,
};

// Home

export const HOME_ROUTE = {
    root: storeCode => `/home/${storeCode}`,
    contacts: storeCode => `/home/${storeCode}/contacts`,
    profile: storeCode => `/home/${storeCode}/profile`,
    orders: storeCode => `/home/${storeCode}/orders`,
    info: storeCode => `/home/${storeCode}/info`,
};

// Catalog

export const STORE_ROUTE = {
    root: storeCode => `/store/${storeCode}`,
    contacts: storeCode => `/store/${storeCode}/contacts`,
    profile: storeCode => `/store/${storeCode}/profile`,
    orders: storeCode => `/store/${storeCode}/orders`,
    product: (storeCode, productId, sku) =>
        `/store/${storeCode}/product/${productId}/model/${sku?.replaceAll('/', '_')}`,
    cart: storeCode => `/store/${storeCode}/cart`,
    favorites: storeCode => `/store/${storeCode}/favorites`,
};

export const SHARE_PATH = {
    share_product_sku: (storeCode, productId, sku) =>
        `${window.location.origin}${STORE_ROUTE?.product(storeCode, productId, sku)}`,
};
