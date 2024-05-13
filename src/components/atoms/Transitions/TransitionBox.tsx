import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

const TransitionBox = ({ children, dependency, time = 250 }) => {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (dependency) {
            setOpacity(0);
        } else {
            setTimeout(() => {
                setOpacity(1);
            }, time);
        }
    }, [dependency]); // eslint-disable-line

    return (
        <Box
            sx={{
                opacity: opacity,
                transition: `opacity 250ms linear`,
            }}
        >
            {children}
        </Box>
    );
};

export default TransitionBox;
