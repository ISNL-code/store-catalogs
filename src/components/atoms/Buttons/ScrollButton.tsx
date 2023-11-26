import { Fab } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';

const ScrollButton = () => {
    return (
        <Fab
            size="medium"
            sx={{ zIndex: 50, position: 'fixed', left: 26, bottom: 100, backgroundColor: '#ffffff57' }}
            onClick={() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }}
        >
            <NorthIcon />
        </Fab>
    );
};

export default ScrollButton;
