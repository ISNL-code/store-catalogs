import * as ReactDOM from 'react-dom/client';
import App from 'App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthInterceptor from 'api/AuthInterceptor';
import './index.css';
import { showWarningIfStorageUnavailable } from 'utils/storageUtils';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            cacheTime: 1000 * 60 * 5,
        },
    },
});

const clearCache = () => {
    queryClient.removeQueries();
};

AuthInterceptor();
clearCache();
showWarningIfStorageUnavailable();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);
