import { FAVORITE_KEY } from 'constants/constants';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddToFavoriteDataInterface } from 'types';

interface useAddToFavoritesParamsInterface {
    auth: boolean;
    loadingUser: boolean;
}

export const useAddToFavorites = ({
    auth,
    loadingUser,
}: useAddToFavoritesParamsInterface): useAddToFavoriteDataInterface => {
    const { storeCode } = useParams();
    const mount = useIsMount();
    const [favoriteItems, setFavoriteItems] = useState<any[]>([]);

    useEffect(() => {
        if (loadingUser) return;

        if (!auth) return setFavoriteItems([]);
        setFavoriteItems(JSON.parse(localStorage.getItem(storeCode + FAVORITE_KEY) as string) || []);
    }, [auth]);

    useEffect(() => {
        if (loadingUser) return;

        if (mount) return;
        if (favoriteItems.length) {
            localStorage.setItem(storeCode + FAVORITE_KEY, JSON.stringify(favoriteItems));
        } else if (auth) localStorage.removeItem(storeCode + FAVORITE_KEY);
    }, [favoriteItems]);

    const handleSetFavoriteItems = data => {
        if (!auth) return;
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
