import { STORE_CONFIG } from 'constants/stores_config';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddToFavoriteDataInterface } from 'types';

interface useAddToFavoritesParamsInterface {
    loadingUser: boolean;
    storeName?: string;
}

export const useAddToFavorites = ({
    loadingUser,
    storeName,
}: useAddToFavoritesParamsInterface): useAddToFavoriteDataInterface => {
    const { FAVORITE_KEY } = STORE_CONFIG;
    const { storeCode } = useParams();
    const mount = useIsMount();
    const [favoriteItems, setFavoriteItems] = useState<any[]>([]);

    useEffect(() => {
        if (loadingUser) return;

        setFavoriteItems(JSON.parse(localStorage.getItem(storeCode + '-' + FAVORITE_KEY) as string) || []); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeName]);

    useEffect(() => {
        if (loadingUser) return;

        if (mount) return;
        if (favoriteItems.length) {
            localStorage.setItem(storeCode + '-' + FAVORITE_KEY, JSON.stringify(favoriteItems));
        } else localStorage.removeItem(storeCode + '-' + FAVORITE_KEY); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favoriteItems]);

    const handleSetFavoriteItems = data => {
        if (favoriteItems?.find(item => item?.sku === data?.sku)) {
            setFavoriteItems(prev => prev.filter(item => item.sku !== data?.sku));
        } else {
            setFavoriteItems(prev => [...prev, data]);
        }
    };

    const handleClearFavorites = () => {
        setFavoriteItems([]);
    };

    return { favoriteItems, handleSetFavoriteItems, handleClearFavorites };
};
