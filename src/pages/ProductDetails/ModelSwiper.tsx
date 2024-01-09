import { Box, IconButton, Paper } from '@mui/material';
import Gradient from 'components/atoms/Gradient/Gradient';
import Image from 'components/atoms/Media/Image';
import { Fragment, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import { CatalogContextInterface } from 'types';
import FullScreenSwiper from './FullScreenSwiper';

const ModelSwiper = ({ images, selectedVariant }) => {
    const { store, headerHeight, instrumentalBarHeight, footerHeight }: CatalogContextInterface = useOutletContext();
    const [fullScreenMode, setFullScreenMode] = useState<boolean>(false);
    const { sm } = useDevice();
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
                    px={2}
                    pb={1}
                    sx={{
                        display: 'flex',
                        flexDirection: sm ? 'row' : 'column',
                        gap: 0.75,
                    }}
                >
                    {imagesList?.map(({ imageUrl }, idx) => {
                        if (imageUrl.includes('.mp4')) return null;
                        return (
                            <Fragment key={idx}>
                                <Box
                                    sx={{
                                        borderRadius: 4,
                                        minWidth: imagesList.length > 1 ? '60%' : '100%',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                    onClick={() => {
                                        setFullScreenMode(true);
                                        setSlide(idx);
                                    }}
                                >
                                    <Box>
                                        <Gradient dest="top" />
                                        <Gradient dest="bottom" />
                                        <Image
                                            width={store?.productImagesOptions.width}
                                            height={store?.productImagesOptions.height}
                                            imgUrl={`https://images.weserv.nl/?url=${imageUrl}&q=45`}
                                        />
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
