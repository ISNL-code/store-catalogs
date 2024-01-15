import { Box } from '@mui/material';
import { GoogleIcon } from 'assets/svg/google_icon';
import { useDevice } from 'hooks/useDevice';

const PlayMarketButton = () => {
    const { sx, s } = useDevice();

    return (
        <Box
            sx={{
                zIndex: 1000,
                position: 'fixed',
                left: '24px',
                bottom: 150,
                width: 48,
                height: 48,
                border: '1px solid #ccc',
                backgroundColor: '#ffffff',
                borderRadius: 50,
                p: s ? 0 : 0.25,
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow:
                    ' 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)',
            }}
            onClick={() => {}}
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
                <GoogleIcon />
            </Box>
        </Box>
    );
};

export default PlayMarketButton;
