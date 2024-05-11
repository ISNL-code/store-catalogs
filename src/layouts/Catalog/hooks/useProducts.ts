import { useProductsApi } from 'api/useProductsApi';
import { STORE_CONFIG } from 'constants/stores_config';
import { ViewModeType } from 'constants/types';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { LoadedProductListInterface } from 'types';

interface Props {
    store;
    lang: string | null;
    queryCategories;
    setQueryCategories;
    viewMode;
}

export const useProducts = ({ store, lang, queryCategories, setQueryCategories, viewMode }: Props) => {
    const { OPTIONS } = STORE_CONFIG;
    const { STORE_TYPE } = OPTIONS;
    const mount = useIsMount();
    const count = viewMode === ViewModeType?.grid_m ? 35 : 30;
    const [currentProductsPage, setCurrentProductsPage] = useState(0);
    const [productsList, setProductsList] = useState<LoadedProductListInterface[] | [] | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [currentCount, setCurrentCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const {
        data: productsRes,
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

    useEffect(() => {
        if (mount) return;
        updateProducts(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryCategories]);

    useEffect(() => {
        if (!productsRes || loadProducts) return setProductsList([]);
        if (currentProductsPage) return;
        setProductsList(
            productsRes.data.products?.map(product => {
                const originalPrice =
                    STORE_TYPE === 'sales'
                        ? Math.max(...product.variants?.map(el => Number(el.inventory[0]?.price)))
                        : Number(product.price);

                return {
                    id: product.id,
                    variants: product.variants
                        .sort((a, b) => a.sortOrder - b.sortOrder)
                        .filter(el => {
                            return STORE_TYPE === 'sales' ? el.images.length : true;
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
                    price: product.finalPrice,
                    promoTags:
                        product.options
                            .find(({ code }) => code === 'PROMO')
                            ?.optionValues.map(({ code, id, description }) => {
                                return { code, id, name: description?.name };
                            })
                            .sort((a, b) => a.code - b.code) || [],
                };
            })
        );
        setTotalCount(productsRes.data.recordsTotal);
        setCurrentCount(productsRes.data.number * (currentProductsPage + 1));
        setTotalPages(productsRes.data?.totalPages); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsRes]);

    useEffect(() => {
        if (mount) return;
        if (!currentProductsPage) return;
        updateProducts().then(res => {
            setProductsList(prev => {
                const prevData = prev ? [...prev] : [];
                return [
                    ...prevData,
                    ...res?.data?.data?.products?.map(product => {
                        const originalPrice =
                            STORE_TYPE === 'sales'
                                ? Math.max(...product.variants?.map(el => Number(el.inventory[0]?.price)))
                                : Number(product.price);

                        return {
                            id: product.id,
                            variants: product.variants
                                .sort((a, b) => a.sortOrder - b.sortOrder)
                                .filter(el => {
                                    return STORE_TYPE === 'sales' ? el.images.length : true;
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
                    }),
                ];
            });
            setTotalCount(res?.data?.data?.recordsTotal);
            setCurrentCount(res?.data?.data?.number * (currentProductsPage + 1));
            setTotalPages(res?.data?.data?.totalPages);
        }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentProductsPage]);

    useEffect(() => {
        if (mount) return;
        setCurrentProductsPage(_ => 0);
        setQueryCategories([]);
        setTimeout(() => {
            updateProducts();
        }, 0); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang]);

    const handleSetProductsPage = val => {
        setCurrentProductsPage(_ => val);
    };

    return {
        productsRes,
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
