import { StoreType } from 'constants/types';

export const ALBERTO_BINI_MAIN = {
    URL: ['https://alberto-bini.netlify.app'],
    store_name: 'Alberto Bini',
    store_code: 'ALBERTO_BINI',
    token_key: 'abm-tkn',
    cart_key: 'abm-cart',
    favorite_url: 'abm-favorites',
    base_url: 'https://kremen-belts.com/api',
    options: {
        main_price_multiplication: 1,
        sale_price_multiplication: 1,
        currency_multiplication: 1,
        custom_currency: null,
        store_type: StoreType?.default,
    },
    web_head_data: {
        store_title: 'Alberto Bini Wholesales Catalog | Alberto Bini Оптовий Каталог',
        store_description: `Ласкаво просимо до Alberto Bini — світу вишуканого жіночого верхнього одягу! Дослідіть наш широкий вибір високоякісних стильних пальт, тренчів та курток. Погрузіться в унікальний стиль та комфорт з Alberto Bini!  Welcome to Alberto Bini — the world of exquisite women's outerwear! Explore our wide selection of high-quality stylish coats, trenches, and jackets. Immerse yourself in unique style and comfort with Alberto Bini!`,
        google_analytics_id: 'G-C4TDRX7K5V',
        store_logo: 'alberto_bini_logo.png',
    },
};
