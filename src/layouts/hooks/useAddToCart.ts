import { useEffect, useState } from 'react';
import { LocalStorageProductInterface, useAddToCartDataInterface } from 'types/app_models';
import { STORAGE_KEYS } from 'constants/local_storage_keys';
import { getStorageItem, removeStorageItem, setStorageItem } from 'utils/storageUtils';
import { useIsMount } from 'hooks/useIsMount';

interface useAddToCartParamsInterface {
    loadingUser: boolean;
}

export const useAddToCart = ({ loadingUser }: useAddToCartParamsInterface): useAddToCartDataInterface => {
    const mount = useIsMount();
    const [cartItems, setCartItems] = useState<LocalStorageProductInterface[]>([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (loadingUser) return;
            getStorageItem(STORAGE_KEYS?.CART_KEY, storedItems => {
                if (storedItems) {
                    setCartItems(JSON.parse(storedItems));
                } else {
                    removeStorageItem(STORAGE_KEYS?.CART_KEY, () => {});
                }
            });
        };

        fetchCartItems();
    }, [loadingUser]);

    useEffect(() => {
        const updateStorage = async () => {
            if (loadingUser) return;
            if (mount) return;
            if (cartItems.length) {
                setStorageItem(STORAGE_KEYS?.CART_KEY, JSON.stringify(cartItems), () => {});
            } else {
                removeStorageItem(STORAGE_KEYS?.CART_KEY, () => {});
            }
        };

        updateStorage();
    }, [cartItems, loadingUser, mount]);

    const handleSetCartItems = (data: LocalStorageProductInterface) => {
        if (cartItems?.find(item => item?.variantSku === data?.variantSku)) {
            setCartItems(prev => prev.filter(item => item.variantSku !== data?.variantSku));
        } else {
            setCartItems(prev => [...prev, data]);
        }
    };

    const handleClearCartItems = (skuArray: string[]) => {
        setCartItems(cartItems.filter(el => !skuArray?.includes(el?.variantSku)));
    };

    const clearSingleItem = (variantSku: string) => {
        setCartItems(prev => prev.filter(item => item.variantSku !== variantSku));
    };

    const handleClearCart = () => {
        setCartItems([]);
    };

    return { cartItems, handleSetCartItems, handleClearCart, handleClearCartItems, clearSingleItem };
};
