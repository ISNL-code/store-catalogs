import { Box } from '@mui/material';
import ShareButton from 'components/molecules/ToolsButtons/ShareButton';
import { memo, useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import ColorIndicatorButton from 'components/atoms/ColorIndicatorButton/ColorIndicatorButton';
import CartButton from 'components/molecules/ToolsButtons/CartButton';
import FavoritesButton from 'components/molecules/ToolsButtons/FavoritesButton';
import Slider from 'react-slick';
import { CatalogContextInterface } from 'types';
import Grid from '@mui/material/Unstable_Grid2';
import PromoTags from 'components/atoms/PromoTags/PromoTags';
import ImageComponent, { EmptyImage } from 'components/atoms/Media/Image';
import CardPrice from 'components/molecules/PricesComponents/CardPrice';
import CardSkuLabel from 'components/atoms/Labels/CardSkuLabel';
import SaleTag from 'components/atoms/PromoTags/SaleTag';
import { STORE_CONFIG } from 'constants/stores_config';
import { Colors } from 'colors';
import { SampleNextArrow, SamplePrevArrow } from '../../atoms/Elements/SliderArrows';
import { StoreType, ViewModeType } from 'constants/types';
import CardView from './CardView';
import GridLargeView from './GridLargeView';
import GridMediumView from './GridMediumView';
import { useWindowWidth } from '@react-hook/window-size';
import CardDescriptionComponent from 'components/atoms/DescriptionComponents/CardDescriptionComponent';

interface ShownModelInterface {
    price: string;
    images: { imageUrl: string }[];
    id: number;
    sku: string;
    productId: number;
    quantity: number;
    originalPrice: number;
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
    setProductsList?: (value: any) => void;
    promoTags: {
        id: number;
        name?: string;
        code?: string;
    }[];
}

export const MemoizedColorIndicatorButton = memo(ColorIndicatorButton, (prevProps, nextProps) => {
    return prevProps.selected === nextProps.selected && prevProps.color === nextProps.color;
});

const CatalogListCard = memo<CatalogCardProps>(
    ({ modelsVariants, name, productId, currency, setProductsList, promoTags }) => {
        const WINDOW_WIDTH = useWindowWidth();
        const { OPTIONS } = STORE_CONFIG;
        const { STORE_TYPE, PLAN_OPTIONS, PRODUCT_IMAGE_OPTIONS } = OPTIONS;
        const sliderRef = useRef<HTMLImageElement>(null);
        const navigate = useNavigate();
        const { cart, favorites, currentUserData, viewMode }: CatalogContextInterface = useOutletContext();
        const colorsBoxRef = useRef(null);
        const { storeCode, storeName } = useParams();
        const [shownModel, setShownModel] = useState<ShownModelInterface | null>(null);
        const [sliderHeight, setSliderHeight] = useState<number | string>(0);

        const absentProduct = Boolean(!shownModel?.quantity);

        useEffect(() => {
            if (!modelsVariants?.length) return;
            const selectedVariant = modelsVariants.find(variant => variant.selected);
            setShownModel(selectedVariant ? selectedVariant : null);
        }, [modelsVariants]);

        useEffect(() => {
            setTimeout(() => {
                setSliderHeight(
                    ((sliderRef?.current?.clientWidth || 1) / PRODUCT_IMAGE_OPTIONS?.width) *
                        PRODUCT_IMAGE_OPTIONS?.height
                );
            }, 100);
        }, [viewMode, WINDOW_WIDTH, sliderRef?.current?.clientWidth]); // eslint-disable-line

        const SliderComponent = () => {
            return (
                <Grid
                    ref={sliderRef}
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
                        xs={12}
                        sx={{
                            backgroundColor: Colors?.WHITE,
                            height: sliderHeight || 1,
                        }}
                    >
                        {shownModel?.images?.length ? (
                            <>
                                {Boolean(sliderHeight) && (
                                    <Slider
                                        dots={true}
                                        nextArrow={<SampleNextArrow />}
                                        prevArrow={<SamplePrevArrow />}
                                        lazyLoad={true}
                                        style={{
                                            height: sliderHeight || 1,
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
                                                        ref={null}
                                                        height={sliderHeight}
                                                    />
                                                </Grid>
                                            );
                                        })}
                                    </Slider>
                                )}
                            </>
                        ) : (
                            <>{Boolean(shownModel?.images) && <EmptyImage height={sliderHeight} />}</>
                        )}
                    </Grid>
                </Grid>
            );
        };

        const CardDetails = () => {
            return (
                <>
                    <Box
                        sx={{
                            height: 45,
                            zIndex: 1,
                        }}
                    >
                        <Box
                            ref={colorsBoxRef}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'nowrap',
                                backgroundColor: Colors?.GRAY_100,
                                height: '45px',
                                pt: 1,
                                px: 0.2,
                                transition: 'height 250ms cubic-bezier(0, 0.4, 0.2, 1)',
                            }}
                        >
                            <Box
                                px={0.25}
                                className="CardColorsWrapper"
                                sx={{
                                    display: 'flex',
                                    gap: 0.4,
                                    rowGap: 0,
                                    flexWrap: 'nowrap',
                                    overflow: 'auto',
                                }}
                            >
                                {modelsVariants?.map((model, idx) => {
                                    const selected = model?.id === shownModel?.id;

                                    if (!setProductsList && !selected) return null; //used for favorites list

                                    return (
                                        <MemoizedColorIndicatorButton
                                            key={idx}
                                            action={e => {
                                                e.stopPropagation();
                                                if (selected) return;
                                                if (setProductsList)
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
                                            size={viewMode === ViewModeType?.grid_m ? 28 : 30}
                                        />
                                    );
                                })}
                            </Box>
                        </Box>
                    </Box>

                    <Box onClick={e => e.stopPropagation()}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                backgroundColor: Colors?.GRAY_100,
                            }}
                        >
                            <CardDescriptionComponent title={name} />
                            <Box
                                px={1}
                                pb={0.25}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: Colors?.GRAY_100,
                                    flexWrap: 'wrap',
                                    gap: 0.5,
                                }}
                            >
                                <Box sx={{ width: 95 }}>
                                    {PLAN_OPTIONS?.prices && (
                                        <CardPrice
                                            currency={currency}
                                            price={Number(shownModel?.originalPrice)}
                                            discountPrice={Number(shownModel?.price)}
                                        />
                                    )}
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        gap: 0.5,
                                        width: '150px',
                                        ml: 'auto',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            maxWidth: 85,
                                        }}
                                    >
                                        <CardSkuLabel sku={shownModel?.sku as string} />
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            gap: 0.5,
                                            my: 0.25,
                                            width: 64,
                                        }}
                                    >
                                        <CartButton
                                            selected={cart?.cartItems?.find(item => item.sku === shownModel?.sku)}
                                            isShown={PLAN_OPTIONS?.cart}
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
                                            isShown
                                            path={`${
                                                window.location.href
                                            }/details/${productId}/model/${shownModel?.sku?.replaceAll('/', '_')}`}
                                            text=""
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </>
            );
        };

        const CardDecoration = () => {
            return (
                <>
                    {!sliderHeight && <Box sx={{ height: '100vh' }}></Box>}

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
                        {Boolean(promoTags?.length) && (
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
                            {STORE_TYPE === StoreType.sales && (
                                <SaleTag
                                    price={Number(shownModel?.originalPrice)}
                                    discountPrice={Number(shownModel?.price)}
                                />
                            )}
                        </Box>
                    </Box>

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
                            isShown={PLAN_OPTIONS?.favorites}
                            selected={favorites?.favoriteItems?.find(item => item.sku === shownModel?.sku)}
                        />
                    </Box>
                </>
            );
        };

        return (
            <>
                {Boolean(viewMode === ViewModeType?.grid_l) && (
                    <GridLargeView
                        className="CatalogCard"
                        SliderComponent={SliderComponent}
                        CardDetails={CardDetails}
                        CardDecoration={CardDecoration}
                        opacity={Boolean(sliderHeight)}
                    />
                )}
                {Boolean(viewMode === ViewModeType?.grid_m) && (
                    <GridMediumView
                        className="CatalogCard"
                        SliderComponent={SliderComponent}
                        CardDetails={CardDetails}
                        CardDecoration={CardDecoration}
                        opacity={Boolean(sliderHeight)}
                    />
                )}
                {Boolean(viewMode === ViewModeType?.card) && (
                    <CardView
                        className="CatalogCard"
                        SliderComponent={SliderComponent}
                        CardDetails={CardDetails}
                        CardDecoration={CardDecoration}
                        opacity={Boolean(sliderHeight)}
                    />
                )}
            </>
        );
    }
);

export default CatalogListCard;
