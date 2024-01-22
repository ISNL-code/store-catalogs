import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useFavoritesProductsApi = () => {
    const { get, post, remove } = useApi();

    const useGetAllFavoritesProducts = ({ lang, count, page, storeCode }) => {
        return useQuery(
            ['get-all-favorites-products'],
            () =>
                get({
                    url: `/v1/auth/favoriteProducts?lang=${lang}&count=${count}&page=${page}&store=${storeCode}`,
                }),
            { enabled: !!lang }
        );
    };

    const useAddProductToFavorite = () =>
        useMutation(({ storeCode, data }: any) => {
            return post({
                url: `v1/auth/favoriteProducts?store=${storeCode}`,
                body: { ...data },
            });
        });

    const useDeleteProductToFavorite = () =>
        useMutation(({ variantId }: any) => {
            return remove({
                url: `v1/auth/favoriteProducts/${variantId}`,
            });
        });

    return {
        useAddProductToFavorite,
        useDeleteProductToFavorite,
        useGetAllFavoritesProducts,
    };
};
