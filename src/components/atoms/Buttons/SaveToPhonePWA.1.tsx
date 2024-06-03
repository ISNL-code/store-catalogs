import React from 'react';
import { Box } from '@mui/material';
import { AppleIcon } from 'assets/svg/apple_icon';

const SaveToPhonePWA = () => {
    const handleInstallClick = () => {
        // Проверяем, поддерживается ли установка PWA в текущем браузере
        if ('beforeinstallprompt' in window) {
            // Получаем доступ к событию beforeinstallprompt
            const installPromptEvent = new Event('beforeinstallprompt');
            // Диспатчим событие на window, что может вызвать окно установки PWA
            window.dispatchEvent(installPromptEvent);
        } else {
            // Если установка PWA не поддерживается, можно отобразить сообщение об ошибке или предложить альтернативный способ установки
            alert('Установка PWA не поддерживается в вашем браузере.');
        }
    };

    return (
        <Box
            onClick={handleInstallClick}
            sx={{
                display: 'flex',
                zIndex: 2000,
                position: 'fixed',
                left: '80px',
                bottom: '20px',
                width: 48,
                height: 48,
                border: '1px solid #ccc',
                backgroundColor: '#ffffff',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 30,
                    height: 30,
                }}
            >
                <AppleIcon />
            </Box>
        </Box>
    );
};

export default SaveToPhonePWA;
