import { Box } from '@mui/material';

const TransitionBox = ({ children, dependency, time = '750' }) => {
    return (
        <Box
            sx={{
                opacity: dependency ? 0 : 1,
                transition: `opacity ${time}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
        >
            {children}
        </Box>
    );
};

export default TransitionBox;
