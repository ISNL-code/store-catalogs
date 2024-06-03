import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { AppleIcon } from 'assets/svg/apple_icon';
import { useDevice } from 'hooks/useDevice';

// Определяем тип для события установки PWA
interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
    prompt(): Promise<void>;
}

const SaveToPhonePWA = () => {
    const { s, sx } = useDevice();

    function addToHomeScreen() {
        if (navigator && navigator['standalone']) {
            alert('Это приложение уже добавлено на главный экран.');
        } else if (window.matchMedia('(display-mode: standalone)').matches) {
            alert('Это приложение уже открыто в полноэкранном режиме.');
        } else if (window.navigator['standalone'] === undefined) {
            alert('Пожалуйста, добавьте это приложение на главный экран вашего устройства.');
        } else {
            alert('Нажмите кнопку "Поделиться" и выберите "Добавить на главный экран".');
        }
    }

    return (
        <Box
            onClick={addToHomeScreen}
            sx={{
                display: 'flex',
                zIndex: 2000,
                position: 'fixed',
                left: sx ? '80px' : '95px',
                bottom: sx ? 80 : 20,
                width: 48,
                height: 48,
                border: '1px solid #ccc',
                backgroundColor: '#ffffff',
                borderRadius: 50,
                p: s ? 0 : 0.25,
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
                boxShadow:
                    '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)',
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
