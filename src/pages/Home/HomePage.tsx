import { Box } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import Marquee from 'react-fast-marquee';
const HomePage = () => {
    const { s } = useDevice();

    return (
        <Box style={{ overflow: 'hidden', maxHeight: '100vh' }}>
            <Marquee
                style={{ display: 'flex' }}
                loop={0}
                speed={65}
                gradient
                gradientColor="#6666664e"
                gradientWidth={s ? 100 : 300}
            >
                {[...Array(12).keys()].map(el => (
                    <img
                        style={{ maxHeight: '100vh', overflow: 'hidden' }}
                        src={require(`./images/${el + 1}.jpg`)}
                        alt={`Loading ${el + 1}`}
                    />
                ))}
            </Marquee>
        </Box>
    );
};
export default HomePage;
