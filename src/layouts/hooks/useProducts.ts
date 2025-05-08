import { useProductsApi } from 'api/useProductsApi';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductDataInterface } from 'types/app_models';
import { map_product_card } from 'utils/mappers/product_data';
import { scrollPage } from 'utils/scrollPage';

interface Props {
    store: string;
    lang: string | null;
}

export const useProducts = ({ store, lang }: Props) => {
    const mount = useIsMount();
    const count = 35;

    const [queryCategories, setQueryCategories] = useState<string[] | []>([]);
    const [currentProductsPage, setCurrentProductsPage] = useState(0);
    const [productsList, setProductsList] = useState<ProductDataInterface[] | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [currentCount, setCurrentCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams(); // 👈 search params

    const {
        data: productGetData,
        isFetching: isLoadingProducts,
        refetch: refetchProducts,
        remove: removeProductsData,
    } = useProductsApi().useGetAllProducts({
        store,
        lang: lang || 'en',
        count,
        page: currentProductsPage,
        categories: queryCategories,
    });

    // 1️⃣ При первом монтировании взять категории из URL
    useEffect(() => {
        const catParams = searchParams.getAll('cat[]');
        if (catParams.length) {
            setQueryCategories(catParams.map(el => JSON.parse(el)));
        }
    }, []); // eslint-disable-line

    // 2️⃣ При изменении queryCategories обновить URL
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.delete('cat[]');

        if (queryCategories.length) {
            queryCategories.forEach(id => {
                params.append('cat[]', id);
            });
        }

        setSearchParams(params);
    }, [queryCategories]); // eslint-disable-line

    useEffect(() => {
        if (!productGetData) return;

        const newData = map_product_card?.catalog_card(productGetData?.data?.products);

        if (currentProductsPage)
            setProductsList(prevData => {
                if (prevData) {
                    return [...prevData, ...newData];
                } else return newData;
            });
        if (!currentProductsPage) {
            setProductsList(newData);
        }
        setTotalCount(productGetData?.data?.recordsTotal);
        setCurrentCount(productGetData?.data?.number);
        setTotalPages(productGetData?.data?.totalPages);
    }, [productGetData]); // eslint-disable-line

    const handleSkipData = () => {
        setCurrentProductsPage(0);
        setProductsList(null);
        setTotalCount(0);
        setCurrentCount(0);
        setTotalPages(0);
        scrollPage(0);
        removeProductsData();
        setTimeout(() => {
            refetchProducts();
        }, 200);
    };

    useEffect(() => {
        if (mount) return;
        handleSkipData();
    }, [queryCategories]); // eslint-disable-line

    useEffect(() => {
        if (mount) return;
        handleSkipData();
    }, [lang]); // eslint-disable-line

    useEffect(() => {
        if (mount) return;
        if (currentProductsPage === 0) return;
        refetchProducts();
    }, [currentProductsPage]); // eslint-disable-line

    const handleSetProductsPage = (val: number) => {
        if (totalPages <= currentProductsPage) return;

        setCurrentProductsPage(val);
    };

    return {
        isLoadingProducts,
        currentProductsPage,
        handleSetProductsPage,
        productsList,
        totalProductsCount: totalCount,
        productCountPerPage: currentCount,
        totalProductsPages: totalPages,
        setProductsList,
        queryCategories,
        setQueryCategories,
    };
};
