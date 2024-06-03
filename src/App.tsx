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
            // Проверяем, является ли событие навигацией
            if (event.type === 'popstate') {
                // Ваш код здесь, например, вывод алерта
                alert('Была выполнена навигация браузера!');
            }
        }

        // Добавляем слушатели событий навигации
        window.addEventListener('popstate', handleNavigation);

        // Очистка слушателей при размонтировании компонента
        return () => {
            window.removeEventListener('popstate', handleNavigation);
        };
    }, []); // Пустой массив зависимостей означает, что эффект будет запущен только после первого рендера

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
