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
                left: sx ? 12 : '36px',
                bottom: sx ? 154 : 110,
                backgroundColor: '#ffffffbe',
            }}
            onClick={() => scrollPage(0, 'smooth')}
        >
            <NorthIcon />
        </Fab>
    );
};

export default ScrollButton;
