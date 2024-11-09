import { Box, Button, IconButton } from '@mui/material';
import ShareButton from 'components/molecules/ToolsButtons/ShareButton';
import { Dispatch, SetStateAction, memo, useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ColorIndicatorButton from 'components/atoms/ColorIndicatorButton/ColorIndicatorButton';
import CartButton from 'components/molecules/ToolsButtons/CartButton';
import FavoritesButton from 'components/molecules/ToolsButtons/FavoritesButton';
import { ProductDataInterface, ProductVariantInterface } from 'types/app_models';
import Grid from '@mui/material/Unstable_Grid2';
import PromoTags from 'components/atoms/PromoTags/PromoTags';
import CardPrice from 'components/molecules/PricesComponents/CardPrice';
import CardSkuLabel from 'components/atoms/Labels/CardSkuLabel';
import SaleTag from 'components/atoms/PromoTags/SaleTag';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { Color, Colors } from 'constants/colors';
import { StoreType, ViewModeType } from 'store_constants/types';
import CardView from './CardView';
import GridMediumView from './GridMediumView';
import { useWindowWidth } from '@react-hook/window-size';
import CardDescriptionComponent from 'components/atoms/DescriptionComponents/CardDescriptionComponent';
import { SHARE_PRODUCT_PATH, STORE_ROUTE } from 'router/routes';
import { CatalogContextInterface } from 'types/outlet_context_models';
import { map_currency_symbol } from 'utils/mappers/currency_symbol';
import { EmptyImage } from 'components/atoms/Media/EmptyImage';
import ImageComponent from 'components/atoms/Media/Image';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import StraightenIcon from '@mui/icons-material/Straighten';
import CustomSwiper from '../swiper/CustomSwiper';
import StyledTooltip from 'components/molecules/StyledComponents/StyledTooltip';
import BlackFriday from './BlackFriday';

interface CatalogCardProps {
    modelsVariants: ProductVariantInterface[];
    name: string;
    productId: number;
    setProductsList?: Dispatch<SetStateAction<ProductDataInterface[] | null>>;
    promoTags: {
        id: number;
        name?: string;
        code?: string;
    }[];
    viewMode;
    sizesImage: string;
    productSizes;
    discounted: boolean;
}

const CatalogListCard = memo<CatalogCardProps>(
    ({
        modelsVariants,
        name,
        productId,
        setProductsList,
        promoTags,
        viewMode,
        sizesImage,
        productSizes,
        discounted,
    }) => {
        const WINDOW_WIDTH = useWindowWidth();
        const { OPTIONS, STORE_CODE } = STORE_CONFIG;
        const { STORE_TYPE, PLAN_OPTIONS, PRODUCT_IMAGE_OPTIONS } = OPTIONS;
        const sliderRef = useRef<HTMLImageElement>(null);
        const navigate = useNavigate();
        const { cart, favorites, store, handleOpenDialog, handleSetDialogState, string }: CatalogContextInterface =
            useOutletContext();
        const colorsBoxRef = useRef(null);
        const [shownModel, setShownModel] = useState<ProductVariantInterface | null>(null);
        const [sliderHeight, setSliderHeight] = useState<number | string>(0);

        useEffect(() => {
            if (!modelsVariants?.length) return;
            const selectedVariant = modelsVariants.find(variant => variant.selected) || modelsVariants[0];
            setShownModel(selectedVariant);
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
                        navigate(STORE_ROUTE?.product(STORE_CODE, productId, shownModel?.variantSku));
                    }}
                >
                    <Grid
                        xs={12}
                        sx={{
                            backgroundColor: Colors?.GRAY_100,
                            height: sliderHeight || 1,
                        }}
                    >
                        {Boolean(viewMode === ViewModeType?.card) ? (
                            <>
                                {shownModel?.images?.length ? (
                                    <>
                                        {Boolean(sliderHeight) && (
                                            <CustomSwiper
                                                slides={shownModel?.images?.map(({ imageUrl }) => imageUrl) || []}
                                                wrapperHeight={sliderHeight}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <>{Boolean(shownModel?.images) && <EmptyImage height={sliderHeight} />}</>
                                )}
                            </>
                        ) : (
                            <>
                                {shownModel?.images?.length ? (
                                    <>
                                        {Boolean(sliderHeight) && (
                                            <ImageComponent imageUrl={shownModel?.images[0]?.imageUrl} />
                                        )}
                                    </>
                                ) : (
                                    <>{Boolean(shownModel?.images) && <EmptyImage height={sliderHeight} />}</>
                                )}
                            </>
                        )}
                    </Grid>
                </Grid>
            );
        };

        const CardDetails = () => {
            return (
                <>
                    <Box onClick={e => e.stopPropagation()}>
                        <Box
                            p={1}
                            pb={0.5}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                backgroundColor: Colors?.GRAY_100,
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', height: 30 }}>
                                {PLAN_OPTIONS?.prices && (
                                    <CardPrice
                                        currency={map_currency_symbol(store?.currency)}
                                        originalPrice={shownModel?.originalPrice}
                                        price={shownModel?.price}
                                        discountPrice={shownModel?.price}
                                        discounted={discounted}
                                    />
                                )}
                                {!PLAN_OPTIONS?.prices && (
                                    <StyledTooltip
                                        title={string?.click_here_to_ask_for_wholesale_pricing_information}
                                        position="top-start"
                                        maxWidth={200}
                                    >
                                        <Button
                                            onClick={() => {
                                                handleOpenDialog(DialogWindowType?.PRICING);
                                                handleSetDialogState({ variantSku: shownModel?.variantSku });
                                            }}
                                            color="error"
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                py: 0,
                                                px: 1,
                                                fontSize: 11,
                                                lineHeight: 1,
                                                height: 25,
                                                borderRadius: 4,
                                                borderWidth: 2,
                                                fontWeight: 700,
                                                '&:hover': { borderWidth: 2 },
                                            }}
                                        >
                                            {string?.get_pricing}
                                        </Button>
                                    </StyledTooltip>
                                )}
                                {PLAN_OPTIONS?.tableSizes && sizesImage && (
                                    <Box>
                                        <IconButton
                                            onClick={() => {
                                                handleOpenDialog(DialogWindowType?.TABLE_SIZE);
                                                handleSetDialogState({
                                                    imageUrl: sizesImage,
                                                    availableSizes: productSizes?.map(({ code, name }) => {
                                                        return { name, code };
                                                    }),
                                                });
                                            }}
                                            size="small"
                                            sx={{
                                                border: `1px solid ${Color?.PRIMARY}`,
                                                ml: 'auto',
                                            }}
                                        >
                                            <StraightenIcon color="primary" fontSize="small" sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            height: 28,
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
                                    const selected = model?.variantId === shownModel?.variantId;

                                    if (!setProductsList && !selected) return null; //used for favorites list

                                    return (
                                        <ColorIndicatorButton
                                            key={idx}
                                            action={e => {
                                                e.stopPropagation();
                                                if (selected) return;
                                                if (setProductsList)
                                                    setProductsList(prev =>
                                                        prev
                                                            ? prev?.map(el => {
                                                                  if (el.id === productId) {
                                                                      return {
                                                                          ...el,
                                                                          variants: el.variants.map(variant => {
                                                                              if (variant.variantId === model.variantId)
                                                                                  return { ...variant, selected: true };
                                                                              return { ...variant, selected: false };
                                                                          }),
                                                                      };
                                                                  }
                                                                  return el;
                                                              })
                                                            : null
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
                            p={1}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                backgroundColor: Colors?.GRAY_100,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    width: '100%',
                                    gap: 0.5,
                                }}
                            >
                                <CardDescriptionComponent title={name} />
                                <CardSkuLabel sku={shownModel?.variantSku as string} />
                            </Box>

                            <CartButton
                                selected={cart?.cartItems?.find(item => item.variantSku === shownModel?.variantSku)}
                                isShown={PLAN_OPTIONS?.cart}
                                action={() => {
                                    if (shownModel?.variantSku)
                                        cart?.handleSetCartItems({
                                            variantSku: shownModel?.variantSku,
                                            storeCode: STORE_CODE,
                                            productId: shownModel?.productId,
                                        });
                                }}
                            />
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
                                        disabled={true}
                                        adaptive
                                    />
                                ))}
                            </Box>
                        )}
                    </Box>
                    <Box>
                        {STORE_TYPE === StoreType.sales && discounted && (
                            <>
                                <BlackFriday price={shownModel?.originalPrice} discountPrice={shownModel?.price} />
                            </>
                        )}
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 8,
                            left: 8,
                            zIndex: 1,
                            display: 'flex',
                            gap: 0.5,
                        }}
                    >
                        <Box>
                            {false && STORE_TYPE === StoreType.sales && discounted && (
                                <>
                                    <SaleTag price={shownModel?.originalPrice} discountPrice={shownModel?.price} />
                                </>
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ position: 'absolute', bottom: 8, right: 8, zIndex: 1 }}>
                        <ShareButton
                            isShown
                            path={SHARE_PRODUCT_PATH?.share_product_sku(STORE_CODE, productId, shownModel?.variantSku)}
                        />
                    </Box>
                    <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, display: 'flex', gap: 0.5 }}>
                        <FavoritesButton
                            isShown={PLAN_OPTIONS?.favorites}
                            selected={Boolean(
                                favorites?.favoriteItems?.find(item => item.variantSku === shownModel?.variantSku)
                            )}
                            onClick={() => {
                                if (shownModel?.variantSku)
                                    favorites?.handleSetFavoriteItems({
                                        variantSku: shownModel?.variantSku,
                                        storeCode: STORE_CODE,
                                        productId: shownModel?.productId,
                                    });
                            }}
                        />
                    </Box>
                </>
            );
        };

        return (
            <>
                {Boolean(viewMode === ViewModeType?.grid_m) && (
                    <GridMediumView
                        className="CatalogCard"
                        SliderComponent={SliderComponent}
                        CardDetails={CardDetails}
                        CardDecoration={CardDecoration}
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
