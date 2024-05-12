import { StoreType, ViewModeType } from 'constants/types';

const prefix = 'ab_kz';

export const ALBERTO_BINI_KZ = {
    active: true, // Поле которое запускает магазин true - работает false - остановлен / по тех. причина
    required_registration: false,
    URL: ['https://albertobini-kz.com'],
    appStoreUrl: null,
    playMarketUrl: null,
    web_lang: 'en', // html lang
    store_name: 'Alberto Bini KZ',
    store_code: 'alberto_bini_europe',
    token_key: `${prefix}-tkn`,
    cart_key: `${prefix}-cart`,
    favorite_url: `${prefix}-favorites`,
    base_url: 'https://kremen-belts.com/api',
    lang_key: `${prefix}-lang`,
    app_lang: 'kk',
    links: [],
    options: {
        product_image_options: { width: 6, height: 9 },
        main_price_multiplication: 1,
        sale_price_multiplication: 1,
        currency_multiplication: 1,
        custom_currency: null,
        store_type: StoreType?.wholesales,
        home_page_active: true,
        informative_page_active: true,
        custom_logo: true,
        plan_options: {
            prices: true,
            sizes: true,
            contacts: true,
            categories: true,
            productShare: true,
            cart: true,
            favorites: true,
            video: false,
            tableSizes: true,
            platformAvailable: true,
            appleStore: false,
            playMarket: false,
            admins: 5,
            products: 200,
            productModels: 10,
            photos: 10,
            videos: null,
        },
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
