import { StoreType, ViewModeType } from 'constants/types';

const prefix = 'abs';

export const ALBERTO_BINI_SALES = {
    active: true,
    URL: ['https://alberto-bini-sales.netlify.app'],
    web_lang: 'uk', // html lang
    store_name: 'Alberto Bini Sales',
    store_code: 'ALBERTO_BINI_SALES',
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
        home_page_active: false,
    },
    web_head_data: {
        store_title: 'Alberto Bini Wholesales Catalog | Alberto Bini Оптовий Каталог',
        store_description: `Ласкаво просимо до Alberto Bini — світу вишуканого жіночого верхнього одягу! Дослідіть наш широкий вибір високоякісних стильних пальт, тренчів та курток. Погрузіться в унікальний стиль та комфорт з Alberto Bini!  Welcome to Alberto Bini — the world of exquisite women's outerwear! Explore our wide selection of high-quality stylish coats, trenches, and jackets. Immerse yourself in unique style and comfort with Alberto Bini!`,
        google_analytics_id: 'G-C4TDRX7K5V',
        store_logo: 'alberto_bini_logo.png',
    },
    user_options: { view_mode: ViewModeType?.card },
};
