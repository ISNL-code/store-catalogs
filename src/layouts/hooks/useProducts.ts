import { useProductsApi } from 'api/useProductsApi';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { StoreType } from 'store_constants/types';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { LoadedProductListInterface } from 'types';
import { useDevice } from 'hooks/useDevice';

interface Props {
    store;
    lang: string | null;
    applyFilters: boolean;
    queryCategories;
    refreshFilters: boolean;
    setRefreshFilters;
}

export const useProducts = ({
    store,
    lang,
    applyFilters,
    queryCategories,
    refreshFilters,
    setRefreshFilters,
}: Props) => {
    const { sx } = useDevice();
    const { OPTIONS } = STORE_CONFIG;
    const { STORE_TYPE } = OPTIONS;
    const mount = useIsMount();
    const count = sx ? 28 : 35;

    const [currentProductsPage, setCurrentProductsPage] = useState(0);
    const [productsList, setProductsList] = useState<LoadedProductListInterface[] | [] | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [currentCount, setCurrentCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const {
        isFetching: loadProducts,
        isLoading: loadMoreProducts,
        refetch: updateProducts,
    } = useProductsApi().useGetAllProducts({
        store: store,
        lang: lang,
        count: count,
        page: currentProductsPage,
        categories: queryCategories,
    });

    const handleUpdateProducts = action => {
        updateProducts()
            .then(res => {
                const prevData = action === 'refresh' ? [] : productsList || [];
                const newData = res?.data?.data?.products?.map(product => {
                    const originalPrice =
                        STORE_TYPE === StoreType.sales
                            ? Math.max(...product.variants?.map(el => Number(el.inventory[0]?.price)))
                            : Number(product.price);

                    return {
                        id: product.id,
                        variants: product.variants
                            .sort((a, b) => a.sortOrder - b.sortOrder)
                            .filter(el => {
                                return STORE_TYPE === StoreType.sales ? el.images.length : true;
                            })
                            .map((variant, idx) => {
                                return {
                                    id: variant.id,
                                    productId: variant.productId,
                                    selected: idx === 0,
                                    price: variant.inventory[0]?.price,
                                    images: variant.images,
                                    colorCode: variant.variation.optionValue.code,
                                    sku: variant.sku,
                                    quantity: variant.inventory[0]?.quantity,
                                    originalPrice: originalPrice,
                                };
                            }),
                        name: product.description.name,
                        price: Number(product.finalPrice),
                        promoTags:
                            product.options
                                .find(({ code }) => code === 'PROMO')
                                ?.optionValues.map(({ code, id, description }) => {
                                    return { code, id, name: description?.name };
                                })
                                .sort((a, b) => a.code - b.code) || [],
                    };
                });

                setProductsList([...prevData, ...newData]);
                setTotalCount(res?.data?.data?.recordsTotal);
                setCurrentCount(res?.data?.data?.number);
                setTotalPages(res?.data?.data?.totalPages);
            })
            .finally(() => {
                setRefreshFilters(false);
                if (action === 'refresh')
                    window.scrollTo({
                        top: 0,
                        behavior: 'auto',
                    });
            });
    };

    useEffect(() => {
        console.log('MOUNT');
        handleUpdateProducts('refresh');
    }, []); // eslint-disable-line

    useEffect(() => {
        if (mount) return;
        setCurrentProductsPage(0);
        setTimeout(() => {
            console.log('APPLY FILTERS');
            handleUpdateProducts('refresh');
        }, 0);
    }, [applyFilters]); // eslint-disable-line

    useEffect(() => {
        if (mount) return;
        setCurrentProductsPage(0);
        setTimeout(() => {
            console.log('REFRESH FILTERS');
            handleUpdateProducts('refresh');
        }, 100);
    }, [refreshFilters]); // eslint-disable-line

    useEffect(() => {
        if (mount) return;
        if (currentProductsPage === 0) return;
        console.log('ADD PAGE', currentProductsPage);
        handleUpdateProducts('add_page');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentProductsPage]);

    useEffect(() => {
        if (mount) return;
        setCurrentProductsPage(0);
        setTimeout(() => {
            console.log('CHANGE LANGUAGE');
            handleUpdateProducts('refresh');
        }, 100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang]);

    const handleSetProductsPage = val => {
        setCurrentProductsPage(_ => val);
    };

    return {
        loadProducts,
        loadMoreProducts,
        updateProducts,
        currentProductsPage,
        handleSetProductsPage,
        productsList,
        totalProductsCount: totalCount,
        productCountPerPage: currentCount,
        totalProductsPages: totalPages,
        setProductsList,
    };
};
