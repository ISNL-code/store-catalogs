import { StoreType, ViewModeType } from 'constants/types';

const prefix = 'kbm';

export const KREMEN_BELTS_MAIN = {
    URL: ['https://kremen-belts.netlify.app'],
    store_name: 'Kremen Belts',
    store_code: 'DEFAULT',
    token_key: `${prefix}-tkn`,
    cart_key: `${prefix}-cart`,
    favorite_url: `${prefix}-favorites`,
    base_url: 'https://kremen-belts.com/api',
    lang_key: `${prefix}-lang`,
    app_lang: 'ua',
    options: {
        main_price_multiplication: 1,
        sale_price_multiplication: 1,
        currency_multiplication: 1,
        custom_currency: null,
        store_type: StoreType?.default,
    },
    web_head_data: {
        store_title: 'Kremen Belts Wholesales Catalog | Kremen Belts Оптовий Каталог',
        store_description: `Ласкаво просимо до Kremen Belts — вашого найкращого джерела стильних ременів та аксесуарів! | Welcome to Kremen Belts — your ultimate source for stylish belts and accessories!`,
        google_analytics_id: 'G-7G98583PY1',
        store_logo: 'kremen_belts_logo.png',
    },
    user_options: { view_mode: ViewModeType?.grid_l },
};
