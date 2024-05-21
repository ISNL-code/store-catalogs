import { Box, CircularProgress, LinearProgress, Stack, Typography } from '@mui/material';
import { Colors } from 'colors';

interface LoaderInterface {
    height?: string;
    zIndex?: number;
    title?: string;
    size?: 'small' | 'medium' | 'large';
    defaultHeight?: string;
    position?: string;
    type?: 'both' | 'circular' | 'linear';
}

const Loader = ({
    height = '90vh',
    zIndex = 5000,
    title = '',
    defaultHeight,
    position = 'absolute',
    type = 'both',
    size,
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
                            color: Colors?.GRAY_500,
                            position: 'fixed',
                            top: `${50 - 2}px`,
                            height: '3px',
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
                    <CircularProgress
                        size={size === 'large' ? 115 : 75}
                        thickness={2}
                        sx={{ color: Colors?.LIGHT_BLUE }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            overflow: 'hidden',
                            height: size === 'large' ? 100 : 65,
                            width: size === 'large' ? 100 : 65,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            opacity: 0.6,
                        }}
                    >
                        <img
                            src={require('assets/img/logo.png')}
                            style={{ height: size === 'large' ? '102px' : '67px' }}
                            alt="img"
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Loader;
