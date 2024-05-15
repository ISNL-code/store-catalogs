import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useUserApi = () => {
    const { post, get, patch } = useApi();

    const useCustomerRegister = () =>
        useMutation(
            ({
                emailAddress,
                firstName,
                lastName,
                password,
                username,
                country,
                phone,
                lang,
                storeCode,
            }: {
                emailAddress: string;
                firstName: string;
                lastName: string;
                password: string;
                username: string;
                country: string;
                phone: string;
                lang: string;
                storeCode: string;
            }) => {
                return post({
                    url: `v1/customer/register?store=${storeCode}`,
                    body: {
                        billing: {
                            country: country,
                            firstName: firstName,
                            lastName: lastName,
                            phone: phone,
                        },
                        emailAddress: emailAddress,
                        firstName: firstName,
                        language: lang,
                        lastName: lastName,
                        password: password,
                        username: username,
                    },
                });
            }
        );

    const useGetUserData = ({ storeCode }) => {
        return useQuery(
            ['get-user-profile'],

            () =>
                get({
                    url: `v1/auth/customer/profile?store=${storeCode}`,
                }),
            { enabled: false }
        );
    };

    const useCustomerLogin = () =>
        useMutation(({ password, email, storeCode }: { password: string; email: string; storeCode: any }) => {
            return post({
                url: `v1/customer/login?store=${storeCode}`,
                body: {
                    password: password,
                    username: email,
                },
            });
        });

    const useResetCustomerPassword = () =>
        useMutation(({ username, storeCode }: { username: string; storeCode: any }) => {
            return post({
                url: `v1/customer/password/reset/request?store=${storeCode}`,
                body: {
                    returnUrl: window.location.origin,
                    username: username,
                },
            });
        });

    const useUpdateCustomerPassword = () =>
        useMutation(
            ({
                store,
                code,
                password,
                repeatPassword,
            }: {
                store: string;
                code: string;
                password: string;
                repeatPassword: string;
            }) => {
                return post({
                    url: `v1/customer/${store}/password/${code}`,
                    body: {
                        password: password,
                        repeatPassword: repeatPassword,
                    },
                });
            }
        );

    const useCustomerProfileUpdate = ({ storeCode }) =>
        useMutation(({ data }: any) => {
            return patch({
                url: `v1/auth/customer?store=${storeCode}`,
                body: {
                    ...data,
                },
            });
        });

    const useGetCustomersOrders = ({ storeCode }) => {
        return useQuery(
            ['get-customers-orders'],

            () =>
                get({
                    url: `v1/auth/orders?store=${storeCode}&count=1000`,
                })
        );
    };

    return {
        useCustomerRegister,
        useCustomerLogin,
        useGetUserData,
        useResetCustomerPassword,
        useUpdateCustomerPassword,
        useCustomerProfileUpdate,
        useGetCustomersOrders,
    };
};
