import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';
import { AxiosResponse } from 'axios';
import { Store_Data_Response_Interface } from 'types/response_models';

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

    const useGetStoreByCode = ({ code }): UseQueryResult<AxiosResponse<Store_Data_Response_Interface>, unknown> => {
        return useQuery(
            ['get-store-by-code'],

            () =>
                get({
                    url: `v1/store/${code}`,
                })
        );
    };

    return {
        useGetAllStores,
        useAddStoreToFavorite,
        useGetAllFavoritesStores,
        useDeleteStoreToFavorite,
        useGetStoreByCode,
    };
};
