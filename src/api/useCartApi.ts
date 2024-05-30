import { useMutation } from '@tanstack/react-query';
import useApi from './useApi';
import { CreateOrderProps } from 'types/request_models';

export const useCartApi = () => {
    const { post } = useApi();

    const useCreateOrder = () =>
        useMutation(({ storeCode, data, lang }: CreateOrderProps) => {
            return post({
                url: `v1/auth/order/cart?store=${storeCode}&lang=${lang}`,
                body: { ...data },
            });
        });

    return { useCreateOrder };
};
