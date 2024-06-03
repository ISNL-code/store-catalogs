import { Fab } from '@mui/material';
import { AppleIcon } from 'assets/svg/apple_icon';
import { useDevice } from 'hooks/useDevice';

const SaveToHomeScreen = () => {
    const { sx } = useDevice(); // Access device information

    const handleSaveApp = () => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
            const result = window.confirm('Do you want to add this app to your home screen?');
            if (result) {
                // Действие для сохранения приложения на iOS
                // Тут вы можете вызвать navigation.share() или другие соответствующие действия
                // Например:
                // navigation.share({
                //     title: 'My App',
                //     text: 'Check out this cool app!',
                //     url: 'https://example.com/myapp',
                // });
            }
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
                onClick={handleSaveApp}
            >
                <AppleIcon />
            </Fab>
        </>
    );
};

export default SaveToHomeScreen;
