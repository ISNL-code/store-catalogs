import { useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useProductsApi = () => {
    const { get } = useApi();

    const useGetAllProducts = ({ store, lang, count, page, categories }) => {
        return useQuery(
            ['get-all-products'],

            () =>
                get({
                    url: `/v2/products?store=${store}&lang=${lang}&available=true&count=${count}&page=${page}&categoryIds=${categories}`,
                }),
            { enabled: !!lang }
        );
    };

    const useGetProductByID = ({ id, lang, store }) => {
        return useQuery(
            ['get-product-by-id'],

            () =>
                get({
                    url: `/v2/products/?lang=${lang}&store=${store}&productIds=${id}`,
                }),
            { enabled: !!store }
        );
    };

    const useGetProductBySku = ({ sku }) => {
        return useQuery(
            ['get-product-by-sku'],

            () =>
                get({
                    url: `v2/products?variantSku=${sku}&count=8`,
                }),
            { enabled: !!sku }
        );
    };

    return {
        useGetAllProducts,
        useGetProductBySku,
        useGetProductByID,
    };
};
