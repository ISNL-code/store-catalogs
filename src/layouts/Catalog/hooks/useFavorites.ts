import { useFavoritesProductsApi } from 'api/useFavoritesProductsApi';
import { useProductsApi } from 'api/useProductsApi';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FavoritesProductsInterface } from 'types';

export const useFavorites = ({ store, lang, queryCategories, setQueryCategories }) => {
    const { storeCode } = useParams();
    const mount = useIsMount();
    const count = 100;
    const [currentFavoritesPage, setCurrentFavoritesPage] = useState(0);
    const [favoritesList, setFavoritesList] = useState<FavoritesProductsInterface[] | [] | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [currentCount, setCurrentCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const {
        data: favoritesRes,
        isFetching: loadFavorites,
        isLoading: loadMoreFavorites,
        refetch: updateFavorites,
    } = useFavoritesProductsApi().useGetAllFavoritesProducts({
        lang: lang?.code,
        count: count,
        page: currentFavoritesPage,
        storeCode,
    });

    useEffect(() => {
        if (mount) return;
        updateFavorites();
    }, [queryCategories]);

    useEffect(() => {
        if (!favoritesRes || loadFavorites || !store) return setFavoritesList([]);
        if (currentFavoritesPage) return;

        setFavoritesList(
            favoritesRes.data.map(product => {
                return {
                    attributes: [],
                    favoriteProductId: product?.favoriteProductId,
                    variantId: product?.variantId,
                    product: {
                        id: product.product.id,
                        variants: product.product.variants
                            .sort((a, b) => a.sortOrder - b.sortOrder)
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
                                };
                            }),
                        name: product.product.description.name,
                        price: product.product.finalPrice,
                        promoTags:
                            product.product.options
                                .find(({ code }) => code === 'PROMO')
                                ?.optionValues.map(({ code, id }) => {
                                    return { code, id };
                                })
                                .sort((a, b) => a.code - b.code) || [],
                    },
                };
            })
        );
        setTotalCount(favoritesRes.data.recordsTotal);
        setCurrentCount(favoritesRes.data.number * (currentFavoritesPage + 1));
        setTotalPages(favoritesRes.data?.totalPages);
    }, [favoritesRes, store]);

    useEffect(() => {
        if (mount) return;
        if (!currentFavoritesPage) return;
        updateFavorites().then(res => {
            setFavoritesList(prev => {
                const prevData = prev ? [...prev] : [];
                return [
                    ...prevData,
                    ...res?.data?.data?.map(product => {
                        return {
                            attributes: [],
                            favoriteProductId: product?.favoriteProductId,
                            variantId: product?.variantId,
                            product: {
                                id: product.product.id,
                                variants: product.product.variants
                                    .sort((a, b) => a.sortOrder - b.sortOrder)
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
                                        };
                                    }),
                                name: product.product.description.name,
                                price: product.product.finalPrice,
                                promoTags:
                                    product.product.options
                                        .find(({ code }) => code === 'PROMO')
                                        ?.optionValues.map(({ code, id }) => {
                                            return { code, id };
                                        })
                                        .sort((a, b) => a.code - b.code) || [],
                            },
                        };
                    }),
                ];
            });
            setTotalCount(res?.data?.data?.recordsTotal);
            setCurrentCount(res?.data?.data?.number * (currentFavoritesPage + 1));
            setTotalPages(res?.data?.data?.totalPages);
        });
    }, [currentFavoritesPage]);

    useEffect(() => {
        if (mount) return;
        setCurrentFavoritesPage(_ => 0);
        setQueryCategories([]);
        setTimeout(() => {
            updateFavorites();
        }, 0);
    }, [lang]);

    const handleSetFavoritesPage = val => {
        setCurrentFavoritesPage(_ => val);
    };

    return {
        favoritesRes,
        loadFavorites,
        loadMoreFavorites,
        updateFavorites,
        currentFavoritesPage,
        handleSetFavoritesPage,
        favoritesList,
        totalProductsCount: totalCount,
        productCountPerPage: currentCount,
        totalProductsPages: totalPages,
        setFavoritesList,
    };
};
