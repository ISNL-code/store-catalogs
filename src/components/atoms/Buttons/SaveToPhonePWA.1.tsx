import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { AppleIcon } from 'assets/svg/apple_icon';
import { useDevice } from 'hooks/useDevice';

// Определяем тип для события установки PWA
interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
    prompt(): Promise<void>;
}

const SaveToPhonePWA: React.FC = () => {
    const { s, sx } = useDevice();
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isPWAInstallable, setPWAInstallable] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            const event = e as BeforeInstallPromptEvent;
            event.preventDefault();
            setDeferredPrompt(event);
            setPWAInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(choiceResult => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                setDeferredPrompt(null);
            });
        }
    };

    if (!isPWAInstallable) {
        return null; // Не показываем кнопку, если событие beforeinstallprompt еще не произошло
    }

    return (
        <Box
            onClick={handleInstallClick}
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
