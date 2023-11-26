import { Box, IconButton, Typography } from '@mui/material';
import Card from 'components/atoms/Sections/Card';
import Image from 'components/atoms/Media/Image';
import ShareButton from 'components/molecules/ToolsButtons/ShareButton';
import { WEB_URL } from 'constants/constants';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import ColorIndicatorButton from 'components/atoms/ColorIndicatorButton/ColorIndicatorButton';
import CartButton from 'components/molecules/ToolsButtons/CartButton';
import FavoritesButton from 'components/molecules/ToolsButtons/FavoritesButton';
import Slider from 'react-slick';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ExtraColorsButton from 'components/atoms/ColorIndicatorButton/ExtraColorsButton';
import CollapseButton from 'components/molecules/ToolsButtons/СollapseButton';
import { useDevice } from 'hooks/useDevice';
import { CatalogContextInterface } from 'types';

interface ShownModelInterface {
    price: string;
    images: { imageUrl: string }[];
    id: number;
    SKU: string;
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <IconButton
            onClick={e => {
                e.stopPropagation();
                onClick();
            }}
            sx={{ zIndex: 1000, position: 'absolute', bottom: 0, left: 0 }}
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
            sx={{ zIndex: 1000, position: 'absolute', bottom: 0, right: 0 }}
        >
            <ArrowRightIcon />
        </IconButton>
    );
}

const CatalogCard = ({
    modelsVariants,
    name,
    productID,
    imgWidth,
    imgHeight,
    currency,
    setProductsList,
    cropX,
    withCart,
    withFavorites,
    withShare,
    promoTags,
}) => {
    const { xs, sx, ls, l } = useDevice();
    const navigate = useNavigate();
    const { store, auth, setOpenModalType }: CatalogContextInterface = useOutletContext();
    const colorsBoxRef = useRef(null);
    const { storeCode, storeName } = useParams();
    const [shownModel, setShownModel] = useState<ShownModelInterface | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const { xxxs } = useDevice();

    useEffect(() => {
        if (!modelsVariants?.length) return;
        setShownModel(modelsVariants.find(variant => variant.selected));
    }, [modelsVariants]);

    const getWidth = () => {
        if (xs) return '100%'; //475
        if (sx) return '49%';
        if (ls) return '32.5%'; //1240
        if (l) return '24.25%'; //1480
        return '19.4%';
    };

    return (
        <Card
            bottomLeftButtons={isExpanded ? [<CollapseButton collapse={setIsExpanded} isShown={withCart} />] : []}
            bottomButtons={
                isExpanded
                    ? []
                    : [
                          <CartButton isShown={withCart} />,
                          <ShareButton
                              isShown={withShare}
                              path={`${WEB_URL}/catalog/${storeCode}/${storeName}/details/${productID}/model/${shownModel?.SKU?.replaceAll(
                                  '/',
                                  '_'
                              )}`}
                              text=""
                          />,
                      ]
            }
            topRightButtons={[<FavoritesButton isShown={withFavorites} />]}
            promoTags={promoTags}
            getWidth={getWidth}
        >
            <Box
                sx={{
                    display: 'flex',
                    cursor: 'pointer',
                    backgroundColor: '#fff',
                }}
                onClick={() => {
                    navigate(
                        `/catalog/${storeCode}/${storeName}/details/${productID}/model/${shownModel?.SKU?.replaceAll(
                            '/',
                            '_'
                        )}`
                    );
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                    }}
                >
                    <Slider dots={true} nextArrow={<SampleNextArrow />} prevArrow={<SamplePrevArrow />} lazyLoad={true}>
                        {shownModel?.images?.map(({ imageUrl }, idx) => {
                            if (imageUrl.includes('.mp4')) return null;
                            return (
                                <Image
                                    key={idx}
                                    width={imgWidth}
                                    height={imgHeight}
                                    imgUrl={`https://images.weserv.nl/?url=${imageUrl}&q=45`}
                                    padding="0"
                                    cropX={cropX}
                                />
                            );
                        })}
                    </Slider>
                </Box>
            </Box>
            <Box>
                <Box
                    ref={colorsBoxRef}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',

                        flexWrap: isExpanded ? 'wrap' : 'nowrap',
                        backgroundColor: '#f8f8f8',
                        height: isExpanded ? '110px' : '54px',
                        py: 1,
                        px: 0.2,
                        borderTop: '1px solid #00000013',
                        transition: 'height 250ms cubic-bezier(0, 0.4, 0.2, 1)',
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: '290px',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 0.5,
                            rowGap: 0,
                            flexWrap: isExpanded ? 'wrap' : 'nowrap',
                        }}
                    >
                        {modelsVariants?.map((model, idx) => {
                            const selected = model?.id === shownModel?.id;
                            if (!isExpanded && idx > 6) return null;
                            if (!isExpanded && idx === 6 && modelsVariants.length > 7)
                                return (
                                    <ExtraColorsButton
                                        key={idx}
                                        action={e => {
                                            e.stopPropagation();
                                            setIsExpanded(true);
                                        }}
                                        size={xxxs ? 30 : 33}
                                        sum={modelsVariants.length - 6}
                                    />
                                );
                            return (
                                <ColorIndicatorButton
                                    key={idx}
                                    action={e => {
                                        e.stopPropagation();
                                        if (selected) return;
                                        setProductsList(prev =>
                                            prev.map(el => {
                                                if (el.id === productID) {
                                                    return {
                                                        ...el,
                                                        variants: el.variants.map(variant => {
                                                            if (variant.id === model.id)
                                                                return { ...variant, selected: true };
                                                            return { ...variant, selected: false };
                                                        }),
                                                    };
                                                }
                                                return el;
                                            })
                                        );
                                    }}
                                    selected={selected}
                                    color={model.colorCode}
                                    size={33}
                                />
                            );
                        })}
                    </Box>
                </Box>
                <Box
                    sx={{
                        backgroundColor: '#f8f8f8',
                        borderTop: '1px solid #f0f0f0',
                        height: isExpanded ? 0 : '60px',
                        transition: 'height 250ms cubic-bezier(0, 0.4, 0.2, 1)',
                        overflow: 'hidden',
                    }}
                >
                    <Box p={1.25} pt={1}>
                        <Typography
                            variant="h4"
                            sx={{
                                height: '25px',
                                fontWeight: 600,
                            }}
                        >
                            {name}
                        </Typography>

                        {store?.withPrices && (
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#757575',
                                    fontWeight: 500,
                                }}
                            >
                                {currency}
                                {shownModel?.price}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

export default CatalogCard;
