import { Box } from '@mui/material';
import { AppleIcon } from 'assets/svg/apple_icon';
import { useNavigate } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';

const AppleStoreButton = () => {
    const { sx, s } = useDevice();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                zIndex: 1000,
                position: 'fixed',
                left: '80px',
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
                    '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)',
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
                <AppleIcon />
            </Box>
        </Box>
    );
};

export default AppleStoreButton;
