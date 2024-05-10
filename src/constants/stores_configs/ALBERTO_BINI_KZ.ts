import { StoreType, ViewModeType } from 'constants/types';

const prefix = 'ab_eu';

export const ALBERTO_BINI_KZ = {
    active: true, // Поле которое запускает магазин true - работает false - остановлен / по тех. причина
    URL: ['https://albertobini-kz.com'],
    web_lang: 'en', // html lang
    store_name: 'Alberto Bini KZ',
    store_code: 'alberto_bini_europe',
    token_key: `${prefix}-tkn`,
    cart_key: `${prefix}-cart`,
    favorite_url: `${prefix}-favorites`,
    base_url: 'https://kremen-belts.com/api',
    lang_key: `${prefix}-lang`,
    app_lang: 'kz',
    options: {
        main_price_multiplication: 1,
        sale_price_multiplication: 1,
        currency_multiplication: 1,
        custom_currency: null,
        store_type: StoreType?.default,
    },
    web_head_data: {
        store_title: 'Alberto Bini Оптовы каталогы | Alberto Bini Wholesales Catalog',
        store_description: `
        Қош келдіңіз Alberto Bini - жарлы жігерлі әйелдер үшін қонақтардың еліне! Біздің жанындағы көбінесе мол, артық өлшемдердің қолайлы қызметті көптық кепіл таңбаларын, тренчи, және жакеттерді зерттеңіз. Alberto Bini менің ерекше стильім мен комфорттық көріңіз! | Welcome to Alberto Bini — the world of exquisite women's outerwear! Explore our wide selection of high-quality stylish coats, trenches, and jackets. Immerse yourself in unique style and comfort with Alberto Bini!`,
        google_analytics_id: 'G-NFQK29FTWM',
        store_logo: 'alberto_bini_logo.png',
    },
    user_options: { view_mode: ViewModeType?.card },
};
