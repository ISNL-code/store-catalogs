import { Box, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';

const BrandName = () => {
    const { xs } = useDevice();
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: xs ? 0.25 : 0.25 }}>
            <Box
                sx={{
                    pt: 0.3,
                    pb: -1.5,
                    display: 'flex',
                    gap: 0.05,
                    alignItems: 'center',
                    mt: 0.5,
                    // borderBottom: '2px double #244c7a',
                    px: 0.25,
                    position: 'relative',
                    mb: 0.7,
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 24,
                        fontWeight: 600,
                        color: '#000',
                        textShadow: '#0000006a 0 0 2px',
                        mr: 0.1,
                        mt: 0.1,
                    }}
                >
                    S
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 24,
                        fontWeight: 500,
                        color: '#244c7a',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    A
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 24,
                        fontWeight: 500,
                        color: '#244c7a',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    L
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 24,
                        fontWeight: 500,
                        color: '#244c7a',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    E
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 24,
                        fontWeight: 500,
                        color: '#244c7a',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    S
                </Typography>

                <Typography
                    sx={{
                        ml: 1,
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 24,
                        fontWeight: 600,
                        color: '#000',
                        textShadow: '#0000006a 0 0 2px',
                        mr: 0.1,
                        mt: 0.1,
                    }}
                >
                    N
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 24,
                        fontWeight: 500,
                        color: '#244c7a',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    E
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 24,
                        fontWeight: 500,
                        color: '#244c7a',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    S
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 24,
                        fontWeight: 500,
                        color: '#244c7a',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    T
                </Typography>
            </Box>
        </Box>
    );
};

export default BrandName;
