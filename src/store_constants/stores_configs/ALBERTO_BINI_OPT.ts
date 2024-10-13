import { StoreType, ViewModeType } from 'store_constants/types';

export const ALBERTO_BINI_OPT = {
    storage_key: 'ab_ua-ws-opt',
    active: true, // Поле которое запускает магазин true - работает false - остановлен / по тех. причина
    status: 'Увага! Цей сайт припинив своє існування.', // показывает пока что в телеграме статус или причину почему каталог не работает
    required_registration: false,
    URL: ['https://albertobini-opt.netlify.app'],
    web_lang: 'uk', // html lang
    store_name: 'АБ ОСНОВНОЙ',
    store_code: 'ALBERTO_BINI',
    base_url: 'https://kremen-belts.com/api',
    app_lang: 'ua',
    supported_countries: [{ code: 'UA', country: 'ukraine' }],
    telegram_sender: true,
    links: [],
    managers: [
        {
            firstName: 'Natalya',
            lastName: '',
            emailAddress: 'natalya9899@gmail.com',
            options: { manager: true },
            contacts: {
                emailAddress: 'natalya9899@gmail.com',
                phone: '+380961234858',
                viber: '+380961234858',
                whatsapp: '+380961234858',
                telegram: '',
            },
        },
        {
            firstName: 'Manager 2',
            lastName: '',
            emailAddress: '',
            options: { manager: true },
            contacts: {
                emailAddress: '',
                phone: '+380983080085',
                viber: '+380983080085',
                whatsapp: '+380983080085',
                telegram: 'Albertobiniopt',
            },
        },
    ],
    options: {
        telegram_bot: [
            {
                token: '6904212535:AAGvPEjkJds0aayd-oD1YVMbhLKeKt72yaE',
                chatId: '480774886',
            },
            {
                token: '7501048516:AAFGRXP3nw7z0UWr4t-Dvz_oFt_98CFXX2k',
                chatId: '6221489796',
            },
        ],
        product_image_options: { width: 6, height: 9 },
        main_price_multiplication: 1,
        sale_price_multiplication: 1,
        currency_multiplication: 1,
        retail_price_multiplication: 1,
        min_items_to_buy: 1,
        store_type: StoreType?.sales,
        home_page_active: true,
        informative_page_active: true,
        custom_currency: '$',
        custom_logo: true,
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
        store_title: 'Alberto Bini Catalog | Alberto Bini Каталог',
        store_description: `Ласкаво просимо до Alberto Bini — світу вишуканого жіночого верхнього одягу! Дослідіть наш широкий вибір високоякісних стильних пальт, тренчів та курток. Погрузіться в унікальний стиль та комфорт з Alberto Bini! Welcome to Alberto Bini — the world of exquisite women's outerwear! Explore our wide selection of high-quality stylish coats, trenches, and jackets. Immerse yourself in unique style and comfort with Alberto Bini!`,
        google_analytics_id: 'G-C4TDRX7K5V',
        google_ads_id: '',
        conversion_id: '',
        store_logo: 'alberto_bini_logo.png',
        store_poster: 'alb.jpeg',
        keywords: {
            en: "women's outerwear, wholesale, retail, great prices, high quality, worldwide shipping",
            ru: 'женская верхняя одежда, оптом, в розницу, хорошие цены, высочайшее качество, продажа по всему миру',
            kk: 'әйелдер киімі, көтерме сауда, бөлшек сауда, жақсы бағалар, жоғары сапа, дүние жүзі бойынша жеткізу',
            uk: 'жіночий верхній одяг, оптом, у роздріб, гарні ціни, висока якість, продаж по всьому світу',
            pl: 'odzież damska, hurt, detal, dobre ceny, wysoka jakość, sprzedaż na całym świecie',
            cs: 'dámské svrchní oděvy, velkoobchod, maloobchod, dobré ceny, vysoká kvalita, prodej po celém světě',
            es: 'ropa exterior para mujeres, al por mayor, al por menor, buenos precios, alta calidad, venta en todo el mundo',
            fr: "vêtements d'extérieur pour femmes, en gros, au détail, bons prix, haute qualité, vente dans le monde entier",
        },
    },

    user_options: { view_mode: ViewModeType?.card },
    alerts: [],
};
