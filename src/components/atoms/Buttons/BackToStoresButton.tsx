import { IconButton, Typography } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';

const BackToStoresButton = ({ nav, action, string }) => {
    const navigate = useNavigate();
    const { sx } = useDevice();
    const location = useLocation();
    const active = location.pathname === '/';
    return (
        <>
            {sx ? (
                <IconButton
                    onClick={() => {
                        navigate(nav);
                        action();
                    }}
                >
                    <StoreIcon />
                </IconButton>
            ) : (
                <IconButton
                    sx={{
                        height: 28,
                        width: 90,
                        backgroundColor: '#fff',
                        border: active ? '1px solid  #1976d2' : '1px solid rgba(0, 0, 0, 0.120)',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    onClick={() => {
                        navigate(nav);
                        action();
                    }}
                >
                    <Typography variant="h6" sx={{ color: active ? '#1976d2' : 'rgba(0, 0, 0, 0.54)' }}>
                        {string?.stores}
                    </Typography>
                </IconButton>
            )}
        </>
    );
};

export default BackToStoresButton;
