import { Box, IconButton } from '@mui/material';
import Slider from 'react-slick';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useRef } from 'react';

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <IconButton
            onClick={e => {
                e.stopPropagation();
                onClick();
            }}
            sx={{
                zIndex: 1000,
                position: 'absolute',
                bottom: '50%',
                left: '20px',
                backgroundColor: '#fff',
                '&:hover': {
                    backgroundColor: '#fff',
                },
            }}
            size="small"
        >
            <ArrowLeftIcon />
        </IconButton>
    );
}

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <IconButton
            onClick={e => {
                e.stopPropagation();
                onClick();
            }}
            sx={{
                zIndex: 1000,
                position: 'absolute',
                bottom: '50%',
                right: '20px',
                backgroundColor: '#fff',
                '&:hover': {
                    backgroundColor: '#fff',
                },
            }}
            size="small"
        >
            <ArrowRightIcon />
        </IconButton>
    );
}

const FullScreenSwiper = ({ images, setFullScreen, fullScreenMode, slide }) => {
    const sliderRef = useRef(null);
    useEffect(() => {
        (sliderRef.current as any)?.slickGoTo(slide, true);
    }, [slide]);

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 4001,
                backgroundColor: 'rgba(131, 131, 131, 0.863)',
                width: '100vw',
                height: '100vh',
                justifyContent: 'center',
                flexDirection: 'column',
                opacity: fullScreenMode ? 1 : 0,
                display: 'flex',
                pointerEvents: fullScreenMode ? '' : 'none',
                transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
            }}
            onClick={e => {
                e.preventDefault();
                setFullScreen(false);
            }}
        >
            <Box>
                <IconButton
                    onClick={e => {
                        e.stopPropagation();
                        setFullScreen(false);
                    }}
                    sx={{
                        zIndex: 4001,
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        backgroundColor: '#fff',
                        '&:hover': {
                            backgroundColor: '#fff',
                        },
                    }}
                    size="small"
                >
                    <ClearIcon />
                </IconButton>

                <Slider
                    dots={true}
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    nextArrow={<SampleNextArrow />}
                    prevArrow={<SamplePrevArrow />}
                    adaptiveHeight={true}
                    ref={sliderRef}
                    touchThreshold={20}
                >
                    {images?.map(({ imageUrl }, idx) => {
                        if (imageUrl.includes('.mp4')) return null;
                        return (
                            <Box
                                key={idx}
                                sx={{
                                    minWidth: '100%',
                                    display: 'flex !important',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    onClick={e => {
                                        e.stopPropagation();
                                    }}
                                    src={imageUrl}
                                    style={{
                                        maxHeight: '100vh',
                                        cursor: 'default',
                                        maxWidth: '100vw',
                                    }}
                                    alt="img"
                                />
                            </Box>
                        );
                    })}
                </Slider>
            </Box>
        </Box>
    );
};

export default FullScreenSwiper;
