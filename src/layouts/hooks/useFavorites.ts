import { useProductsApi } from 'api/useProductsApi';
import { useEffect, useState } from 'react';
import { ProductDataInterface, useAddToFavoriteDataInterface } from 'types/app_models';
import { map_product_card } from 'utils/mappers/product_data';
import { Product_Data_Response_Interface } from 'types/response_models';
import { useLocation } from 'react-router-dom';
import { STORE_ROUTE } from 'router/routes';
import { STORE_CONFIG } from 'store_constants/stores_config';

interface Props {
    store: string;
    lang: string | null;
    favorites: useAddToFavoriteDataInterface;
}

export const useFavorites = ({ store, lang, favorites }: Props) => {
    const { STORE_CODE } = STORE_CONFIG;
    const location = useLocation();
    const [productsList, setProductsList] = useState<Product_Data_Response_Interface[] | null>(null);
    const [favoritesList, setFavoritesList] = useState<ProductDataInterface[] | []>([]);

    const queryIds = [...new Set(favorites?.favoriteItems.map(el => el?.productId))];

    const {
        data: productGetData,
        isFetching: isLoadingFavorites,
        refetch: fetchFavoriteProducts,
        remove,
    } = useProductsApi().useGetFavorites({
        store,
        lang: lang || 'en',
        count: 100,
        page: 0,
        queryIds,
    });

    useEffect(() => {
        if (location?.pathname?.includes(STORE_ROUTE?.favorites(STORE_CODE))) {
            if (!productsList?.length) return;
            if (!favorites?.favoriteItems?.length) remove();
            const favoritesData = map_product_card.favorite_card(productsList, favorites?.favoriteItems, val =>
                favorites?.clearSingleItem(val)
            );
            setFavoritesList(favoritesData);
        }
    }, [favorites?.favoriteItems, productsList, STORE_CODE]); // eslint-disable-line

    useEffect(() => {
        if (location?.pathname?.includes(STORE_ROUTE?.favorites(STORE_CODE))) {
            if (!productGetData || !favorites?.favoriteItems.length) return;
            setProductsList(productGetData?.data?.products);
        }
    }, [productGetData, STORE_CODE]); // eslint-disable-line

    return {
        isLoadingFavorites,
        favoritesList,
        fetchFavoriteProducts,
    };
};
