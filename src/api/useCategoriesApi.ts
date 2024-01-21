import { useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useCategoriesApi = () => {
    const { get } = useApi();

    const useGetAllCategories = ({ store, lang }) => {
        return useQuery(
            //query key
            ['get-all-product-categories'],
            //get function
            () => get({ url: `/v1/category?lang=${lang}&store=${store}&count=1000&page=0` }),
            { enabled: !!store && !!lang }
        );
    };

    return {
        useGetAllCategories,
    };
};
