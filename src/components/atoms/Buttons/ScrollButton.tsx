import { Fab } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import { useDevice } from 'hooks/useDevice';
import { scrollPage } from 'utils/scrollPage';

const ScrollButton = () => {
    const { sx } = useDevice();

    return (
        <Fab
            size="small"
            sx={{
                zIndex: 50,
                position: 'fixed',
                left: sx ? '95px' : '36px',
                bottom: sx ? 80 : 120,
                backgroundColor: '#ffffffbe',
            }}
            onClick={() => scrollPage(0, 'smooth')}
        >
            <NorthIcon />
        </Fab>
    );
};

export default ScrollButton;
