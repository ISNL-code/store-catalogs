import { ThemeProvider } from '@mui/material';
import mainTheme from 'theme/mainTheme';
import StoresRouting from 'router/StoresRouting';
import { Toaster } from 'react-hot-toast';
import { useDevice } from 'hooks/useDevice';
import LandingModeRouting from 'router/LandingWebRouting';
import HeadLandingHTML from 'layouts/Head-Landing-HTML';
import HeadStoresHTML from 'layouts/Head-Stores-HTML';
import { APP_CONFIG_Interface, AppConfig, WEB_MODE_ENUMS } from 'configs/AppConfig';

const App = () => {
    const { WEB_MODE }: APP_CONFIG_Interface = AppConfig;
    const { sx } = useDevice();

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{ style: { width: '100vw', maxWidth: sx ? '100vw' : '' }, duration: 3000 }}
            />

            <ThemeProvider theme={mainTheme}>
                {WEB_MODE === WEB_MODE_ENUMS.LANDING_MODE && (
                    <>
                        <HeadLandingHTML />
                        <LandingModeRouting />
                    </>
                )}
                {WEB_MODE === WEB_MODE_ENUMS.STORE_MODE && (
                    <>
                        <HeadStoresHTML />
                        <StoresRouting />
                    </>
                )}
            </ThemeProvider>
        </>
    );
};

export default App;
