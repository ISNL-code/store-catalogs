import { useEffect, useState } from 'react';
import { LocalStorageProductInterface, useAddToFavoriteDataInterface } from 'types/app_models';
import { STORAGE_KEYS } from 'constants/local_storage_keys';
import { getStorageItem, removeStorageItem, setStorageItem } from 'utils/storageUtils';

interface useAddToFavoritesParamsInterface {
    loadingUser: boolean;
}

export const useAddToFavorites = ({ loadingUser }: useAddToFavoritesParamsInterface): useAddToFavoriteDataInterface => {
    const [favoriteItems, setFavoriteItems] = useState<LocalStorageProductInterface[]>([]);

    useEffect(() => {
        if (loadingUser) return;

        getStorageItem(STORAGE_KEYS?.FAVORITE_KEY, storedItems => {
            if (storedItems) {
                setFavoriteItems(JSON.parse(storedItems));
            } else {
                removeStorageItem(STORAGE_KEYS?.FAVORITE_KEY, () => {});
            }
        });
    }, [loadingUser]);

    useEffect(() => {
        if (loadingUser) return;
        if (favoriteItems.length) {
            setStorageItem(STORAGE_KEYS?.FAVORITE_KEY, JSON.stringify(favoriteItems), () => {});
        } else {
            removeStorageItem(STORAGE_KEYS?.FAVORITE_KEY, () => {});
        }
    }, [favoriteItems, loadingUser]);

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

    const clearSingleItem = (variantSku: string) => {
        setFavoriteItems(prev => prev.filter(item => item.variantSku !== variantSku));
    };

    return { favoriteItems, handleSetFavoriteItems, handleClearFavorites, clearSingleItem };
};
