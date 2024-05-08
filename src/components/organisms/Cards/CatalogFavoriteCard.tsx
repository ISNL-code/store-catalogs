import { Box, Typography } from '@mui/material';
import ShareButton from 'components/molecules/ToolsButtons/ShareButton';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import ColorIndicatorButton from 'components/atoms/ColorIndicatorButton/ColorIndicatorButton';
import CartButton from 'components/molecules/ToolsButtons/CartButton';
import FavoritesButton from 'components/molecules/ToolsButtons/FavoritesButton';
import Slider from 'react-slick';
import CollapseButton from 'components/molecules/ToolsButtons/СollapseButton';
import { useDevice } from 'hooks/useDevice';
import { CatalogContextInterface } from 'types';
import CardItem from 'components/atoms/Sections/CardItem';
import Grid from '@mui/material/Unstable_Grid2';
import PromoTags from 'components/atoms/PromoTags/PromoTags';
import ImageComponent, { EmptyImage } from 'components/atoms/Media/Image';
import CardPrice from 'components/molecules/PricesComponents/CardPrice';
import CardSkuLabel from 'components/atoms/Labels/CardSkuLabel';
import { STORE_CONFIG } from 'constants/stores_config';
import SaleTag from 'components/atoms/PromoTags/SaleTag';
import { SampleNextArrow, SamplePrevArrow } from './SliderArrows';
import ProductItem from 'components/atoms/Sections/ProductItem';
import { Colors } from 'colors';

interface ShownModelInterface {
    price: string;
    images: { imageUrl: string }[];
    id: number;
    sku: string;
    colorCode: string;
    productId: number;
    quantity: number;
    originalPrice: number;
}

