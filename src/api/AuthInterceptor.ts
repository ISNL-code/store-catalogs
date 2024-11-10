import axios from 'axios';
import { STORAGE_KEYS } from 'constants/local_storage_keys';
import { ERROR_PAGE } from 'router/routes';
import { getStorageItem, removeStorageItem } from 'utils/storageUtils';

const AuthInterceptor = () => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

    axios.interceptors.request.use(
        async request => {
            try {
                const storedItems = await getStorageItem(STORAGE_KEYS?.ACCESS_TOKEN_KEY);
                if (storedItems) {
                    request.headers.Authorization = `Bearer ${JSON.parse(storedItems)}`;
                }
            } catch (error) {
                console.error('Error getting storage item:', error);
            }
            return request;
        },
        error => Promise.reject(error)
    );

    axios.interceptors.response.use(
        response => response,
        async error => {
            if (!error?.response) return Promise.reject(error);

            const { status } = error.response;

            if (status === 401) {
                try {
                    await removeStorageItem(STORAGE_KEYS?.ACCESS_TOKEN_KEY);
                    // window.location.href = ERROR_PAGE?.page_401(); // Uncomment if needed
                } catch (error) {
                    console.error('Error removing storage item:', error);
                }
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
