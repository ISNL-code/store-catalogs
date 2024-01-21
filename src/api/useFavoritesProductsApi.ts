import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useFavoritesProductsApi = () => {
    const { get, post, remove } = useApi();

    // const useGetAllFavoritesProducts = ({ store, lang, count, page, categories }) => {
    //     return useQuery(
    //         ['get-all-products'],
    //         () =>
    //             get({
    //                 url: `/v2/products?store=${store}&lang=${lang}&available=true&count=${count}&page=${page}&categoryIds=${categories}`,
    //             }),
    //         { enabled: !!lang }
    //     );
    // };

    const useAddProductToFavorite = () =>
        useMutation(({ storeCode, data }: any) => {
            return post({
                url: `v1/auth/favoriteProducts?store=${storeCode}`,
                body: { ...data },
            });
        });

    const useDeleteProductToFavorite = () =>
        useMutation(({ storeCode }: any) => {
            return remove({
                url: `v2/auth/favoriteProducts?store=${storeCode}`,
            });
        });

    return {
        // useGetAllFavoritesProducts,
        useAddProductToFavorite,
        useDeleteProductToFavorite,
    };
};
