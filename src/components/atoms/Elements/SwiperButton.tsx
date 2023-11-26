import { Box } from '@mui/material';

const SwiperButton = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                height: '30px',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    width: 100,
                    height: 6,
                    backgroundColor: '#ccc',
                    borderRadius: 4,
                }}
            ></Box>
        </Box>
    );
};

export default SwiperButton;
