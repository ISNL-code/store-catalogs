// Ваш компонент App
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
        // Создаем функцию-обработчик для всех методов навигатора
        const handleNavigatorMethod = (methodName, method) => {
            navigator[methodName] = async function (...args) {
                console.log(`Вызван метод навигатора: ${methodName}`, args);
                try {
                    const result = await method.apply(this, args);
                    console.log(`Результат вызова метода ${methodName}:`, result);
                    alert(`Метод ${methodName} успешно вызван`);
                    return result;
                } catch (error) {
                    console.error(`Ошибка при вызове метода ${methodName}:`, error);
                    alert(`Ошибка при вызове метода ${methodName}: ${error}`);
                    throw error;
                }
            };
        };

        // Перехватываем вызовы всех методов навигатора
        for (const methodName in navigator) {
            if (typeof navigator[methodName] === 'function') {
                handleNavigatorMethod(methodName, navigator[methodName]);
            }
        }

        // Добавляем обработчики событий к элементам на вашем сайте,
        // которые вызывают методы навигатора
        const someButton = document.getElementById('someButton');
        if (someButton) {
            someButton.addEventListener('click', () => {
                // Вызовите методы навигатора здесь
                // Например:
                navigator.share({ title: 'Test', text: 'Hello', url: 'https://example.com' });
            });
        }
    }, []); // Эффект выполняется только один раз при загрузке компонента

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
