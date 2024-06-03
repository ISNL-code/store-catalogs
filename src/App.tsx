import { ThemeProvider } from '@mui/material';
import mainTheme from 'theme/mainTheme';
import StoresRouting from 'router/StoresRouting';
import { Toaster } from 'react-hot-toast';
import { useDevice } from 'hooks/useDevice';
import HeadStoresHTML from 'layouts/Head-Stores-HTML';
import { useEffect } from 'react';

const App = () => {
    const { sx } = useDevice();
    useEffect(() => {
        function handleNavigation(event) {
            alert('Произошла навигация браузера!');
        }

        window.addEventListener('popstate', handleNavigation);

        return () => {
            window.removeEventListener('popstate', handleNavigation);
        };
    }, []);

    return (
        <ThemeProvider theme={mainTheme}>
            <Toaster
                position="top-right"
                toastOptions={{ style: { width: '100vw', maxWidth: sx ? '100vw' : '' }, duration: 3000 }}
            />

            <HeadStoresHTML />
            <StoresRouting />
        </ThemeProvider>
    );
};

export default App;
