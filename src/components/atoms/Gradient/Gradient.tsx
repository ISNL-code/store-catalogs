import { Box } from '@mui/material';

const Gradient = ({ dest }) => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                backgroundImage: `linear-gradient(to ${dest}, rgba(200, 200, 200, 0) 40%, rgba(199, 199, 199, 0.158) 55%, rgba(110, 110, 110, 0.151)90%,#7474743c)`,
                pointerEvents: 'none',
            }}
        ></Box>
    );
};

export default Gradient;
