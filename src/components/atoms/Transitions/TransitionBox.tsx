import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { useDevice } from 'hooks/useDevice';

const TransitionBox = ({ children, dependency, time = 50 }) => {
    const { sx } = useDevice();
    const [opacity, setOpacity] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (dependency) {
            setOpacity(0);
        } else {
            setTimeout(() => setOpacity(1), time);
            setLoading(false);
        }
    }, [dependency]); // eslint-disable-line

    return (
        <>
            {loading && !sx && <Loader />}
            <Box
                sx={{
                    opacity: opacity,
                    transition: `opacity ${time.toString()}ms linear`,
                }}
            >
                {children}
            </Box>
        </>
    );
};

export default TransitionBox;
