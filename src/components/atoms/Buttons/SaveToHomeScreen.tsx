import { Fab } from '@mui/material';
import { AppleIcon } from 'assets/svg/apple_icon';
import { useDevice } from 'hooks/useDevice';

const SaveToHomeScreen = () => {
    const { sx } = useDevice();

    const showAddToHomeScreenPrompt = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: document.title,
                    text: 'Add this app to your home screen!',
                    url: window.location.href,
                })
                .catch(error => console.log('Error sharing', error));
        } else {
            alert('Your browser does not support the Share API.');
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
            onClick={showAddToHomeScreenPrompt}
        >
            <AppleIcon />
        </Fab>
    );
};

export default SaveToHomeScreen;
