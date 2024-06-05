import { Box } from '@mui/material';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import { CatalogContextInterface } from 'types/outlet_context_models';
import FullScreenSwiper from './FullScreenSwiper';
import { useWindowWidth } from '@react-hook/window-size';
import { useIsMount } from 'hooks/useIsMount';
import { STORE_CONFIG } from 'store_constants/stores_config';

const ModelSwiper = ({ images }) => {
    const { modelSku } = useParams();
    const { OPTIONS } = STORE_CONFIG;
    const { PRODUCT_IMAGE_OPTIONS } = OPTIONS;
    const WINDOW_WIDTH = useWindowWidth();
    const mount = useIsMount();
    const [memoHeight, setMemoHeight] = useState<number | null>(null);

    const { headerHeight, instrumentalBarHeight, footerMenuHeight }: CatalogContextInterface = useOutletContext();
    const [fullScreenMode, setFullScreenMode] = useState<boolean>(false);
    const { sx } = useDevice();
    const [slide, setSlide] = useState(0);

    const SlideHorizontal = ({ imageUrl, idx }) => {
        const sliderRef = useRef<HTMLImageElement>(null);
        const imageRef = useRef<HTMLImageElement>(null);
        const [sliderHeight, setSliderHeight] = useState<number | null>(memoHeight);
        const [maxHeight, setMaxHeight] = useState<number | null>(memoHeight);

        useEffect(() => {
            if (mount) return;

            const calcSlideHeight = () => {
                return (
                    ((sliderRef?.current?.clientWidth || 1) / PRODUCT_IMAGE_OPTIONS?.width) *
                    PRODUCT_IMAGE_OPTIONS?.height
                );
            };
            if (sliderRef?.current?.clientWidth) setSliderHeight(calcSlideHeight());

            if (imageRef?.current?.clientHeight)
                setTimeout(() => {
                    setMaxHeight(imageRef?.current?.clientHeight as number);
                    imageRef?.current?.clientHeight && setMemoHeight(imageRef?.current?.clientHeight as number);
                }, 200);
        }, [imageRef?.current?.clientHeight]); // eslint-disable-line

        const memoizedSlide = useMemo(
            () => (
                <Box
                    ref={sliderRef}
                    sx={{
                        minWidth: images?.length === 1 ? '100%' : (WINDOW_WIDTH / 3) * 2,
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
                            maxHeight: maxHeight || sliderHeight,
                            transition: 'all 150ms linear',
                        }}
                    >
                        <img
                            key={idx}
                            src={imageUrl}
                            style={{
                                width: '100%',
                            }}
                            alt="Loading..."
                        />
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
        const [sliderHeight, setSliderHeight] = useState<number | null>(memoHeight);
        const [maxHeight, setMaxHeight] = useState<number | null>(memoHeight);

        useEffect(() => {
            if (mount) return;

            const calcSlideHeight = () => {
                return (
                    ((sliderRef?.current?.clientWidth || 1) / PRODUCT_IMAGE_OPTIONS?.width) *
                    PRODUCT_IMAGE_OPTIONS?.height
                );
            };
            if (sliderRef?.current?.clientWidth) setSliderHeight(calcSlideHeight());

            if (imageRef?.current?.clientHeight)
                setTimeout(() => {
                    setMaxHeight(imageRef?.current?.clientHeight as number);
                    imageRef?.current?.clientHeight && setMemoHeight(imageRef?.current?.clientHeight as number);
                }, 250);
        }, [imageRef?.current?.clientHeight]); // eslint-disable-line

        const memoizedSlide = useMemo(
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
                            maxHeight: maxHeight || sliderHeight,
                            transition: 'all 100ms linear',
                        }}
                    >
                        <img
                            key={idx}
                            src={imageUrl}
                            style={{
                                width: '100%',
                            }}
                            alt="Loading..."
                        />
                    </Box>
                </Box>
            ),
            [maxHeight] // eslint-disable-line
        );

        return memoizedSlide;
    };

    const verticalSwiper = useMemo(() => {
        return (
            <Box pt={1}>
                {images?.map(({ imageUrl }, idx) => {
                    return (
                        <Fragment key={idx}>
                            <SlideVertical imageUrl={imageUrl} idx={idx} />
                        </Fragment>
                    );
                })}
            </Box>
        );
    }, [images?.length, headerHeight, instrumentalBarHeight, footerMenuHeight, modelSku, WINDOW_WIDTH]); // eslint-disable-line

    const horizontalSwiper = useMemo(() => {
        return (
            <Box
                p={images?.length <= 1 ? 2 : 1}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
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
    }, [images, headerHeight, instrumentalBarHeight, footerMenuHeight, WINDOW_WIDTH, modelSku]); // eslint-disable-line

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
