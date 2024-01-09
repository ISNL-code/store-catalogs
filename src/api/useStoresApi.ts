import { useMutation, useQuery } from '@tanstack/react-query';
import { STORES_DATA } from 'dataBase/STORES';
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
        const checkedStore =
            STORES_DATA.find(el => el.code === storeCode)?.securityStoreSettings?.securityKey === storeKey;
        return checkedStore;
    };

    return {
        useEnterStoreKey,
        useGetAllStores,
        useAddStoreToFavorite,
        useGetAllFavoritesStores,
        useDeleteStoreToFavorite,
        useGetStoreByCode,
    };
};
