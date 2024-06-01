import { ThemeProvider } from '@mui/material';
import mainTheme from 'theme/mainTheme';
import StoresRouting from 'router/StoresRouting';
import { Toaster } from 'react-hot-toast';
import { useDevice } from 'hooks/useDevice';
import HeadStoresHTML from 'layouts/Head-Stores-HTML';

const App = () => {
    const { sx } = useDevice();

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{ style: { width: '100vw', maxWidth: sx ? '100vw' : '' }, duration: 3000 }}
            />

            <ThemeProvider theme={mainTheme}>
                <HeadStoresHTML />
                <StoresRouting />
            </ThemeProvider>
        </>
    );
};

export default App;
