import { Box, Typography } from '@mui/material';

const DetailsSection = ({ children, label }) => {
    return (
        <Box
            sx={{
                border: '1px solid #ececec',
                borderRadius: 2,
                py: 1.25,
                px: 1,
                position: 'relative',
            }}
        >
            <Box px={0.5} sx={{ position: 'absolute', top: -8, left: 10, backgroundColor: '#fff' }}>
                <Typography variant="subtitle2">{label}</Typography>
            </Box>
            {children}
        </Box>
    );
};

export default DetailsSection;
