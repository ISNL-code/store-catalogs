import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { LocalStorageProductInterface, useAddToCartDataInterface } from 'types/app_models';
import { STORAGE_KEYS } from 'constants/local_storage_keys';

interface useAddToCartParamsInterface {
    loadingUser: boolean;
}

export const useAddToCart = ({ loadingUser }: useAddToCartParamsInterface): useAddToCartDataInterface => {
    const mount = useIsMount();
    const [cartItems, setCartItems] = useState<LocalStorageProductInterface[]>([]);

    useEffect(() => {
        if (loadingUser) return;
        setCartItems(JSON.parse(localStorage.getItem(STORAGE_KEYS?.CART_KEY) as string) || []); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (loadingUser) return;

        if (mount) return;
        if (cartItems.length) {
            localStorage.setItem(STORAGE_KEYS?.CART_KEY, JSON.stringify(cartItems));
        } else localStorage.removeItem(STORAGE_KEYS?.CART_KEY); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems]);

    const handleSetCartItems = (data: LocalStorageProductInterface) => {
        if (cartItems?.find(item => item?.variantSku === data?.variantSku)) {
            setCartItems(prev => prev.filter(item => item.variantSku !== data?.variantSku));
        } else {
            setCartItems(prev => [...prev, data]);
        }
    };

    const handleClearCartItems = skuArray => {
        setCartItems(cartItems.filter(el => !skuArray?.includes(el?.variantSku)));
    };

    const clearSingleItem = variantSku => {
        setCartItems(prev => prev.filter(item => item.variantSku !== variantSku));
    };

    const handleClearCart = () => {
        setCartItems([]);
    };

    return { cartItems, handleSetCartItems, handleClearCart, handleClearCartItems, clearSingleItem };
};
