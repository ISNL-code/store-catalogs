import { Fab } from '@mui/material';
import { AppleIcon } from 'assets/svg/apple_icon';
import { useDevice } from 'hooks/useDevice';

const SaveToHomeScreen = () => {
    const { sx } = useDevice();

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
        <Fab
            size="medium"
            sx={{
                zIndex: 50,
                position: 'fixed',
                left: sx ? '80px' : '40px',
                bottom: sx ? 80 : 16,
                backgroundColor: '#ffffffbe',
            }}
            onClick={handleAddToHomeScreenClick}
        >
            <AppleIcon />
        </Fab>
    );
};

export default SaveToHomeScreen;
