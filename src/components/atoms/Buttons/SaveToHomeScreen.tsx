import { Fab } from '@mui/material';
import { AppleIcon } from 'assets/svg/apple_icon';
import { useDevice } from 'hooks/useDevice';

const SaveToHomeScreen = () => {
    const { sx } = useDevice();

    const showAddToHomeScreenPrompt = () => {
        if ('share' in navigator) {
            // Show a prompt to add to home screen
            navigator
                .share({
                    title: 'Добавить на домашний экран',
                    text: 'Установите это приложение на ваш домашний экран для легкого доступа.',
                    url: window.location.href,
                })
                .then(() => {
                    console.log('Приложение успешно добавлено на главный экран');
                })
                .catch(error => {
                    alert('Ошибка при добавлении приложения на главный экран:');
                });
        }
    };

    return (
        <>
            <Fab
                size="medium"
                sx={{
                    zIndex: 50,
                    position: 'fixed',
                    left: sx ? '80px' : '40px',
                    bottom: sx ? 80 : 16,
                    backgroundColor: '#ffffffbe',
                }}
                onClick={showAddToHomeScreenPrompt}
            >
                <AppleIcon />
            </Fab>
        </>
    );
};

export default SaveToHomeScreen;
