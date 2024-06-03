import { Fab } from '@mui/material';
import { AppleIcon } from 'assets/svg/apple_icon';
import { useDevice } from 'hooks/useDevice';

const SaveToHomeScreen = () => {
    const { sx } = useDevice();

    const handleAddToHomeScreenClick = () => {
        if ('share' in navigator) {
            navigator
                .share({
                    title: 'Alberto Bini',
                    text: 'Model',
                    url: `https://sales-nest.netlify.app/store/alberto_bini_europe/product/1419/model/201-0622k`,
                })
                .then(() => {
                    console.log('Приложение успешно добавлено на главный экран');
                })
                .catch(error => {
                    console.error('Ошибка при добавлении приложения на главный экран:', error);
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
                onClick={handleAddToHomeScreenClick}
            >
                <AppleIcon />
            </Fab>
        </>
    );
};

export default SaveToHomeScreen;
