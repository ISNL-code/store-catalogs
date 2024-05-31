import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { LocalStorageProductInterface, useAddToFavoriteDataInterface } from 'types/app_models';
import { STORAGE_KEYS } from 'constants/local_storage_keys';

interface useAddToFavoritesParamsInterface {
    loadingUser: boolean;
}

export const useAddToFavorites = ({ loadingUser }: useAddToFavoritesParamsInterface): useAddToFavoriteDataInterface => {
    const mount = useIsMount();
    const [favoriteItems, setFavoriteItems] = useState<LocalStorageProductInterface[]>([]);

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

    const handleSetFavoriteItems = (data: LocalStorageProductInterface) => {
        if (favoriteItems?.find(item => item?.variantSku === data?.variantSku)) {
            setFavoriteItems(prev => prev.filter(item => item.variantSku !== data?.variantSku));
        } else {
            setFavoriteItems(prev => [...prev, data]);
        }
    };

    const handleClearFavorites = () => {
        setFavoriteItems([]);
    };

    const clearSingleItem = variantSku => {
        setFavoriteItems(prev => prev.filter(item => item.variantSku !== variantSku));
    };

    return { favoriteItems, handleSetFavoriteItems, handleClearFavorites, clearSingleItem };
};
