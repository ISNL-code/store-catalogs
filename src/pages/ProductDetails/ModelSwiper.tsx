import { Box } from '@mui/material';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import { CatalogContextInterface } from 'types';
import FullScreenSwiper from './FullScreenSwiper';
import ImageComponent from 'components/atoms/Media/Image';
import { useWindowWidth } from '@react-hook/window-size';
import { useIsMount } from 'hooks/useIsMount';
import { Colors } from 'colors';

const ModelSwiper = ({ images }) => {
    const WINDOW_WIDTH = useWindowWidth();
    const mount = useIsMount();

    const { headerHeight, instrumentalBarHeight, footerMenuHeight, store }: CatalogContextInterface =
        useOutletContext();
    const [fullScreenMode, setFullScreenMode] = useState<boolean>(false);
    const { sx } = useDevice();
    const [slide, setSlide] = useState(0);

    const SlideHorizontal = ({ imageUrl, idx }) => {
        const sliderRef = useRef<HTMLImageElement>(null);
        const imageRef = useRef<HTMLImageElement>(null);
        const [sliderHeight, setSliderHeight] = useState<number | string>(0);
        const [maxHeight, setMaxHeight] = useState<number | null>(null);
        const [isLoading, setIsLoading] = useState(false);

        useEffect(() => {
            if (mount) return;

            const calcSlideHeight = () => {
                return (
                    ((sliderRef?.current?.clientWidth || 1) / store?.productImagesOptions?.width) *
                    store?.productImagesOptions?.height
                );
            };
            if (sliderRef?.current?.clientWidth) setSliderHeight(calcSlideHeight());

            if (imageRef?.current?.clientHeight || !isLoading)
                setTimeout(() => {
                    setMaxHeight(imageRef?.current?.clientHeight as number);
                }, 200);
        }, [isLoading, imageRef?.current?.clientHeight]); // eslint-disable-line

        const memoizedSlide = useMemo(
            () => (
                <Box
                    ref={sliderRef}
                    sx={{
                        width: images.length === 1 ? '100%' : '70%',
                        maxWidth: '400px',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid',
                        borderColor: Colors?.GRAY_300,
                    }}
                    onClick={() => {
                        setFullScreenMode(true);
                        setSlide(idx);
                    }}
                >
                    <Box
                        sx={{
                            height: sliderHeight,
                            maxHeight: maxHeight || sliderHeight,
                            transition: 'all 100ms linear',
                        }}
                    >
                        <ImageComponent ref={imageRef} imgUrl={imageUrl} loadControl={bool => setIsLoading(bool)} />
                    </Box>
                </Box>
            ),
            [maxHeight] // eslint-disable-line
        );

        return memoizedSlide;
    };

    const SlideVertical = ({ imageUrl, idx }) => {
        const sliderRef = useRef<HTMLImageElement>(null);
        const imageRef = useRef<HTMLImageElement>(null);
        const [sliderHeight, setSliderHeight] = useState<number | string>(0);
        const [maxHeight, setMaxHeight] = useState<number | null>(null);
        const [isLoading, setIsLoading] = useState(false);

        useEffect(() => {
            if (mount) return;

            const calcSlideHeight = () => {
                return (
                    ((sliderRef?.current?.clientWidth || 1) / store?.productImagesOptions?.width) *
                    store?.productImagesOptions?.height
                );
            };
            if (sliderRef?.current?.clientWidth) setSliderHeight(calcSlideHeight());

            if (imageRef?.current?.clientHeight || !isLoading)
                setTimeout(() => {
                    setMaxHeight(imageRef?.current?.clientHeight as number);
                }, 200);
        }, [isLoading, imageRef?.current?.clientHeight]); // eslint-disable-line

        const memoizedSlide = useMemo(
            () => (
                <Box
                    ref={sliderRef}
                    sx={{
                        width: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid',
                        borderColor: Colors?.GRAY_300,
                    }}
                    onClick={() => {
                        setFullScreenMode(true);
                        setSlide(idx);
                    }}
                >
                    <Box
                        sx={{
                            height: sliderHeight,
                            maxHeight: maxHeight || sliderHeight,
                            transition: 'all 100ms linear',
                        }}
                    >
                        <ImageComponent ref={imageRef} imgUrl={imageUrl} loadControl={bool => setIsLoading(bool)} />
                    </Box>
                </Box>
            ),
            [maxHeight] // eslint-disable-line
        );

        return memoizedSlide;
    };

    const verticalSwiper = useMemo(() => {
        return (
            <Box
                pb={1}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {images?.map(({ imageUrl }, idx) => {
                    return (
                        <Fragment key={idx}>
                            <SlideVertical imageUrl={imageUrl} idx={idx} />
                        </Fragment>
                    );
                })}
            </Box>
        );
    }, [images?.length, headerHeight, instrumentalBarHeight, footerMenuHeight, WINDOW_WIDTH]); // eslint-disable-line

    const horizontalSwiper = useMemo(() => {
        return (
            <Box
                pb={1}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                {images?.map(({ imageUrl }, idx) => {
                    return (
                        <Fragment key={idx}>
                            <SlideHorizontal imageUrl={imageUrl} idx={idx} />
                        </Fragment>
                    );
                })}
            </Box>
        );
    }, [images, headerHeight, instrumentalBarHeight, footerMenuHeight, WINDOW_WIDTH]); // eslint-disable-line

    return (
        <>
            <FullScreenSwiper
                images={images}
                setFullScreen={setFullScreenMode}
                fullScreenMode={fullScreenMode}
                slide={slide}
            />
            <Box
                sx={{
                    maxHeight: `calc(100vh - ${headerHeight}px - ${instrumentalBarHeight}px - ${footerMenuHeight}px - 8px)`,
                }}
            >
                {sx ? horizontalSwiper : verticalSwiper}
            </Box>
        </>
    );
};

export default ModelSwiper;
