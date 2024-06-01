import { useEffect, useState } from 'react';
import { LocalStorageProductInterface, useAddToFavoriteDataInterface } from 'types/app_models';
import { STORAGE_KEYS } from 'constants/local_storage_keys';
import { useIsMount } from 'hooks/useIsMount';

function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

function isLocalStorageAvailable() {
    try {
        const test = 'test';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

function isSessionStorageAvailable() {
    try {
        const test = 'test';
        sessionStorage.setItem(test, test);
        sessionStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

function setStorageItem(key, value) {
    if (isLocalStorageAvailable()) {
        localStorage.setItem(key, value);
    } else if (isSessionStorageAvailable()) {
        sessionStorage.setItem(key, value);
    } else {
        setCookie(key, value, 7);
    }
}

function getStorageItem(key) {
    if (isLocalStorageAvailable()) {
        return localStorage.getItem(key);
    } else if (isSessionStorageAvailable()) {
        return sessionStorage.getItem(key);
    } else {
        return getCookie(key);
    }
}

function removeStorageItem(key) {
    if (isLocalStorageAvailable()) {
        localStorage.removeItem(key);
    } else if (isSessionStorageAvailable()) {
        sessionStorage.removeItem(key);
    } else {
        eraseCookie(key);
    }
}

interface useAddToFavoritesParamsInterface {
    loadingUser: boolean;
}

export const useAddToFavorites = ({ loadingUser }: useAddToFavoritesParamsInterface): useAddToFavoriteDataInterface => {
    const mount = useIsMount();
    const [favoriteItems, setFavoriteItems] = useState<LocalStorageProductInterface[]>([]);

    useEffect(() => {
        if (loadingUser) return;
        const storedItems = getStorageItem(STORAGE_KEYS?.FAVORITE_KEY);
        setFavoriteItems(storedItems ? JSON.parse(storedItems) : []); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingUser]);

    useEffect(() => {
        if (loadingUser) return;
        if (mount) return;
        if (favoriteItems.length) {
            setStorageItem(STORAGE_KEYS?.FAVORITE_KEY, JSON.stringify(favoriteItems));
        } else {
            removeStorageItem(STORAGE_KEYS?.FAVORITE_KEY);
        } // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const clearSingleItem = (variantSku: string) => {
        setFavoriteItems(prev => prev.filter(item => item.variantSku !== variantSku));
    };

    return { favoriteItems, handleSetFavoriteItems, handleClearFavorites, clearSingleItem };
};
