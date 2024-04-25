import { useProductsApi } from 'api/useProductsApi';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { LoadedProductListInterface } from 'types';

export const useProducts = ({ store, lang, queryCategories, setQueryCategories }) => {
    const mount = useIsMount();
    const count = 36;
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
        lang: lang?.code,
        count: count,
        page: currentProductsPage,
        categories: queryCategories,
    });

    useEffect(() => {
        if (mount) return;
        updateProducts(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryCategories]);

    const catalogPriceMode = localStorage.getItem('catalog_mode');

    useEffect(() => {
        if (!productsRes || loadProducts) return setProductsList([]);
        if (currentProductsPage) return;
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
                                price: variant.inventory[0]?.price * Number(catalogPriceMode),
                                images: variant.images,
                                colorCode: variant.variation.optionValue.code,
                                sku: variant.sku,
                            };
                        }),
                    name: product.description.name,
                    price: product.finalPrice * Number(catalogPriceMode),
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
                        return {
                            id: product.id,
                            variants: product.variants
                                .sort((a, b) => a.sortOrder - b.sortOrder)
                                .map((variant, idx) => {
                                    return {
                                        id: variant.id,
                                        productId: variant.productId,
                                        selected: idx === 0,
                                        price: variant.inventory[0]?.price * Number(catalogPriceMode),
                                        images: variant.images,
                                        colorCode: variant.variation.optionValue.code,
                                        sku: variant.sku,
                                    };
                                }),
                            name: product.description.name,
                            price: product.finalPrice * Number(catalogPriceMode),
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
