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
                position: 'sticky',
                top: 0,
                backgroundColor: '#fff',
                borderRadius: 6,
                overflow: 'hidden',
                boxShadow: '0 0 2px 1.5px #00000037',
                transition: 'all .3s ease-in-out',
                '&:hover': {
                    transform: withHover ? 'scale(1.005)' : '',
                    boxShadow: withHover ? '0 0 2.5px 2.5px #00000037' : '',
                },
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
