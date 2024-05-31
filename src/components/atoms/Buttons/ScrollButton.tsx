import { Fab } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import { useDevice } from 'hooks/useDevice';
import { scrollPage } from 'utils/scrollPage';

const ScrollButton = () => {
    const { sx } = useDevice();

    return (
        <Fab
            size="medium"
            sx={{
                zIndex: 50,
                position: 'fixed',
                left: sx ? '20px' : '40px',
                bottom: sx ? 80 : 16,
                backgroundColor: '#ffffffbe',
            }}
            onClick={() => scrollPage(0, 'smooth')}
        >
            <NorthIcon />
        </Fab>
    );
};

export default ScrollButton;
