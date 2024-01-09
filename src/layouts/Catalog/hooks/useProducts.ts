import { useProductsApi } from 'api/useProductsApi';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { LoadedProductListInterface, ProductVariantInterface } from 'types';

export const useProducts = ({ store, lang, queryCategories }) => {
    const mount = useIsMount();
    const count = 25;
    const [page, setPage] = useState(0);
    const [productsList, setProductsList] = useState<LoadedProductListInterface[] | [] | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [currentCount, setCurrentCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const {
        data: productsRes,
        isFetching: loadProducts,
        isLoading: loadMoreProducts,
        remove: clearProductsRes,
        refetch: updateProducts,
    } = useProductsApi().useGetAllProducts({
        store: store,
        lang: lang?.code,
        count: count,
        page: page,
        categories: queryCategories,
    });

    useEffect(() => {
        if (mount) return;
        updateProducts();
    }, [queryCategories]);

    useEffect(() => {
        if (!productsRes) return;
        if (page) return;
        setProductsList(
            productsRes.data.products?.map(product => {
                return {
                    id: product.id,
                    variants: product.variants
                        .sort((a, b) => a.sortOrder - b.sortOrder)
                        .map((variant, idx) => {
                            return {
                                id: variant.id,
                                productId: variant.productId,
                                selected: idx === 0,
                                price: variant.inventory[0]?.price,
                                images: variant.images,
                                colorCode: variant.variation.optionValue.code,
                                SKU: variant.sku,
                            };
                        }),
                    name: product.description.name,
                    price: product.finalPrice,
                    promoTags:
                        product.options
                            .find(({ code }) => code === 'PROMO')
                            ?.optionValues.map(({ code, id }) => {
                                return { code, id };
                            })
                            .sort((a, b) => a.code - b.code) || [],
                };
            })
        );
        setTotalCount(productsRes.data.recordsTotal);
        setCurrentCount(productsRes.data.number * (page + 1));
        setTotalPages(productsRes.data?.totalPages);
    }, [productsRes]);

    useEffect(() => {
        if (mount) return;
        if (!page) return;
        updateProducts().then(res => {
            setProductsList(prev => {
                const prevData = prev ? [...prev] : [];
                return [
                    ...prevData,
                    ...res?.data?.data?.products?.map(product => {
                        return {
                            id: product.id,
                            variants: product.variants
                                .sort((a, b) => a.sortOrder - b.sortOrder)
                                .map((variant, idx) => {
                                    return {
                                        id: variant.id,
                                        productId: variant.productId,
                                        selected: idx === 0,
                                        price: variant.inventory[0]?.price,
                                        images: variant.images,
                                        colorCode: variant.variation.optionValue.code,
                                        SKU: variant.sku,
                                    };
                                }),
                            name: product.description.name,
                            price: product.finalPrice,
                        };
                    }),
                ];
            });
            setTotalCount(res?.data?.data?.recordsTotal);
            setCurrentCount(res?.data?.data?.number * (page + 1));
            setTotalPages(res?.data?.data?.totalPages);
        });
    }, [page]);

    useEffect(() => {
        if (mount) return;
        setPage(_ => 0);

        setTimeout(() => {
            updateProducts();
        }, 0);
    }, [lang]);

    return {
        productsRes,
        loadProducts,
        loadMoreProducts,
        clearProductsRes,
        updateProducts,
        page,
        setPage,
        productsList,
        totalCount,
        currentCount,
        totalPages,
        setProductsList,
    };
};
