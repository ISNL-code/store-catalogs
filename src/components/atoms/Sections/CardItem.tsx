import { Box } from '@mui/material';
import { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

const CardItem = ({ children, withHover = true }) => {
    const cardRef = useRef<HTMLElement>(null);
    const { setScrollPosition }: any = useOutletContext();

    return (
        <Box
            ref={cardRef}
            sx={{
                position: 'relative',
                backgroundColor: '#f8f8f8',
                borderRadius: 6,
                overflow: 'hidden',
                boxShadow: '0 0 3px 2px #00000037',
                transition: 'all .3s ease-in-out',
                '&:hover': {
                    transform: withHover ? 'scale(1.005)' : '',
                    boxShadow: withHover ? '0 0 3px 3px #00000037' : '',
                },
                height: '100%',
                width: '100%',
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
