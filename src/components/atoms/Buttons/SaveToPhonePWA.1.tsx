import React from 'react';
import { Box } from '@mui/material';
import { AppleIcon } from 'assets/svg/apple_icon';

const SaveToHomeScreen = () => {
    const handleAddToHomeScreenClick = () => {
        // Проверяем, является ли текущее устройство iOS
        const isIOS =
            /iPad|iPhone|iPod/.test(navigator.platform) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

        // Показываем инструкции для добавления на домашний экран в зависимости от типа устройства
        if (isIOS) {
            // Для iOS
            alert(
                'Чтобы добавить приложение на домашний экран, нажмите на значок "Делить" внизу экрана и выберите "Добавить на главный экран".'
            );
        } else {
            // Для других устройств
            alert(
                'Чтобы добавить приложение на домашний экран, используйте меню вашего браузера и выберите "Добавить на главный экран".'
            );
        }
    };

    return (
        <Box
            onClick={handleAddToHomeScreenClick}
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

export default SaveToHomeScreen;
