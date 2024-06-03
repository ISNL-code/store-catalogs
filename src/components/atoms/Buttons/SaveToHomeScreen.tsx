import { Box, Fab } from '@mui/material';
import { AppleIcon } from 'assets/svg/apple_icon';
import { useDevice } from 'hooks/useDevice';

const SaveToHomeScreen = () => {
    const { sx } = useDevice(); // Access device information

    const handleSave = () => {
        window?.navigator?.share();
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
                onClick={handleSave}
            >
                <AppleIcon />
            </Fab>
        </>
    );
};

export default SaveToHomeScreen;
