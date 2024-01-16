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
        useMutation(({ storeCode }: any) => {
            return post({
                url: `v2/auth/favoriteProducts?store=${storeCode}`,
                body: { attributes: [{ id: 0, name: 'name', variant: true }], productId: 0, variantId: 0 },
            });
        });

    const useDeleteProductToFavorite = () =>
        useMutation(({ storeCode }: any) => {
            return remove({
                url: `v1/auth/favoriteStores/${storeCode}`,
            });
        });

    return {
        // useGetAllFavoritesProducts,
        useAddProductToFavorite,
        useDeleteProductToFavorite,
    };
};
