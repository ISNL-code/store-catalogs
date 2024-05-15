import { STORE_CONFIG } from 'store_constants/stores_config';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { useAddToCartDataInterface } from 'types';

interface useAddToCartParamsInterface {
    auth: boolean;
    loadingUser: boolean;
    storeName?: string;
}

export const useAddToCart = ({
    auth,
    loadingUser,
    storeName,
}: useAddToCartParamsInterface): useAddToCartDataInterface => {
    const { CART_KEY } = STORE_CONFIG;
    const mount = useIsMount();
    const [cartItems, setCartItems] = useState<any[]>([]);

    useEffect(() => {
        if (loadingUser) return;

        if (!auth) return setCartItems([]);
        setCartItems(JSON.parse(localStorage.getItem(CART_KEY) as string) || []); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth, storeName]);

    useEffect(() => {
        if (loadingUser) return;

        if (mount) return;
        if (cartItems.length) {
            localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
        } else if (auth) localStorage.removeItem(CART_KEY); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems]);

    const handleSetCartItems = data => {
        if (!auth) return;
        if (cartItems?.find(item => item?.sku === data?.sku)) {
            setCartItems(prev => prev.filter(item => item.sku !== data?.sku));
        } else {
            setCartItems(prev => [...prev, data]);
        }
    };

    const handleClearCartItems = skuArray => {
        if (!auth) return;

        setCartItems(cartItems.filter(el => !skuArray?.includes(el?.sku)));
    };

    const handleClearCart = () => {
        if (!auth) return;
        setCartItems([]);
    };

    return { cartItems, handleSetCartItems, handleClearCart, handleClearCartItems };
};
