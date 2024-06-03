import React from 'react';
import { Box } from '@mui/material';
import { AppleIcon } from 'assets/svg/apple_icon';
import { Color } from 'constants/colors';
import { useDevice } from 'hooks/useDevice';

const SaveToHomeScreen = () => {
    const { sx, s } = useDevice();

    const handleAddToHomeScreenClick = () => {
        if ('beforeinstallprompt' in window) {
            const promptEvent = (window as any).beforeinstallprompt;

            if (promptEvent) {
                promptEvent.prompt();
            }
        } else {
            alert('Добавление на главный экран не поддерживается в вашем браузере.');
        }
    };

    return (
        <Box
            onClick={handleAddToHomeScreenClick}
            sx={{
                width: sx ? 'fit-content' : 140,
                zIndex: 2000,
                position: 'fixed',
                right: sx ? '20px' : '36px',
                bottom: sx ? 80 : 16,
                border: sx ? 'none' : '1px solid ',
                borderColor: Color?.SUCCESS,
                backgroundColor: sx ? 'none' : Color?.SUCCESS,
                opacity: 0.75,
                borderRadius: 50,
                p: s ? 0 : 0.25,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
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
