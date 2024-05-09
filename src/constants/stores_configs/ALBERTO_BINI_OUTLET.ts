import { StoreType, ViewModeType } from 'constants/types';

const prefix = 'abo';

export const ALBERTO_BINI_OUTLET = {
    active: true,
    URL: ['https://alberto-bini-outlet.netlify.app'],
    store_name: 'Alberto Bini Outlet',
    store_code: 'ALBERTO_BINI_SALES',
    token_key: `${prefix}-tkn`,
    cart_key: `${prefix}-cart`,
    favorite_url: `${prefix}-favorites`,
    base_url: 'https://kremen-belts.com/api',
    lang_key: `${prefix}-lang`,
    app_lang: 'ua',
    options: {
        main_price_multiplication: 3,
        sale_price_multiplication: 2,
        currency_multiplication: 40,
        custom_currency: '₴',
        store_type: StoreType?.sales,
    },
    web_head_data: {
        store_title: 'Alberto Bini Каталог | Alberto Bini Outlet Catalog ',
        store_description: `Ласкаво просимо до Alberto Bini — світу вишуканого жіночого верхнього одягу! Дослідіть наш широкий вибір високоякісних стильних пальт, тренчів та курток. Погрузіться в унікальний стиль та комфорт з Alberto Bini!  Welcome to Alberto Bini — the world of exquisite women's outerwear! Explore our wide selection of high-quality stylish coats, trenches, and jackets. Immerse yourself in unique style and comfort with Alberto Bini!`,
        google_analytics_id: 'G-C4TDRX7K5V',
        store_logo: 'alberto_bini_logo.png',
    },
    user_options: { view_mode: ViewModeType?.grid_l },
};
