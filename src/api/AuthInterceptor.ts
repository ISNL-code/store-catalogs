import axios from 'axios';
import { STORE_CONFIG } from 'store_constants/stores_config';

const AuthInterceptor = () => {
    const { ACCESS_TOKEN_KEY, BASE_URL } = STORE_CONFIG;
    const SERVER_ERROR_ROUTE_PATH = '/'; // eslint-disable-line

    axios.defaults.baseURL = BASE_URL;

    axios.interceptors.request.use(
        async request => {
            const token = await localStorage.getItem(ACCESS_TOKEN_KEY);
            if (token) request.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            return request;
        },
        error => Promise.reject(error)
    );

    axios.interceptors.response.use(
        response => response,
        error => {
            if (!error || !error.response || !error.response.status || !error.response.request)
                return Promise.reject(error);
            const isApiUrl = error.response.request.responseURL?.startsWith(process.env.API_URL) ?? false;
            const isUnauthorized = error.response.status === 401;

            if (isUnauthorized && isApiUrl) {
                window.localStorage.removeItem(ACCESS_TOKEN_KEY);
            }
            // if (error.response.status >= 500) window.location.href = SERVER_ERROR_ROUTE_PATH;
            return Promise.reject(error);
        }
    );
};

export default AuthInterceptor;
