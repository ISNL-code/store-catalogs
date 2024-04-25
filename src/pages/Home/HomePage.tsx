import Marquee from 'react-fast-marquee';
const HomePage = () => {
    return (
        <Marquee style={{ display: 'flex' }} loop={0} speed={75}>
            {[...Array(12).keys()].map(el => (
                <img style={{ maxHeight: '100vh' }} src={require(`./images/${el + 1}.jpg`)} alt={`Loading ${el + 1}`} />
            ))}
        </Marquee>
    );
};
export default HomePage;
