import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ nav, action }) => {
    const navigate = useNavigate();
    return (
        <IconButton
            sx={{
                height: 30,
                width: 30,
                backgroundColor: '#fff',
                ml: '2px',
                border: '1px solid rgba(0, 0, 0, 0.120)',
                zIndex: 2000,
            }}
            onClick={() => {
                navigate(nav);
                action();
            }}
            onTouchEnd={() => {
                navigate(nav);
                action();
            }}
        >
            <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
    );
};

export default BackButton;
