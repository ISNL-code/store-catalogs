export const ALBERTO_BINI_KZ_DB = {
    code: 'alberto_bini_europe',
    mainImage: require('../images/posters/alb.jpeg'),
    descriptions: [
        {
            language: 'en',
            description: 'Store of Women`s Clothes',
        },
        {
            language: 'kz',
            description: 'Мұнайшақ Мәйірім Дүкені',
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
            emailAddress: 'salesnest.info@gmail.com',
            options: { manager: true },
            contacts: {
                emailAddress: '',
                phone: '+380983080085',
                viber: '+380983080085',
                whatsapp: '+380983080085',
                telegram: 'SNBusinessApp',
            },
        },
    ],
};
