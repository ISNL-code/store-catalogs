import { Box } from '@mui/material';
import { Colors } from 'colors';
import { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

const CardItem = ({ children, withHover = true }) => {
    const cardRef = useRef<HTMLElement>(null);
    const { setScrollPosition }: any = useOutletContext();

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
            onClick={() => {
                setScrollPosition(cardRef?.current?.offsetTop);
            }}
        >
            {children}
        </Box>
    );
};

export default CardItem;
