import axios from 'axios';
import { STORAGE_KEYS } from 'constants/local_storage_keys';
import { ERROR_PAGE } from 'constants/routes';
import { STORE_CONFIG } from 'store_constants/stores_config';

const AuthInterceptor = () => {
    const { BASE_URL } = STORE_CONFIG;
    axios.defaults.baseURL = BASE_URL;

    axios.interceptors.request.use(
        request => {
            const token = localStorage.getItem(STORAGE_KEYS?.ACCESS_TOKEN_KEY);
            if (token) {
                request.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            }
            return request;
        },
        error => Promise.reject(error)
    );

    axios.interceptors.response.use(
        response => response,
        error => {
            if (!error?.response) return Promise.reject(error);

            const {
                status,
                request: { responseURL },
            } = error.response;
            const isApiUrl = responseURL?.startsWith(process.env.API_URL) ?? false;

            if (status === 401 && isApiUrl) {
                localStorage.removeItem(STORAGE_KEYS?.ACCESS_TOKEN_KEY);
                // window.location.href = ERROR_PAGE?.page_401(); // Uncomment if needed
            }

            // Handle other error statuses
            // if (status === 403) window.location.href = ERROR_PAGE?.page_403();
            // if (status === 404) window.location.href = ERROR_PAGE?.page_404();
            if (status > 500) window.location.href = ERROR_PAGE?.page_500();

            return Promise.reject(error);
        }
    );
};

export default AuthInterceptor;
