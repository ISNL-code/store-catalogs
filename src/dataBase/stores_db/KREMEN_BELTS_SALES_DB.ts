export const KREMEN_BELTS_SALES_DB = {
    code: 'kremen_belts_sales',
    mainImage: require('../images/posters/belts.jpeg'),
    descriptions: [
        {
            language: 'ua',
            description: 'Магазин ременiв',
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
