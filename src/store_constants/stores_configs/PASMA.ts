import { StoreType, ViewModeType } from 'store_constants/types';

export const PASMA = {
    storage_key: 'passma_ua-rt_my',
    active: true, // Поле которое запускает магазин true - работает false - остановлен / по тех. причина
    status: null,
    required_registration: false,
    URL: ['https://pasma-design.netlify.app'],
    web_lang: 'uk', // html lang
    store_name: 'Pasma Design',
    store_code: 'pasma_design',
    // store_code: 'ALBERTO_BINI',
    base_url: 'https://kremen-belts.com/api',
    app_lang: 'ua',
    supported_countries: null,
    telegram_sender: true,
    links: [],
    managers: [
        {
            firstName: 'Менеджер з продажiв',
            lastName: '',
            emailAddress: '',
            options: { manager: true },
            contacts: {
                emailAddress: '',
                phone: '+380668652127',
                viber: '',
                whatsapp: '',
                telegram: 'SNBusinessApp',
            },
        },
    ],
    options: {
        no_reg_order: true,
        telegram_bot: [
            {
                token: '7115237316:AAFgbrVadLWMkPt3TEdmravEa37jO9N3WSQ',
                chatId: '480774886',
            },
        ],
        product_image_options: { width: 6, height: 8 },
        main_price_multiplication: 1,
        sale_price_multiplication: 1,
        currency_multiplication: 1,
        retail_price_multiplication: 1,
        min_items_to_buy: 1,
        store_type: StoreType?.sales,
        home_page_active: false,
        informative_page_active: false,
        custom_currency: null,
        custom_logo: false,
        plan_options: {
            prices: true,
            sizes: true,
            contacts: true,
            feedback: true,
            categories: true,
            productShare: true,
            cart: true,
            favorites: true,
            tableSizes: true,
        },
    },
    web_head_data: {
        store_title: '',
        store_description: ``,
        google_analytics_id: 'G-SPMQE8GHGM',
        google_ads_id: '',
        conversion_id: '',
        store_logo: 'alberto_bini_logo.png',
        store_poster: 'alb.jpeg',
        keywords: {
            en: '',
            uk: '',
        },
    },
    user_options: { view_mode: ViewModeType?.card },
    alerts: [],
};
