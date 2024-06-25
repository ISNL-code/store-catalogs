import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import Box from '@mui/material/Box';
import { SampleNextArrow, SamplePrevArrow } from 'components/atoms/Elements/SliderArrows';
import SwiperImage from './SwiperImage';
import { Color } from 'constants/colors';
import { useSwipeable } from 'react-swipeable';
import { useIsMount } from 'hooks/useIsMount';

interface CustomSwiperProps {
    slides: any[];
    wrapperHeight: number | string;
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({ slides, wrapperHeight }) => {
    const mount = useIsMount();
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right' | null>(null);

    const goToNextSlide = () => {
        setDirection('right');
        setIndex(prevIndex => (prevIndex + 1) % slides.length);
    };

    const goToPrevSlide = () => {
        setDirection('left');
        setIndex(prevIndex => (prevIndex - 1 + slides.length) % slides.length);
    };

    const transitions = useTransition(index, {
        from: {
            opacity: 0,
            transform: mount
                ? 'translate3d(0,0,0)'
                : direction === 'right'
                ? 'translate3d(100%,0,0)'
                : 'translate3d(-100%,0,0)',
        },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: {
            opacity: 0,
            transform: mount
                ? 'translate3d(0,0,0)'
                : direction === 'right'
                ? 'translate3d(-100%,0,0)'
                : 'translate3d(100%,0,0)',
        },
    });

    const handleDotClick = (newIndex: number) => {
        const direction = newIndex > index ? 'right' : 'left';
        setDirection(direction);
        setIndex(newIndex);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => goToNextSlide(),
        onSwipedRight: () => goToPrevSlide(),
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    return (
        <Box sx={{ position: 'relative', height: wrapperHeight, overflow: 'hidden' }} {...handlers}>
            {transitions((style, idx) => (
                <animated.div
                    key={idx}
                    style={{
                        ...style,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <SwiperImage imageUrl={slides[idx]} wrapperHeight={wrapperHeight} />
                </animated.div>
            ))}
            {slides?.length > 1 && (
                <>
                    <SamplePrevArrow onClick={goToPrevSlide} />
                    <SampleNextArrow onClick={goToNextSlide} />
                </>
            )}

            <Box
                py={1}
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    minHeight: 30,
                }}
            >
                {slides?.length > 1 &&
                    slides.map((_, slideIndex) => (
                        <span
                            key={slideIndex}
                            style={{
                                width: slideIndex === index ? '12px' : '8px',
                                height: slideIndex === index ? '12px' : '8px',
                                borderRadius: '50%',
                                backgroundColor: slideIndex === index ? Color.PRIMARY : Color.SECONDARY,
                                margin: '0 5px',
                                cursor: 'pointer',
                                border: '2px solid #ffffff',
                                transition: 'all 0.5s ease-in-out',
                            }}
                            onClick={e => {
                                e?.stopPropagation();
                                handleDotClick(slideIndex);
                            }}
                        />
                    ))}
            </Box>
        </Box>
    );
};

export default CustomSwiper;
