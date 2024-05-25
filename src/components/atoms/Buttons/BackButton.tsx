import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ nav }: { nav?: string | number }) => {
    const navigate = useNavigate();

    return (
        <IconButton
            onMouseDown={() => navigate(nav ? nav : (-1 as any))}
            sx={{
                height: 30,
                width: 30,
                backgroundColor: '#fff',
                ml: '2px',
                border: '1px solid rgba(0, 0, 0, 0.120)',
                zIndex: 2000,
            }}
        >
            <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
    );
};

export default BackButton;
