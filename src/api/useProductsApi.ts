import { UseQueryResult, useQuery } from '@tanstack/react-query';
import useApi from './useApi';
import { AxiosResponse } from 'axios';
import { Products_Response_Interface } from 'types/response_models';

interface GetAllProductsParams {
    store: string;
    lang: string;
    count: number;
    categories?: string[];
    page: number;
    queryIds?: number[];
    variantSku?: string[];
}

export const useProductsApi = () => {
    const { get } = useApi();

    const useGetAllProducts = ({
        store,
        lang,
        count,
        categories,
        page,
    }: GetAllProductsParams): UseQueryResult<AxiosResponse<Products_Response_Interface>, unknown> => {
        return useQuery(
            ['get-all-products', store, lang, count, categories, page],
            () =>
                get({
                    url: `/v2/products?store=${store}&lang=${lang}&count=${count}&page=${page}${
                        categories?.length ? '' : '&origin=customer'
                    }&available=true${categories?.length ? '&categoryIds=' + categories?.join(',') : ''}`,
                }),
            { cacheTime: 1000 * 60 * 5 }
        );
    };

    const useGetFavorites = ({
        store,
        lang,
        count,
        queryIds,
        page,
        variantSku,
    }: GetAllProductsParams): UseQueryResult<AxiosResponse<Products_Response_Interface>, unknown> => {
        return useQuery(
            ['get-favorites-products', variantSku],
            () =>
                get({
                    url: `/v2/products?store=${store}&lang=${lang}&count=${count}&page=${page}&origin=customer&available=true&productIds=${queryIds}`,
                }),
            { cacheTime: 1000 * 60 * 5, enabled: false }
        );
    };

    const useGetProductByID = ({ id, lang, storeCode }) => {
        return useQuery(
            ['get-product-by-id'],
            () =>
                get({
                    url: `/v2/products?lang=${lang}&store=${storeCode}&productIds=${id}&origin=customer&count=1000`,
                }),
            { enabled: !!lang }
        );
    };

    const useGetProductByIDForCart = ({ id, lang, storeCode }) => {
        return useQuery(
            ['for-cart-get-product-by-id'],
            () =>
                get({
                    url: `/v2/products/?lang=${lang}&store=${storeCode}&productIds=${id}&count=1000&origin=customer`,
                }),
            { enabled: false }
        );
    };

    const useGetProductBySku = ({ sku, storeCode, lang }) => {
        return useQuery(
            ['get-product-by-sku'],

            () =>
                get({
                    url: `v2/products?variantSku=${sku}&count=20&store=${storeCode}&lang=${lang}&available=true&page=0`,
                }),
            { enabled: !!sku }
        );
    };

    return {
        useGetAllProducts,
        useGetProductBySku,
        useGetProductByID,
        useGetProductByIDForCart,
        useGetFavorites,
    };
};
