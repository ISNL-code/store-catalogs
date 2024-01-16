import { useEffect, useState } from 'react';
import { useAddToCartDataInterface } from 'types';

interface useAddToCartParamsInterface {
    auth: boolean;
}

export const useAddToCart = ({ auth }: useAddToCartParamsInterface): useAddToCartDataInterface => {
    const [cartItems, setCartItems] = useState<any[]>([]);

    useEffect(() => {
        if (!auth) return setCartItems([]);
    }, [auth]);

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    const handleSetCartItems = data => {
        if (!auth) return setCartItems([]);
        if (cartItems.find(item => item?.SKU === data?.SKU)) {
            setCartItems(prev => prev.filter(item => item.SKU !== data?.SKU));
        } else {
            setCartItems(prev => [...prev, data]);
        }
    };

    return { cartItems, handleSetCartItems };
};
