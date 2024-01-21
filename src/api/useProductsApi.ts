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

    const useGetProductByID = ({ id, lang, storeCode }) => {
        return useQuery(
            ['get-product-by-id'],
            () =>
                get({
                    url: `/v2/products/?lang=${lang}&store=${storeCode}&productIds=${id}&count=1000`,
                }),
            { enabled: !!lang }
        );
    };

    const useGetProductByIDForCart = ({ id, lang, storeCode }) => {
        return useQuery(
            ['for-cart-get-product-by-id'],
            () =>
                get({
                    url: `/v2/products/?lang=${lang}&store=${storeCode}&productIds=${id}&count=1000`,
                }),
            { enabled: false }
        );
    };

    const useGetProductBySku = ({ sku, storeCode }) => {
        return useQuery(
            ['get-product-by-sku'],

            () =>
                get({
                    url: `v2/products?variantSku=${sku}&count=20&store=${storeCode}`,
                }),
            { enabled: !!sku }
        );
    };

    return {
        useGetAllProducts,
        useGetProductBySku,
        useGetProductByID,
        useGetProductByIDForCart,
    };
};
