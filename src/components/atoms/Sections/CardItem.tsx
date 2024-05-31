import { Box } from '@mui/material';
import { Colors } from 'constants/colors';
import { useRef } from 'react';

const CardItem = ({ children }) => {
    const cardRef = useRef<HTMLElement>(null);

    return (
        <Box
            ref={cardRef}
            sx={{
                position: 'sticky',
                top: 0,
                backgroundColor: Colors?.WHITE,
                border: '0.25px solid',
                borderColor: Colors?.GRAY_500,
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            {children}
        </Box>
    );
};

export default CardItem;
