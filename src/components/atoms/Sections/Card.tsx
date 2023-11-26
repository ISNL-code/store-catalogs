import { Box } from '@mui/material';
import { Fragment, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import PromoTags from '../PromoTags/PromoTags';

interface CardInterface {
    children;
    bottomButtons?;
    topRightButtons?;
    bottomLeftButtons?;
    promoTags?: { id: string; code: string }[];
    getWidth: () => string;
}

const Card = ({ children, bottomButtons, topRightButtons, promoTags, bottomLeftButtons, getWidth }: CardInterface) => {
    const cardRef = useRef<HTMLElement>(null);
    const { setScrollPosition }: { setScrollPosition } = useOutletContext();

    return (
        <Box
            ref={cardRef}
            sx={{
                position: 'relative',
                backgroundColor: '#f8f8f8',
                width: getWidth(),
                borderRadius: 6,
                overflow: 'hidden',
                boxShadow: '0 0 3px 2px #00000037',
                transition: 'all .3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.01)',
                },
                height: '100%',
            }}
            onClick={() => {
                setScrollPosition(cardRef?.current?.offsetTop);
            }}
        >
            {children}
            <Box sx={{ position: 'absolute', left: 10, top: 10, display: 'flex', gap: 0.5, flexDirection: 'column' }}>
                {promoTags?.map(el => (
                    <PromoTags key={el.id} value={el.code} size={20} selected={true} disabled={true} />
                ))}
            </Box>
            <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
                {topRightButtons?.map(el => (
                    <Fragment key={el}>{el}</Fragment>
                ))}
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    right: 6,
                    bottom: 6,
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 0.75,
                }}
            >
                {bottomButtons?.map((el, idx) => (
                    <Fragment key={idx}>{el}</Fragment>
                ))}
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    left: 6,
                    bottom: 6,
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 0.75,
                }}
            >
                {bottomLeftButtons?.map((el, idx) => (
                    <Fragment key={idx}>{el}</Fragment>
                ))}
            </Box>
        </Box>
    );
};

export default Card;
