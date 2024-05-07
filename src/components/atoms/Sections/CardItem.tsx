import { Box } from '@mui/material';
import { Colors } from 'colors';
import { useDevice } from 'hooks/useDevice';
import { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

const CardItem = ({ children, withHover = true }) => {
    const { sx } = useDevice();
    const cardRef = useRef<HTMLElement>(null);
    const { setScrollPosition }: any = useOutletContext();

    return (
        <Box
            m={sx ? 0 : 0.25}
            ref={cardRef}
            sx={{
                position: 'sticky',
                backgroundColor: Colors?.WHITE,
                width: '100%',
                border: '1px solid',
                borderColor: Colors?.GRAY_300,
                '&:hover': {
                    transform: withHover ? 'scale(1.025)' : '',

                    zIndex: 1000,
                },
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
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
