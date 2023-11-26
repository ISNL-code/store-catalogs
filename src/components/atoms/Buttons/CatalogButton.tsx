import { IconButton, Typography } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';

const CatalogButton = ({ nav, action, string, isShown }) => {
    const navigate = useNavigate();
    const { sx } = useDevice();
    const location = useLocation();
    const active = location.pathname === nav || location.pathname.includes('details');
    if (isShown)
        return (
            <>
                {sx ? (
                    <IconButton
                        onClick={() => {
                            navigate(nav);
                            action();
                        }}
                    >
                        <GridViewIcon sx={{ color: active ? '#1976d2' : '' }} />
                    </IconButton>
                ) : (
                    <IconButton
                        sx={{
                            marginLeft: 0.5,
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
                            {string?.catalog}
                        </Typography>
                    </IconButton>
                )}
            </>
        );
    return null;
};

export default CatalogButton;