const CatalogFavoriteCard = ({ modelsVariants, name, productId, currency, promoTags }) => {
    const { OPTIONS } = STORE_CONFIG;
    const { STORE_TYPE } = OPTIONS;
    const imageRef = useRef<HTMLImageElement>(null);
    const sliderRef = useRef<HTMLImageElement>(null);
    const { s, sx, ls, l } = useDevice();
    const navigate = useNavigate();
    const { store, cart, currentUserData, favorites }: CatalogContextInterface = useOutletContext();
    const colorsBoxRef = useRef(null);
    const { storeCode, storeName } = useParams();
    const [shownModel, setShownModel] = useState<ShownModelInterface | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [sliderHeight, setSliderHeight] = useState<number | string>(0);

    const absentProduct = Boolean(!shownModel?.quantity);

    useEffect(() => {
        if (!modelsVariants?.length) return;
        setShownModel(modelsVariants.find(variant => variant.selected));
    }, [modelsVariants]);

    const getGridValue = () => {
        if (s) return 12;
        if (sx) return 6;
        if (ls) return 4;
        if (l) return 3;
        return 2;
    };

    useEffect(() => {
        setTimeout(() => {
            setSliderHeight(
                ((sliderRef?.current?.clientWidth || 1) / store?.productImagesOptions?.width) *
                    store?.productImagesOptions?.height
            );
        }, 100);
    }, [sliderRef?.current?.clientWidth]); // eslint-disable-line

    return (
        <Grid container xs={getGridValue()} sx={{ opacity: sliderHeight ? 1 : 0 }}>
            <ProductItem>
                {store?.additionalStoreSettings?.promo && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            zIndex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                        }}
                    >
                        {!!promoTags?.length && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                {promoTags?.map(el => (
                                    <PromoTags
                                        key={el.id}
                                        value={el.name || el.code}
                                        code={el.code}
                                        size={20}
                                        selected={true}
                                        disabled={true}
                                    />
                                ))}
                            </Box>
                        )}
                        <Box>
                            {STORE_TYPE === 'sales' && (
                                <SaleTag
                                    price={Number(shownModel?.originalPrice)}
                                    discountPrice={Number(shownModel?.price)}
                                />
                            )}
                        </Box>
                    </Box>
                )}

                <Box
                    sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, display: 'flex', gap: 0.5 }}
                    onClick={() => {
                        favorites?.handleSetFavoriteItems({
                            sku: shownModel?.sku,
                            storeCode,
                            userId: currentUserData?.id,
                            productId: shownModel?.productId,
                        });
                    }}
                >
                    <FavoritesButton
                        isShown={store?.additionalStoreSettings?.favorites}
                        selected={favorites?.favoriteItems?.find(item => item.sku === shownModel?.sku)}
                    />
                </Box>
                <Grid
                    container
                    xs={12}
                    sx={{
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        navigate(
                            `/catalog/${storeCode}/${storeName}/details/${productId}/model/${shownModel?.sku?.replaceAll(
                                '/',
                                '_'
                            )}`
                        );
                    }}
                >
                    <Grid ref={sliderRef} xs={12} sx={{ backgroundColor: Colors?.WHITE, height: sliderHeight || 250 }}>
                        {shownModel?.images?.length ? (
                            <Slider
                                dots={true}
                                nextArrow={<SampleNextArrow />}
                                prevArrow={<SamplePrevArrow />}
                                lazyLoad={true}
                                style={{
                                    height: sliderHeight,
                                    overflow: 'hidden',
                                    transition: 'height 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                            >
                                {shownModel?.images?.map(({ imageUrl }, idx) => {
                                    return (
                                        <Grid
                                            key={idx}
                                            xs={12}
                                            sx={{
                                                opacity: absentProduct ? 0.5 : 1,
                                                flexGrow: 1,
                                            }}
                                        >
                                            <ImageComponent imgUrl={imageUrl} ref={imageRef} height={sliderHeight} />{' '}
                                        </Grid>
                                    );
                                })}
                            </Slider>
                        ) : (
                            <>{shownModel?.images && <EmptyImage height={sliderHeight} />}</>
                        )}
                    </Grid>
                </Grid>
                <Box>
                    <Box
                        sx={{
                            height: 45,
                            zIndex: 1,
                        }}
                    >
                        <Box
                            sx={{
                                height: 45,
                                overflow: 'visible',
                                backgroundColor: Colors?.GRAY_300,
                                zIndex: 1,
                            }}
                        >
                            <Box
                                ref={colorsBoxRef}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: isExpanded ? 'wrap' : 'nowrap',
                                    backgroundColor: Colors?.GRAY_300,
                                    height: isExpanded ? '95px' : '45px',
                                    pt: 1,
                                    px: 0.2,
                                    transition: 'height 250ms cubic-bezier(0, 0.4, 0.2, 1)',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: 0.5,
                                        rowGap: 0,
                                        flexWrap: isExpanded ? 'wrap' : 'nowrap',
                                    }}
                                >
                                    <ColorIndicatorButton color={shownModel?.colorCode} size={33} />
                                </Box>
                            </Box>
                            <Box sx={{ ml: 1, mt: -1.5 }}>
                                <CollapseButton collapse={setIsExpanded} isShown={isExpanded} />
                            </Box>
                        </Box>
                        <Box sx={{ ml: 1, mt: -0.25 }}>
                            <CollapseButton collapse={setIsExpanded} isShown={isExpanded} />
                        </Box>
                    </Box>

                    <Box onClick={e => e.stopPropagation()}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                backgroundColor: Colors?.GRAY_300,
                            }}
                        >
                            <Typography
                                px={1}
                                py={0.5}
                                variant="h4"
                                sx={{
                                    height: 19,
                                    fontSize: 14,
                                    fontWeight: 500,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {!isExpanded && name}
                            </Typography>

                            <Box
                                px={1}
                                pb={0.25}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: Colors?.GRAY_300,
                                }}
                            >
                                {store?.mainStoreSettings?.prices && !isExpanded && (
                                    <CardPrice
                                        currency={currency}
                                        price={Number(shownModel?.originalPrice)}
                                        discountPrice={Number(shownModel?.price)}
                                    />
                                )}
                                <Box mx={0.5} sx={{ ml: 'auto' }}>
                                    <CardSkuLabel sku={shownModel?.sku as string} />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <CartButton
                                        selected={cart?.cartItems?.find(item => item.sku === shownModel?.sku)}
                                        isShown={store?.additionalStoreSettings?.cart}
                                        action={() => {
                                            cart?.handleSetCartItems({
                                                sku: shownModel?.sku,
                                                storeCode,
                                                userId: currentUserData?.id,
                                                productId: shownModel?.productId,
                                            });
                                        }}
                                    />

                                    <ShareButton
                                        isShown={store?.additionalStoreSettings?.promo}
                                        path={`${
                                            store?.webUrl
                                        }/catalog/${storeCode}/${storeName}/details/${productId}/model/${shownModel?.sku?.replaceAll(
                                            '/',
                                            '_'
                                        )}`}
                                        text=""
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </ProductItem>
        </Grid>
    );
};

export default CatalogFavoriteCard;
