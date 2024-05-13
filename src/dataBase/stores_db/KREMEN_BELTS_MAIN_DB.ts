export const KREMEN_BELTS_MAIN_DB = {
    code: 'DEFAULT', //main
    mainImage: require('../images/posters/belts.jpeg'),
    descriptions: [
        {
            language: 'ua',
            description: 'Магазин ременiв',
        },
        {
            language: 'en',
            description: 'Belts Store',
        },
        {
            language: 'ru',
            description: 'Магазин ремней',
        },
    ],
    storeProductTypes: [{ code: 'Men clothes' }, { code: 'Women clothes' }, { code: 'Belts' }],
    securityStoreSettings: { private: false, securityKey: null },
    managers: [
        {
            firstName: 'Sergey',
            lastName: '',
            emailAddress: 'Kremen.katalog@gmail.com',
            options: { manager: true },
            contacts: {
                emailAddress: 'Kremen.katalog@gmail.com',
                phone: '+380660355716',
                viber: '+380660355716',
                whatsapp: '+380660355716',
                telegram: '',
            },
        },
    ],
};
