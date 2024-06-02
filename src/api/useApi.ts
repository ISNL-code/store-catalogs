import axios, { AxiosResponse } from 'axios';
import { useOutletContext } from 'react-router-dom';

interface ApiGetParams {
    url: string;
}

interface ApiPostParams {
    url: string;
    body?: Record<string, any>;
}

interface ApiPutParams {
    url: string;
    body: Record<string, any>;
}

interface ApiPatchParams {
    url: string;
    body: Record<string, any>;
}

interface ApiDeleteParams {
    url: string;
}

interface Api {
    get: (params: ApiGetParams) => Promise<AxiosResponse<any>>;
    post: (params: ApiPostParams) => Promise<AxiosResponse<any>>;
    put: (params: ApiPutParams) => Promise<AxiosResponse<any>>;
    patch: (params: ApiPatchParams) => Promise<AxiosResponse<any>>;
    remove: (params: ApiDeleteParams) => Promise<AxiosResponse<any>>;
}

const useApi = (): Api => {
    const context: any = useOutletContext();

    const get = async ({ url }: ApiGetParams): Promise<AxiosResponse<any>> => {
        const token = context?.apiToken;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(url, { headers });
        return response;
    };

    const post = async ({ url, body = {} }: ApiPostParams): Promise<AxiosResponse<any>> => {
        const token = context?.apiToken;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.post(url, body, { headers });
        return response;
    };

    const put = async ({ url, body }: ApiPutParams): Promise<AxiosResponse<any>> => {
        const token = context?.apiToken;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.put(url, body, { headers });
        return response;
    };

    const patch = async ({ url, body }: ApiPatchParams): Promise<AxiosResponse<any>> => {
        const token = context?.apiToken;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.patch(url, body, { headers });
        return response;
    };

    const remove = async ({ url }: ApiDeleteParams): Promise<AxiosResponse<any>> => {
        const token = context?.apiToken;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.delete(url, { headers });
        return response;
    };

    return {
        get,
        post,
        put,
        remove,
        patch,
    };
};

export default useApi;
