import { Fab } from '@mui/material';
import { AppleIcon } from 'assets/svg/apple_icon';
import { useDevice } from 'hooks/useDevice';
import { useEffect } from 'react';

const SaveToHomeScreen = () => {
    const { sx } = useDevice();

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
            >
                <AppleIcon />
            </Fab>
        </>
    );
};

export default SaveToHomeScreen;
