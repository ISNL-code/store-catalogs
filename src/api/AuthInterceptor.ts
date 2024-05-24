import axios from 'axios';
import { STORAGE_KEYS } from 'constants/local_storage_keys';
import { ERROR_PAGE } from 'constants/routes';
import { STORE_CONFIG } from 'store_constants/stores_config';

const AuthInterceptor = () => {
    const { BASE_URL } = STORE_CONFIG;

    axios.defaults.baseURL = BASE_URL;

    axios.interceptors.request.use(
        async request => {
            const token = await localStorage.getItem(STORAGE_KEYS?.ACCESS_TOKEN_KEY);
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

            if (error.response.status === 401 && isApiUrl) {
                window.localStorage.removeItem(STORAGE_KEYS?.ACCESS_TOKEN_KEY);
            }

            // if (error.response.status === 401) window.location.href = ERROR_PAGE?.page_401();
            // if (error.response.status === 404) window.location.href = ERROR_PAGE?.page_403();
            // if (error.response.status === 404) window.location.href = ERROR_PAGE?.page_404();
            if (error.response.status > 500) window.location.href = ERROR_PAGE?.page_500();
            return Promise.reject(error);
        }
    );
};

export default AuthInterceptor;
