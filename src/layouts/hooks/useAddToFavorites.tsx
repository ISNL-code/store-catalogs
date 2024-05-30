import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { useAddToFavoriteDataInterface } from 'types/app_models';
import { STORAGE_KEYS } from 'constants/local_storage_keys';

interface useAddToFavoritesParamsInterface {
    loadingUser: boolean;
}

export const useAddToFavorites = ({ loadingUser }: useAddToFavoritesParamsInterface): useAddToFavoriteDataInterface => {
    const mount = useIsMount();
    const [favoriteItems, setFavoriteItems] = useState<any[]>([]);

    useEffect(() => {
        if (loadingUser) return;
        setFavoriteItems(JSON.parse(localStorage.getItem(STORAGE_KEYS?.FAVORITE_KEY) as string) || []); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (loadingUser) return;
        if (mount) return;
        if (favoriteItems.length) {
            localStorage.setItem(STORAGE_KEYS?.FAVORITE_KEY, JSON.stringify(favoriteItems));
        } else localStorage.removeItem(STORAGE_KEYS?.FAVORITE_KEY); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favoriteItems]);

    const handleSetFavoriteItems = data => {
        console.log(data);
        console.log(favoriteItems);
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
