export const ALBERTO_BINI_MAIN_DB = {
    code: 'ALBERTO_BINI', // main
    mainImage: require('../images/posters/alb.jpeg'),
    descriptions: [
        {
            language: 'ua',
            description: 'Магазин жiночого одягу',
        },
        {
            language: 'en',
            description: 'Store of Women`s Clothes',
        },
        {
            language: 'ru',
            description: 'Магазин Женской Одежды',
        },
    ],

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
};
