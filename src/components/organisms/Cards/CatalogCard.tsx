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
import CardItem from 'components/atoms/Sections/CardItem';
import Grid from '@mui/material/Unstable_Grid2';
import PromoTags from 'components/atoms/PromoTags/PromoTags';
import { Image, EmptyImage } from 'components/atoms/Media/Image';
import CardPrice from 'components/molecules/PricesComponents/CardPrice';
import CardSkuLabel from 'components/atoms/Labels/CardSkuLabel';

interface ShownModelInterface {
    price: string;
    images: { imageUrl: string }[];
    id: number;
    sku: string;
    productId: number;
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
    // Можно добавить дополнительное сравнение пропсов, если нужно
    return prevProps.selected === nextProps.selected && prevProps.color === nextProps.color;
});

const CatalogCard = memo<CatalogCardProps>(
    ({ modelsVariants, name, productId, currency, setProductsList, promoTags }) => {
        const imageRef = useRef<HTMLImageElement>(null);
        const { s, sx, ls, l } = useDevice();
        const navigate = useNavigate();
        const { store, cart, favorites, currentUserData }: CatalogContextInterface = useOutletContext();
        const colorsBoxRef = useRef(null);
        const { storeCode, storeName } = useParams();
        const [shownModel, setShownModel] = useState<ShownModelInterface | null>(null);
        const [isExpanded, setIsExpanded] = useState(false);

        useEffect(() => {
            if (!modelsVariants?.length) return;
            const selectedVariant = modelsVariants.find(variant => variant.selected);
            setShownModel(selectedVariant ? selectedVariant : null); // Установка null вместо undefined
        }, [modelsVariants]);

        const getGridValue = () => {
            if (s) return 12;
            if (sx) return 6;
            if (ls) return 4;
            if (l) return 3;
            return 2;
        };

        return (
            <Grid p={1} xs={getGridValue()}>
                <CardItem>
                    {store?.additionalStoreSettings?.promo && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 10,
                                left: 10,
                                zIndex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0.5,
                            }}
                        >
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

                    <Box
                        sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1, display: 'flex', gap: 0.5 }}
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
                            display: 'flex',
                            cursor: 'pointer',
                            backgroundColor: '#fff',
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
                            ref={imageRef}
                            sx={{
                                height:
                                    ((imageRef?.current?.clientWidth as number) / store?.productImagesOptions?.width) *
                                    store?.productImagesOptions?.height,
                            }}
                        >
                            {shownModel?.images?.length ? (
                                <Slider
                                    dots={true}
                                    nextArrow={<SampleNextArrow />}
                                    prevArrow={<SamplePrevArrow />}
                                    lazyLoad={true}
                                >
                                    {shownModel?.images?.map(({ imageUrl }, idx) => {
                                        return (
                                            <Grid
                                                key={idx}
                                                alignItems="center"
                                                xs={12}
                                                sx={{
                                                    height:
                                                        ((imageRef?.current?.clientWidth as number) /
                                                            store?.productImagesOptions?.width) *
                                                        store?.productImagesOptions?.height,
                                                    display: 'flex !important',
                                                    alignItems: 'center',
                                                    backgroundColor: '#fafafa',
                                                }}
                                            >
                                                <Image store={store} imgUrl={imageUrl} ref={imageRef} />
                                            </Grid>
                                        );
                                    })}
                                </Slider>
                            ) : (
                                <Grid
                                    xs={12}
                                    justifyContent="center"
                                    alignItems="center"
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        height:
                                            ((imageRef?.current?.clientWidth as number) /
                                                store?.productImagesOptions?.width) *
                                            store?.productImagesOptions?.height,
                                    }}
                                >
                                    <EmptyImage />
                                </Grid>
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
                                    backgroundColor: '#fafafa',
                                    height: isExpanded ? '95px' : '45px',
                                    pt: 1,
                                    px: 0.2,
                                    transition: 'height 250ms cubic-bezier(0, 0.4, 0.2, 1)',
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: '#fafafa',
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
                                    backgroundColor: '#fafafa',
                                }}
                            >
                                {store?.mainStoreSettings?.prices && !isExpanded && (
                                    <CardPrice currency={currency} price={Number(shownModel?.price)} />
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

                                <Box
                                    px={1}
                                    pb={0.5}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    {store?.mainStoreSettings?.prices && (
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h3" sx={{ color: '#505050' }}>
                                                {!isExpanded && currency}
                                                {!isExpanded && Number(shownModel?.price)}
                                            </Typography>
                                        </Box>
                                    )}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <Box
                                            px={1}
                                            sx={{
                                                border: '1px solid #ccc',
                                                height: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                backgroundColor: '#fff',
                                                borderRadius: '16px',
                                            }}
                                        >
                                            <Typography variant="h6" sx={{ color: 'gray' }}>
                                                {shownModel?.sku}
                                            </Typography>
                                        </Box>
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
                </CardItem>
            </Grid>
        );
    }
);

export default CatalogCard;
