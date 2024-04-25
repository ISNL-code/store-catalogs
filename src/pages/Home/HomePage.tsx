import { useDevice } from 'hooks/useDevice';
import Marquee from 'react-fast-marquee';
const HomePage = () => {
    const { s } = useDevice();

    return (
        <Marquee
            style={{ display: 'flex' }}
            loop={0}
            speed={65}
            gradient
            gradientColor="#6666664e"
            gradientWidth={s ? 50 : 200}
        >
            {[...Array(12).keys()].map(el => (
                <img style={{ maxHeight: '100vh' }} src={require(`./images/${el + 1}.jpg`)} alt={`Loading ${el + 1}`} />
            ))}
        </Marquee>
    );
};
export default HomePage;
