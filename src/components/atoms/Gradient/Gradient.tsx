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
                backgroundImage: `linear-gradient(to ${dest}, rgba(255, 255, 255, 0) 40%, rgba(199, 199, 199, 0.158) 65%, rgba(0, 0, 0, 0.151)90%,#0000003d)`,
                pointerEvents: 'none',
            }}
        ></Box>
    );
};

export default Gradient;
