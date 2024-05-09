import { StoreType, ViewModeType } from 'constants/types';

const prefix = 'kbs';

export const KREMEN_BELTS_SALES = {
    URL: ['https://kremen-belts-sales.netlify.app'],
    store_name: 'Kremen Belts Sales',
    store_code: 'kremen_belts_sales',
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
        store_type: StoreType?.sales,
    },
    web_head_data: {
        store_title: ' Kremen Belts Оптовий Каталог | Kremen Belts Wholesales Catalog',
        store_description: `Ласкаво просимо до Kremen Belts — вашого найкращого джерела стильних ременів та аксесуарів! | Welcome to Kremen Belts — your ultimate source for stylish belts and accessories!`,
        google_analytics_id: 'G-7G98583PY1',
        store_logo: 'kremen_belts_logo.png',
    },
    user_options: { view_mode: ViewModeType?.grid_l },
};
