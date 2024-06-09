import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Color } from 'constants/colors';
import { MutatingDots } from 'react-loader-spinner';

interface LoaderInterface {
    isShown?: boolean;
    title?: string;
}

const Loader = ({ isShown = true, title = '' }: LoaderInterface) => {
    useEffect(() => {
        if (isShown) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup function to reset the overflow style when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isShown]);

    if (!isShown) return null; // Return null instead of false

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5000,
                opacity: 0.95,
                flexDirection: 'column',
                gap: 1.5,
                backgroundColor: '#00000039',
            }}
        >
            <MutatingDots
                height="120"
                width="120"
                color={Color?.PRIMARY}
                secondaryColor={Color?.PRIMARY_DARK}
                visible={isShown}
            />
            {title && <Typography color="primary">{title}</Typography>}
        </Box>
    );
};

export default Loader;
