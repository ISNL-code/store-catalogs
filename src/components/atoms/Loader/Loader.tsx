import { Box, CircularProgress, LinearProgress, Stack, Typography } from '@mui/material';

interface LoaderInterface {
    height?: string;
    zIndex?: number;
    title?: string;
    size?: string;
    defaultHeight?: string;
    position?: string;
    type?: 'both' | 'circular' | 'linear';
}

const Loader = ({
    height = '90vh',
    zIndex = 1999,
    title = '',
    defaultHeight,
    position = 'absolute',
    type = 'both',
}: LoaderInterface) => {
    return (
        <Box
            sx={{
                position: position,
                top: 0,
                left: 0,
                width: '100%',
                height: height,
                minHeight: defaultHeight ? defaultHeight : 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: zIndex,
                flexDirection: 'column',
            }}
        >
            {(type === 'both' || type === 'linear') && (
                <Stack
                    sx={{
                        width: '100%',
                        color: 'grey.500',
                        position: 'fixed',
                        top: `${50 - 2}px`,
                        height: '4px',
                        zIndex: 5000,
                    }}
                    spacing={2}
                >
                    <LinearProgress
                        color="inherit"
                        sx={{
                            width: '100%',
                            color: '#3d3d3d',
                            position: 'fixed',
                            top: `${50 - 2}px`,
                            height: '4px',
                            zIndex: 5000,
                        }}
                    />
                </Stack>
            )}
            {title && (
                <Typography sx={{ textAlign: 'center', mb: 1, maxWidth: 350, backgroundColor: 'white' }}>
                    {title}
                </Typography>
            )}
            {(type === 'both' || type === 'circular') && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                    }}
                >
                    <CircularProgress size={90} thickness={1.5} sx={{ color: '#757575' }} />
                    <Box
                        sx={{
                            position: 'absolute',
                            overflow: 'hidden',
                            height: 85,
                            width: 85,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            borderRadius: '50%',
                            opacity: 0.6,
                        }}
                    >
                        <img src={require('assets/img/logo.png')} style={{ height: '80px' }} alt="img" />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Loader;
