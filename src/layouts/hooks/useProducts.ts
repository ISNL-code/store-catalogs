import { useProductsApi } from 'api/useProductsApi';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { StoreType } from 'store_constants/types';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { LoadedProductListInterface } from 'types';
import { useDevice } from 'hooks/useDevice';

interface Props {
    store: string;
    lang: string | null;
}

export const useProducts = ({ store, lang }: Props) => {
    const { sx } = useDevice();
    const { OPTIONS } = STORE_CONFIG;
    const { STORE_TYPE } = OPTIONS;
    const mount = useIsMount();
    const count = sx ? 28 : 35;

    const [queryCategories, setQueryCategories] = useState<string[] | []>([]);

    const [currentProductsPage, setCurrentProductsPage] = useState(0);
    const [productsList, setProductsList] = useState<LoadedProductListInterface[] | [] | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [currentCount, setCurrentCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const {
        data: productGetData,
        isFetching: loadProducts,
        isLoading: loadMoreProducts,
        refetch: fetchProducts,
    } = useProductsApi().useGetAllProducts({
        store,
        lang,
        count,
        page: currentProductsPage,
        categories: queryCategories,
    });

    useEffect(() => {
        if (!productGetData || loadMoreProducts || loadMoreProducts) return;

        const prevData = currentProductsPage ? productsList || [] : [];
        const newData = productGetData?.data?.products?.map(product => {
            const originalPrice =
                STORE_TYPE === StoreType.sales
                    ? Math.max(...product.variants?.map(el => Number(el.inventory[0]?.price)))
                    : Number(product.price);

            return {
                id: product.id,
                variants: product.variants
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .filter(el => (STORE_TYPE === StoreType.sales ? el.images.length : true))
                    .map((variant, idx) => ({
                        id: variant.id,
                        productId: variant.productId,
                        selected: idx === 0,
                        price: variant.inventory[0]?.price,
                        images: variant.images,
                        colorCode: variant.variation.optionValue.code,
                        sku: variant.sku,
                        quantity: variant.inventory[0]?.quantity,
                        originalPrice,
                    })),
                name: product.description.name,
                price: Number(product.finalPrice),
                promoTags:
                    product.options
                        .find(({ code }) => code === 'PROMO')
                        ?.optionValues.map(({ code, id, description }) => ({
                            code,
                            id,
                            name: description?.name,
                        }))
                        .sort((a, b) => a.code - b.code) || [],
            };
        });

        setProductsList([...prevData, ...newData]);
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
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    };

    useEffect(() => {
        if (mount) return;
        if (!queryCategories.length) return;
        handleSkipData();
    }, [lang, queryCategories]); // eslint-disable-line

    const handleSetProductsPage = (val: number) => {
        if (totalPages <= currentProductsPage) return;
        setCurrentProductsPage(val);
    };

    return {
        loadProducts,
        loadMoreProducts,
        updateProducts: fetchProducts,
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
