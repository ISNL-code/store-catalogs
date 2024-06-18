import { Box } from '@mui/material';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import { CatalogContextInterface } from 'types/outlet_context_models';
import FullScreenSwiper from './FullScreenSwiper';
import { useWindowWidth } from '@react-hook/window-size';
import { useIsMount } from 'hooks/useIsMount';
import { STORE_CONFIG } from 'store_constants/stores_config';
import ImageComponent from 'components/atoms/Media/Image';

const ModelSwiper = ({ images }) => {
    const { OPTIONS } = STORE_CONFIG;
    const { PRODUCT_IMAGE_OPTIONS } = OPTIONS;
    const WINDOW_WIDTH = useWindowWidth();
    const mount = useIsMount();
    const [memoHeight, setMemoHeight] = useState<number | null>(null);

    const { headerHeight, instrumentalBarHeight, footerMenuHeight }: CatalogContextInterface = useOutletContext();
    const [fullScreenMode, setFullScreenMode] = useState<boolean>(false);
    const { sx } = useDevice();
    const [slide, setSlide] = useState(0);

    const calculateHeight = (element: number) => {
        return (element / PRODUCT_IMAGE_OPTIONS.width) * PRODUCT_IMAGE_OPTIONS.height;
    };

    const SlideHorizontal = ({ imageUrl, idx }) => {
        const sliderRef = useRef<HTMLDivElement>(null);
        const [sliderHeight, setSliderHeight] = useState<number | null>(memoHeight);

        useEffect(() => {
            if (mount) return;

            if (sliderRef?.current?.clientWidth && sliderRef.current.clientWidth > 0) {
                setSliderHeight(calculateHeight(sliderRef.current.clientWidth));
            }

            if (sliderRef?.current?.clientHeight && sliderRef.current.clientHeight > 0) {
                setTimeout(() => {
                    setMemoHeight(sliderRef?.current?.clientHeight || null);
                }, 200);
            }
        }, [sliderRef.current?.clientWidth, sliderRef.current?.clientHeight]); // eslint-disable-line

        return useMemo(
            () => (
                <Box
                    ref={sliderRef}
                    sx={{
                        minWidth: images.length === 1 ? '100%' : (WINDOW_WIDTH / 3) * 2,
                        width: 'auto',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 4,
                    }}
                    onClick={() => {
                        setFullScreenMode(true);
                        setSlide(idx);
                    }}
                >
                    <Box
                        sx={{
                            height: sliderHeight,
                            maxHeight: memoHeight || sliderHeight,
                            transition: 'all 150ms linear',
                        }}
                    >
                        <ImageComponent key={idx} imageUrl={imageUrl} />
                    </Box>
                </Box>
            ),
            [sliderHeight] // eslint-disable-line
        );
    };

    const SlideVertical = ({ imageUrl, idx }) => {
        const sliderRef = useRef<HTMLDivElement>(null);
        const [sliderHeight, setSliderHeight] = useState<number | null>(memoHeight);

        useEffect(() => {
            if (mount) return;

            if (sliderRef?.current?.clientWidth && sliderRef.current.clientWidth > 0) {
                setSliderHeight(calculateHeight(sliderRef.current.clientWidth));
            }

            if (sliderRef?.current?.clientHeight && sliderRef.current.clientHeight > 0) {
                setTimeout(() => {
                    setMemoHeight(sliderRef?.current?.clientHeight || null);
                }, 200);
            }
        }, [sliderRef.current?.clientWidth, sliderRef.current?.clientHeight]); // eslint-disable-line

        return useMemo(
            () => (
                <Box
                    ref={sliderRef}
                    sx={{
                        width: '100%',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 4,
                        mb: 1,
                    }}
                    onClick={() => {
                        setFullScreenMode(true);
                        setSlide(idx);
                    }}
                >
                    <Box
                        sx={{
                            height: sliderHeight,
                            maxHeight: memoHeight || sliderHeight,
                            transition: 'all 100ms linear',
                        }}
                    >
                        <ImageComponent key={idx} imageUrl={imageUrl} />
                    </Box>
                </Box>
            ),
            [sliderHeight] // eslint-disable-line
        );
    };

    const verticalSwiper = useMemo(() => {
        return (
            <Box pt={1}>
                {images?.map(({ imageUrl }, idx) => (
                    <Fragment key={idx}>
                        <SlideVertical imageUrl={imageUrl} idx={idx} />
                    </Fragment>
                ))}
            </Box>
        );
    }, [images, WINDOW_WIDTH]); // eslint-disable-line

    const horizontalSwiper = useMemo(() => {
        return (
            <Box
                p={images.length <= 1 ? 2 : 1}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                }}
            >
                {images?.map(({ imageUrl }, idx) => (
                    <Fragment key={idx}>
                        <SlideHorizontal imageUrl={imageUrl} idx={idx} />
                    </Fragment>
                ))}
            </Box>
        );
    }, [images, WINDOW_WIDTH]); // eslint-disable-line

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
                    maxHeight: `calc(100vh - ${headerHeight + instrumentalBarHeight + footerMenuHeight}px - 8px)`,
                }}
            >
                {sx ? horizontalSwiper : verticalSwiper}
            </Box>
        </>
    );
};

export default ModelSwiper;
