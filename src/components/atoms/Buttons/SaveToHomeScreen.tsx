import { Fab } from '@mui/material';
import { AppleIcon } from 'assets/svg/apple_icon';
import { useDevice } from 'hooks/useDevice';

const SaveToHomeScreen = () => {
    const { sx } = useDevice(); // Access device information

    const handleClick = () => {
        // Progressive Web App (PWA) approach (if applicable)
        if ('beforeinstallprompt' in window) {
            let deferredPrompt;
            window.addEventListener('beforeinstallprompt', event => {
                event.preventDefault(); // Prevent default behavior
                deferredPrompt = event;
            });

            const installApp = async () => {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    const { outcome } = await deferredPrompt.userChoice;
                    deferredPrompt = null; // Reset deferredPrompt
                    if (outcome === 'accepted') {
                        console.log('App installed successfully!');
                    } else {
                        console.log('User declined to install the app.');
                    }
                }
            };

            return installApp; // Return the function for potential chaining
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
                onClick={handleClick}
            >
                <AppleIcon />
            </Fab>
        </>
    );
};

export default SaveToHomeScreen;
