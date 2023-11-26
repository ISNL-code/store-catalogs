import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useUserApi = () => {
    const { post, get } = useApi();

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
            }: {
                emailAddress: string;
                firstName: string;
                lastName: string;
                password: string;
                username: string;
                country: string;
                phone: string;
                lang: string;
            }) => {
                return post({
                    url: `v1/customer/register`,
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

    const useGetUserData = ({ auth }) => {
        return useQuery(
            ['get-user-profile'],

            () =>
                get({
                    url: `v1/auth/customer/profile`,
                }),
            {
                enabled: auth,
                retry: false,
            }
        );
    };

    const useCustomerLogin = () =>
        useMutation(({ password, username }: { password: string; username: string }) => {
            return post({
                url: `v1/customer/login/`,
                body: {
                    password: password,
                    username: username,
                },
            });
        });

    const useResetCustomerPassword = () =>
        useMutation(({ username }: { username: string }) => {
            return post({
                url: `v1/customer/password/reset/request/`,
                body: {
                    returnUrl: '',
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

    return {
        useCustomerRegister,
        useCustomerLogin,
        useGetUserData,
        useResetCustomerPassword,
        useUpdateCustomerPassword,
    };
};
