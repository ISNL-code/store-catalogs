import { CART_KEY } from 'constants/constants';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddToCartDataInterface } from 'types';

interface useAddToCartParamsInterface {
    auth: boolean;
    loadingUser: boolean;
    storeName?: string;
}

export const useAddToCart = ({ loadingUser, storeName }: useAddToCartParamsInterface): useAddToCartDataInterface => {
    const { storeCode } = useParams();
    const mount = useIsMount();
    const [cartItems, setCartItems] = useState<any[]>([]);

    useEffect(() => {
        if (loadingUser) return;

        setCartItems(JSON.parse(localStorage.getItem(storeCode + CART_KEY) as string) || []); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeName]);

    useEffect(() => {
        if (loadingUser) return;

        if (mount) return;
        if (cartItems.length) {
            localStorage.setItem(storeCode + CART_KEY, JSON.stringify(cartItems));
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems]);

    const handleSetCartItems = data => {
        if (cartItems?.find(item => item?.sku === data?.sku)) {
            setCartItems(prev => prev.filter(item => item.sku !== data?.sku));
        } else {
            setCartItems(prev => [...prev, data]);
        }
    };

    const handleClearCart = () => {
        setCartItems([]);
    };

    return { cartItems, handleSetCartItems, handleClearCart };
};
