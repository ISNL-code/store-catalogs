import { Box } from '@mui/material';
import { Colors } from 'colors';
import { useDevice } from 'hooks/useDevice';
import { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

const ProductItem = ({ children, withHover = true }) => {
    const { sx } = useDevice(); // eslint-disable-line
    const cardRef = useRef<HTMLElement>(null);
    const { setScrollPosition }: any = useOutletContext();

    return (
        <Box
            ref={cardRef}
            sx={{
                position: 'sticky',
                backgroundColor: Colors?.GRAY_100,
                border: '0.25px solid',
                borderColor: Colors?.GRAY_500,
                width: '100%',
                '&:hover': {
                    transform: withHover && !sx ? 'scale(1.01)' : '',

                    zIndex: 1,
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

export default ProductItem;
