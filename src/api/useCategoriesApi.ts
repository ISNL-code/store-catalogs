import { UseQueryResult, useQuery } from '@tanstack/react-query';
import useApi from './useApi';
import { AxiosResponse } from 'axios';
import { Categories_Response_Interface } from 'types/response_models';

interface GetAllCategoriesParams {
    store: string;
    lang: string;
}

export const useCategoriesApi = () => {
    const { get } = useApi();

    const useGetAllCategories = ({
        store,
        lang,
    }: GetAllCategoriesParams): UseQueryResult<AxiosResponse<Categories_Response_Interface>, unknown> => {
        return useQuery(
            // query key
            ['get-all-product-categories', lang],
            // get function
            () => get({ url: `/v1/category?lang=${lang}&store=${store}&count=1000&page=0` }),
            { enabled: !!store && !!lang }
        );
    };

    return {
        useGetAllCategories,
    };
};
