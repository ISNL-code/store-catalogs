export const STORES_DATA = [
    {
        code: 'ALBERTO_BINI',
        appStoreUrl: '',
        playMarketUrl: '',
        webUrl: 'https://alberto-bini.netlify.app',
        mainImage: require('./images/alb.jpeg'),
        productImagesOptions: { width: 6, height: 9, cropX: 0, cropY: 20 },
        descriptions: [
            {
                language: 'en',
                name: 'Store of Women`s Clothes',
                description: 'Store of Women`s Clothes',
                friendlyUrl: 'Store of Women`s Clothes',
                keyWords: 'Store of Women`s Clothes',
                highlights: 'Store of Women`s Clothes',
                metaDescription: 'Store of Women`s Clothes',
                title: 'Store of Women`s Clothes',
            },
        ],
        mainStoreSettings: {
            skuSearch: true,
            colors: true,
            prices: true,
            sizes: true,
            contacts: true,
            categories: true,
            browserSearch: true,
            productShare: true,
        },
        additionalStoreSettings: {
            cart: true,
            favorites: true,
            promo: true,
            video: false,
            tableSizes: true,
            callback: true,
            platformAvailable: true,
            appleStore: false,
            playMarket: false,
            analytics: true,
        },
        dataBaseStoreSettings: { users: 5, products: 200, productModels: 10, photos: 10, videos: 1 },
        securityStoreSettings: { private: false, securityKey: null },
        storeProductTypes: [
            {
                code: 'Outerwear',
            },
            {
                code: 'Women clothes',
            },
        ],
        managers: [
            {
                firstName: 'Alberto Bini Manager',
                lastName: '',
                emailAddress: 'salesnest.info@gmail.com',
                options: { manager: true },
                contacts: {
                    emailAddress: 'salesnest.info@gmail.com',
                    phone: '+380983080085',
                    viber: '+380983080085',
                    whatsapp: '+380983080085',
                    telegram: 'SNBusinessApp',
                },
            },
        ],
    },
];
