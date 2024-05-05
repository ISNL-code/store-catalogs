import { StoreType } from 'constants/types';

export const KREMEN_BELTS_MAIN = {
    URL: ['https://kremen-belts.netlify.app'],
    store_code: 'DEFAULT',
    token_key: 'kbm-tkn',
    cart_key: 'kbm-cart',
    favorite_url: 'kbm-favorites',
    base_url: 'https://kremen-belts.com/api',
    options: {
        main_price_multiplication: 1,
        sale_price_multiplication: 1,
        currency_multiplication: 1,
        custom_currency: null,
        store_type: StoreType?.default,
    },
    web_head_data: { store_title: '', store_description: '' },
};
