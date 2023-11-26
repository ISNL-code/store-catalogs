import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useStoresApi = () => {
    const { get, post, remove } = useApi();

    const useGetAllStores = () => {
        return useQuery(
            ['get-all-stores'],

            () =>
                get({
                    url: `v1/stores?count=10&page=0`,
                })
        );
    };

    const useGetAllFavoritesStores = ({ auth }) => {
        return useQuery(
            ['get-all-favorites-stores'],

            () =>
                get({
                    url: `v1/auth/favoriteStores`,
                }),
            { enabled: !!auth, retryOnMount: false }
        );
    };

    const useAddStoreToFavorite = () =>
        useMutation(({ storeCode }: any) => {
            return post({
                url: `v1/auth/favoriteStores/${storeCode}`,
            });
        });

    const useDeleteStoreToFavorite = () =>
        useMutation(({ storeCode }: any) => {
            return remove({
                url: `v1/auth/favoriteStores/${storeCode}`,
            });
        });

    const useGetStoresList = [
        {
            code: 'DEFAULT',
            //additional
            description: 'Store of women clothes', //multi lang
            imgUrl: 'https://images.shafastatic.net/295652074',
            //
            imgHeight: 9,
            imgWidth: 6,
            cropX: 60,
            cropY: 0,
            //
            withCart: true,
            withFilters: true,
            withFavorites: true,
            withSKUSearch: true,
            withContacts: true,
            withPrices: true,
            withSizes: true,
            withShare: true,
            //
            productTypes: [{ id: 100, code: 'outerwear' }],
            //
            // sizesTable: '', //image
            private: false,
            key_password: null,
            approvedUsers: [{}],
            //
            contacts: {
                location: '',
                managers: [
                    {
                        id: 1,
                        first_name: 'Natalya',
                        last_name: 'Shevchenko',
                        email: 'alb2014@gmail.com',
                        phone_number: '+380632325848',
                        telegram: 'NASBINI',
                        viber: '+380632325848',
                        whatsapp: '+380632325848',
                    },
                ],
            },
        },
        {
            code: 'Test',
            description: 'Store of Women Bags',
            imgUrl: 'https://static.toiimg.com/thumb/msid-85528909,width-400,resizemode-4/85528909.jpg',
            imgHeight: 9,
            imgWidth: 6,
            cropX: 0,
            cropY: 0,
            withCart: true,
            withFilters: true,
            withFavorites: true,
            withSize: false,
            withSKUSearch: true,
            withContacts: true,
            withPrices: true,
            addedFavorite: false,
            withShare: true,
            productTypes: [{ id: 102, code: 'shoes' }],
            private: false,
            key_password: null,
            aprovedUsers: [
                {
                    id: 1,
                    email: 'sellernew3@gmail.com',
                    phoneNumber: '+380665738771',
                },
                {
                    id: 2,
                    email: 'dmytro.orgish88@gmail.com',
                    phoneNumber: '+380665738771',
                },
            ],
            contacts: {
                managers: [
                    {
                        id: 1,
                        first_name: 'Dmytro',
                        last_name: 'Orgish',
                        email: 'dmytro.orgish88@gmail.com',
                        phone_number: '+380665738771',
                        telegram: 'DmytroOrgish',
                        viber: '+380665738771',
                        whatsapp: '+380665738771',
                    },
                ],
            },
        },
        {
            code: 'KREMEN',
            description: 'Store of UA belts',
            imgUrl: 'https://content1.rozetka.com.ua/goods/images/big_tile/276698449.jpg',
            imgHeight: 3,
            imgWidth: 4,
            cropX: 0,
            cropY: 0,
            withCart: false,
            withFilters: false,
            withFavorites: false,
            withSKUSearch: false,
            withContacts: false,
            withPrices: false,
            addedFavorite: false,
            withShare: false,
            withSize: false,
            productTypes: [{ id: 101, code: 'belt' }],
            private: true,
            key_password: 'q',
            contacts: {
                managers: [
                    {
                        id: 1,
                        first_name: 'Dmytro',
                        last_name: 'Orgish',
                        email: 'dmytro.orgish88@gmail.com',
                        phone_number: '+380665738771',
                        telegram: 'DmytroOrgish',
                        viber: '+380665738771',
                        whatsapp: '+380665738771',
                    },
                ],
            },
        },
        {
            code: 'johnlewis',
            description: 'Store of women bags',
            imgUrl: 'https://www.weareteachers.com/wp-content/uploads/personalized-apple-teacher-tote-bag-400x300.jpg',
            imgHeight: 3,
            imgWidth: 4,
            cropX: 0,
            cropY: 0,
            withCart: true,
            withFilters: true,
            withFavorites: true,
            withSKUSearch: true,
            withContacts: true,
            withPrices: true,
            withSize: false,
            addedFavorite: true,
            withShare: true,
            productTypes: [{ id: 112, code: 'bags' }],
            private: false,
            key_password: null,
            contacts: {
                managers: [
                    {
                        id: 1,
                        first_name: 'Dmytro',
                        last_name: 'Orgish',
                        email: 'dmytro.orgish88@gmail.com',
                        phone_number: '+380665738771',
                        telegram: 'DmytroOrgish',
                        viber: '+380665738771',
                        whatsapp: '+380665738771',
                    },
                ],
            },
        },
    ];

    const useGetStoreByCode = ({ code }) => {
        return useQuery(
            ['get-store-by-code'],

            () =>
                get({
                    url: `v1/store/${code}`,
                })
        );
    };

    // const useGetStoreByID = code => {
    //     const { data, remove } = useGetStoreByCode({ code });

    //     return { ...data?.data, ...useGetStoresList.find(store => store.code === code) } as any;
    // };

    const useEnterStoreKey = ({ storeKey, storeCode }) => {
        const checkedStore = useGetStoresList.find(el => el.code === storeCode)?.key_password === storeKey;
        return checkedStore;
    };

    return {
        useGetStoresList,
        useEnterStoreKey,
        useGetAllStores,
        useAddStoreToFavorite,
        useGetAllFavoritesStores,
        useDeleteStoreToFavorite,
        useGetStoreByCode,
    };
};
