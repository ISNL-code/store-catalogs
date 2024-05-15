import { STORE_CONFIG } from 'store_constants/stores_config';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
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
    const mount = useIsMount();
    const [favoriteItems, setFavoriteItems] = useState<any[]>([]);

    useEffect(() => {
        if (loadingUser) return;

        setFavoriteItems(JSON.parse(localStorage.getItem(FAVORITE_KEY) as string) || []); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeName]);

    useEffect(() => {
        if (loadingUser) return;

        if (mount) return;
        if (favoriteItems.length) {
            localStorage.setItem(FAVORITE_KEY, JSON.stringify(favoriteItems));
        } else localStorage.removeItem(FAVORITE_KEY); // eslint-disable-next-line react-hooks/exhaustive-deps
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
