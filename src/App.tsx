import { ThemeProvider } from '@mui/material';
import mainTheme from 'theme/mainTheme';
import StoresRouting from 'router/StoresRouting';
import { Toaster } from 'react-hot-toast';
import { useDevice } from 'hooks/useDevice';
import HeadStoresHTML from 'layouts/Head-Stores-HTML';
// import { useEffect } from 'react';
// import { telegramSender } from 'utils/telegramSender';

const App = () => {
    const { sx } = useDevice();

    // useEffect(() => {
    //     telegramSender({
    //         action: `Не совершай глупостей, они потом дорогу обходятся, я не собираюсь тебя шантажировать выклюячая катлоги, но если ты не вышлешь эти вещи на день, я с Ноября больше денег с тебя не возьму за катлоги, потому что я уже потерял всякую надежду в то что ты станешь нормальной, сделай так чтоб я ошибалсяв`,
    //     });
    // }, []);

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
