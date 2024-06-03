import { Fab } from '@mui/material';
import { AppleIcon } from 'assets/svg/apple_icon';
import { useDevice } from 'hooks/useDevice';

const SaveToHomeScreen = () => {
    const { sx } = useDevice();

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
        <Fab
            size="medium"
            sx={{
                zIndex: 50,
                position: 'fixed',
                left: sx ? '80px' : '40px',
                bottom: sx ? 80 : 16,
                backgroundColor: '#ffffffbe',
            }}
            onClick={addToHomeScreen}
        >
            <AppleIcon />
        </Fab>
    );
};

export default SaveToHomeScreen;
