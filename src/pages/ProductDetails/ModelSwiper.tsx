import { Box } from '@mui/material';
import Gradient from 'components/atoms/Gradient/Gradient';

import { Fragment, useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import { CatalogContextInterface } from 'types';
import FullScreenSwiper from './FullScreenSwiper';
import ImageComponent from 'components/atoms/Media/Image';
import { useWindowWidth } from '@react-hook/window-size';

const ModelSwiper = ({ images }) => {
    const WINDOW_WIDTH = useWindowWidth();
    const sliderRef = useRef<HTMLImageElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const { headerHeight, instrumentalBarHeight, footerMenuHeight, store }: CatalogContextInterface =
        useOutletContext();
    const [fullScreenMode, setFullScreenMode] = useState<boolean>(false);
    const { sm, sx } = useDevice();
    const [slide, setSlide] = useState(0);
    const [imagesList, setImagesList] = useState<{ imageUrl: string }[] | []>([]);
    const [sliderHeight, setSliderHeight] = useState<number | string>(0);
    const [maxHeight, setMaxHeight] = useState<number | string>(0);

    useEffect(() => {
        setImagesList(images);
    }, [images]);

    useEffect(() => {
        setTimeout(() => {
            setSliderHeight(
                ((sliderRef?.current?.clientWidth || 1) / store?.productImagesOptions?.width) *
                    store?.productImagesOptions?.height
            );
        }, 100);
        setTimeout(() => {
            setMaxHeight(imageRef?.current?.clientHeight as number);
        }, 100);
    }, [WINDOW_WIDTH]); // eslint-disable-line

    return (
        <>
            <FullScreenSwiper
                images={imagesList}
                setFullScreen={setFullScreenMode}
                fullScreenMode={fullScreenMode}
                slide={slide}
            />
            <Box
                sx={{
                    maxHeight: `calc(100vh - ${headerHeight}px - ${instrumentalBarHeight}px - ${footerMenuHeight}px - 8px)`,
                }}
            >
                <Box
                    pb={1}
                    sx={{
                        display: 'flex',
                        flexDirection: sx ? 'row' : 'column',
                    }}
                >
                    {imagesList?.map(({ imageUrl }, idx) => {
                        return (
                            <Fragment key={idx}>
                                <Box
                                    ref={sliderRef}
                                    sx={{
                                        minWidth: imagesList.length === 1 ? '100%' : sm ? '65%' : '40%',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    onClick={() => {
                                        setFullScreenMode(true);
                                        setSlide(idx);
                                    }}
                                >
                                    <Box sx={{ height: sliderHeight, maxHeight: maxHeight }}>
                                        <Gradient dest="top" />
                                        <Gradient dest="bottom" />
                                        <ImageComponent ref={imageRef} imgUrl={`${imageUrl}`} height={'100%'} />
                                    </Box>
                                </Box>
                            </Fragment>
                        );
                    })}
                </Box>
            </Box>
        </>
    );
};

export default ModelSwiper;
