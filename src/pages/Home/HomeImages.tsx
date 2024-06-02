import { Box } from '@mui/material';
import { useWindowHeight } from '@react-hook/window-size';
import { useDevice } from 'hooks/useDevice';
import Marquee from 'react-fast-marquee';

const HomeImages = () => {
    const WINDOW_HEIGHT = useWindowHeight();
    const { s } = useDevice();

    return (
        <Box sx={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
            <Box style={{ overflow: 'hidden', height: WINDOW_HEIGHT, background: '#ccc', maxWidth: '100vw' }}>
                <Marquee loop={0} speed={75} gradient gradientColor="#6666664e" gradientWidth={s ? 100 : 300}>
                    <img
                        style={{ maxHeight: WINDOW_HEIGHT, overflow: 'hidden' }}
                        src={require(`./images/${1}.jpg`)}
                        alt={`Loading...`}
                    />
                    <img
                        style={{ maxHeight: WINDOW_HEIGHT, overflow: 'hidden' }}
                        src={require(`./images/${2}.jpg`)}
                        alt={`Loading ...`}
                    />
                    <img
                        style={{ maxHeight: WINDOW_HEIGHT, overflow: 'hidden' }}
                        src={require(`./images/${3}.jpg`)}
                        alt={`Loading ...`}
                    />
                    <img
                        style={{ maxHeight: WINDOW_HEIGHT, overflow: 'hidden' }}
                        src={require(`./images/${4}.jpg`)}
                        alt={`Loading ...`}
                    />
                    <img
                        style={{ maxHeight: WINDOW_HEIGHT, overflow: 'hidden' }}
                        src={require(`./images/${5}.jpg`)}
                        alt={`Loading ...`}
                    />
                    <img
                        style={{ maxHeight: WINDOW_HEIGHT, overflow: 'hidden' }}
                        src={require(`./images/${6}.jpg`)}
                        alt={`Loading ...`}
                    />
                    <img
                        style={{ maxHeight: WINDOW_HEIGHT, overflow: 'hidden' }}
                        src={require(`./images/${7}.jpg`)}
                        alt={`Loading ...`}
                    />
                    <img
                        style={{ maxHeight: WINDOW_HEIGHT, overflow: 'hidden' }}
                        src={require(`./images/${8}.jpg`)}
                        alt={`Loading ...`}
                    />
                    <img
                        style={{ maxHeight: WINDOW_HEIGHT, overflow: 'hidden' }}
                        src={require(`./images/${9}.jpg`)}
                        alt={`Loading ...`}
                    />
                    <img
                        style={{ maxHeight: WINDOW_HEIGHT, overflow: 'hidden' }}
                        src={require(`./images/${10}.jpg`)}
                        alt={`Loading ...`}
                    />
                    <img
                        style={{ maxHeight: WINDOW_HEIGHT, overflow: 'hidden' }}
                        src={require(`./images/${11}.jpg`)}
                        alt={`Loading ...`}
                    />
                    <img
                        style={{ maxHeight: WINDOW_HEIGHT, overflow: 'hidden' }}
                        src={require(`./images/${12}.jpg`)}
                        alt={`Loading ...`}
                    />
                </Marquee>
            </Box>
        </Box>
    );
};

export default HomeImages;
