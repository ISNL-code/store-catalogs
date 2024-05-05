import { StoreType } from 'constants/types';

export const DEVELOP_STORE = {
    URL: ['http://localhost:3000'],
    store_code: 'DEFAULT',
    token_key: 'sn-shop-dev-tkn',
    cart_key: 'sn-shop-dev-cart',
    favorite_url: 'sn-shop-dev-favorites',
    base_url: 'https://kremen-belts.com/api',
    options: {
        main_price_multiplication: 1,
        sale_price_multiplication: 1,
        currency_multiplication: 1,
        custom_currency: null,
        store_type: StoreType?.default,
    },
};
