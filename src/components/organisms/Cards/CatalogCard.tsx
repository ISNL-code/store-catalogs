import { Box, IconButton, Typography } from '@mui/material';
import ShareButton from 'components/molecules/ToolsButtons/ShareButton';
import { memo, useEffect, useRef, useState } from 'react';
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
import Grid from '@mui/material/Unstable_Grid2';
import PromoTags from 'components/atoms/PromoTags/PromoTags';
import ImageComponent, { EmptyImage } from 'components/atoms/Media/Image';
import CardPrice from 'components/molecules/PricesComponents/CardPrice';
import CardSkuLabel from 'components/atoms/Labels/CardSkuLabel';
import SaleTag from 'components/atoms/PromoTags/SaleTag';
import { STORE_CONFIG } from 'constants/stores_config';
import { Colors } from 'colors';
import ProductItem from 'components/atoms/Sections/ProductItem';
import Loader from 'components/atoms/Loader/Loader';

interface ShownModelInterface {
    price: string;
    images: { imageUrl: string }[];
    id: number;
    sku: string;
    productId: number;
    quantity: number;
    originalPrice: number;
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

interface CatalogCardProps {
    modelsVariants: {
        id: number;
        selected?: boolean;
        colorCode?: string;
        productId: number;
        price: string;
        images: any[];
        sku: string;
        quantity: number;
        originalPrice: number;
    }[];
    name: string;
    productId: number;
    currency: string;
    setProductsList: (value: any) => void;
    promoTags: {
        id: number;
        name?: string;
        code?: string;
    }[];
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

const MemoizedColorIndicatorButton = memo(ColorIndicatorButton, (prevProps, nextProps) => {
    return prevProps.selected === nextProps.selected && prevProps.color === nextProps.color;
});

const CatalogCard = memo<CatalogCardProps>(
    ({ modelsVariants, name, productId, currency, setProductsList, promoTags }) => {
        const { OPTIONS } = STORE_CONFIG;
        const { STORE_TYPE } = OPTIONS;
        const imageRef = useRef<HTMLImageElement>(null);
        const sliderRef = useRef<HTMLImageElement>(null);
        const { s, sx, ls, l } = useDevice();
        const navigate = useNavigate();
        const { store, cart, favorites, currentUserData }: CatalogContextInterface = useOutletContext();
        const colorsBoxRef = useRef(null);
        const { storeCode, storeName } = useParams();
        const [shownModel, setShownModel] = useState<ShownModelInterface | null>(null);
        const [isExpanded, setIsExpanded] = useState(false);
        const [sliderHeight, setSliderHeight] = useState<number | string>(0);

        const absentProduct = Boolean(!shownModel?.quantity);

        useEffect(() => {
            if (!modelsVariants?.length) return;
            const selectedVariant = modelsVariants.find(variant => variant.selected);
            setShownModel(selectedVariant ? selectedVariant : null);
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
                {!sliderHeight && <Loader />}
                <ProductItem>
                    {store?.additionalStoreSettings?.promo && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 8,
                                left: 8,
                                zIndex: 1,
                                display: 'flex',
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
                        <Grid
                            ref={sliderRef}
                            xs={12}
                            sx={{ backgroundColor: Colors?.WHITE, height: sliderHeight || 250 }}
                        >
                            {shownModel?.images?.length ? (
                                <>
                                    {sliderHeight && (
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
                                                        <ImageComponent
                                                            imgUrl={imageUrl}
                                                            ref={imageRef}
                                                            height={sliderHeight}
                                                        />
                                                    </Grid>
                                                );
                                            })}
                                        </Slider>
                                    )}
                                </>
                            ) : (
                                <>{shownModel?.images && <EmptyImage height={sliderHeight} />}</>
                            )}
                        </Grid>
                    </Grid>
                    <Box>
                        <Box
                            sx={{
                                height: 45,
                                overflow: 'visible',
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
                                        gap: 0.4,
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
                                                    size={30}
                                                    sum={modelsVariants.length - 6}
                                                />
                                            );
                                        return (
                                            <MemoizedColorIndicatorButton
                                                key={idx}
                                                action={e => {
                                                    e.stopPropagation();
                                                    if (selected) return;
                                                    setProductsList(prev =>
                                                        prev.map(el => {
                                                            if (el.id === productId) {
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
                                                size={30}
                                            />
                                        );
                                    })}
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
                                        height: 16,
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
                                    pb={0.5}
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
    }
);

export default CatalogCard;
