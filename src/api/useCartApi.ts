import { useMutation } from '@tanstack/react-query';
import useApi from './useApi';

export const useCartApi = () => {
    const { post } = useApi();

    const useCreateOrder = () =>
        useMutation(({ storeCode, data }: any) => {
            return post({
                url: `v1/auth/order/cart?$store=${storeCode}`,
                body: { ...data },
            });
        });

    return { useCreateOrder };
};
