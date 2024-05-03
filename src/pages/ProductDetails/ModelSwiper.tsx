import { Box } from '@mui/material';
import Gradient from 'components/atoms/Gradient/Gradient';

import { Fragment, useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import { CatalogContextInterface } from 'types';
import FullScreenSwiper from './FullScreenSwiper';
import { Image } from 'components/atoms/Media/Image';

const ModelSwiper = ({ images, selectedVariant }) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const { store, headerHeight, instrumentalBarHeight, footerHeight }: CatalogContextInterface = useOutletContext();
    const [fullScreenMode, setFullScreenMode] = useState<boolean>(false);
    const { sm, sx } = useDevice();
    const [slide, setSlide] = useState(0);
    const [imagesList, setImagesList] = useState<{ imageUrl: string }[] | []>([]);

    useEffect(() => {
        setImagesList(images);
    }, [images]);

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
                    maxHeight: `calc(100vh - ${headerHeight}px - ${instrumentalBarHeight}px - ${footerHeight}px - 8px)`,
                }}
            >
                <Box
                    pb={1}
                    sx={{
                        display: 'flex',
                        flexDirection: sx ? 'row' : 'column',
                        gap: 0.75,
                    }}
                >
                    {imagesList?.map(({ imageUrl }, idx) => {
                        if (imageUrl.includes('.mp4')) return null;
                        return (
                            <Fragment key={idx}>
                                <Box
                                    ref={imageRef}
                                    sx={{
                                        borderRadius: 4,
                                        minWidth: imagesList.length < 1 ? '100%' : sm ? '65%' : '40%',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                    onClick={() => {
                                        setFullScreenMode(true);
                                        setSlide(idx);
                                    }}
                                >
                                    <Box>
                                        <Gradient dest="top" />
                                        <Gradient dest="bottom" />
                                        <Image ref={imageRef} store={store} imgUrl={`${imageUrl}`} />
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
