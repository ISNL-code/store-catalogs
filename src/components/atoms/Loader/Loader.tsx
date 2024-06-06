import { Box, CircularProgress, Typography } from '@mui/material';
import { Color } from 'constants/colors';

interface LoaderInterface {
    height?: string;
    zIndex?: number;
    title?: string;
    defaultHeight?: string;
    position?: string;
    isShown?: boolean;
}

const Loader = ({
    height = '90vh',
    zIndex = 5000,
    title = '',
    defaultHeight,
    position = 'fixed',
    isShown = true,
}: LoaderInterface) => {
    if (!isShown) return null;

    return (
        <Box
            className="AppLoader"
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
            {title && (
                <Typography
                    color="secondary"
                    sx={{ textAlign: 'center', mb: 1, maxWidth: 350, backgroundColor: 'white' }}
                >
                    {title}
                </Typography>
            )}

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    filter: 'grayscale(100%)',
                }}
            >
                <CircularProgress size={85} thickness={2} sx={{ color: Color?.SECONDARY }} />
            </Box>
        </Box>
    );
};

export default Loader;
