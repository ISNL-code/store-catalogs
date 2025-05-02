import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';
import { User_Data_Response_Interface } from 'types/response_models';
import { AxiosResponse } from 'axios';

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

    const useGetUserData = ({
        storeCode,
        auth,
    }): UseQueryResult<AxiosResponse<User_Data_Response_Interface, any>, unknown> => {
        return useQuery(
            ['get-user-profile'],

            () =>
                get({
                    url: `v1/auth/customer/profile?store=${storeCode}`,
                }),
            { enabled: Boolean(auth), retry: false }
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
        useMutation(
            ({ username, resetLink, storeCode }: { username: string; resetLink: string; storeCode: string }) => {
                return post({
                    url: `v1/customer/password/reset/request?store=${storeCode}`,
                    body: {
                        returnUrl: resetLink,
                        username: username,
                    },
                });
            }
        );

    const useVerifyResetPasswordToken = ({ storeCode, resetToken }) => {
        return useQuery(
            ['get-verify-reset-password-token'],

            () =>
                get({
                    url: `v1/customer/${storeCode}/reset/${resetToken}`,
                }),
            { enabled: !!resetToken, retry: false }
        );
    };

    const useUpdateCustomerPassword = () =>
        useMutation(
            ({
                storeCode,
                resetToken,
                password,
                repeatPassword,
            }: {
                storeCode: string;
                resetToken: string;
                password: string;
                repeatPassword: string;
            }) => {
                return post({
                    url: `v1/customer/${storeCode}/password/${resetToken}`,
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
                }),
            { retry: false }
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
        useVerifyResetPasswordToken,
    };
};
