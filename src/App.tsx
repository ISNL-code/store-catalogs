import { ThemeProvider } from '@mui/material';
import mainTheme from 'theme/mainTheme';
import StoresRouting from 'router/StoresRouting';
import { Toaster } from 'react-hot-toast';
import { useDevice } from 'hooks/useDevice';
// import LandingModeRouting from 'router/LandingWebRouting';
// import HeadLandingHTML from 'layouts/Head-Landing-HTML';
// import { APP_CONFIG_Interface, AppConfig, WEB_MODE_ENUMS } from 'configs/AppConfig';
import HeadStoresHTML from 'layouts/Head-Stores-HTML';

const App = () => {
    // const { WEB_MODE }: APP_CONFIG_Interface = AppConfig;
    const { sx } = useDevice();

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{ style: { width: '100vw', maxWidth: sx ? '100vw' : '' }, duration: 3000 }}
            />

            <ThemeProvider theme={mainTheme}>
                {/* <HeadLandingHTML />
                <LandingModeRouting /> */}

                {/* <HeadStoresHTML /> */}
                <StoresRouting />
            </ThemeProvider>
        </>
    );
};

export default App;
