import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

const TransitionBox = ({ children, dependency, time = '750' }) => {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (dependency) {
            setOpacity(0);
        } else {
            setOpacity(1);
        }
    }, [dependency]);

    return (
        <Box
            sx={{
                opacity: opacity,
                transition: `opacity ${time}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
        >
            {children}
        </Box>
    );
};

export default TransitionBox;
