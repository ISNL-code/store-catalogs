import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

const TransitionBox = ({ children, dependency, time = 0 }) => {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (dependency) {
            setOpacity(0);
        } else {
            setOpacity(1);
        }
    }, [dependency, time]); // eslint-disable-line

    return (
        <Box
            sx={{
                opacity: opacity,
                transition: `opacity ${time.toString()}ms linear`,
            }}
        >
            {children}
        </Box>
    );
};

export default TransitionBox;
