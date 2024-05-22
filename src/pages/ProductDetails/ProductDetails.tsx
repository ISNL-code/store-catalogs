import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useProductsApi } from 'api/useProductsApi';
import BackButton from 'components/atoms/Buttons/BackButton';
import Loader from 'components/atoms/Loader/Loader';
import TransitionBox from 'components/atoms/Transitions/TransitionBox';
import ShareButton from 'components/molecules/ToolsButtons/ShareButton';
import SkuSearch from 'components/molecules/ToolsButtons/SkuSearch';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import { useDevice } from 'hooks/useDevice';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { CatalogContextInterface, ProductVariantInterface } from 'types';
import ModelDetails from './ModelDetails';
import ModelSwiper from './ModelSwiper';
import { scrollToTopNewPage } from 'helpers/scroll';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { STORE_ROUTE } from 'constants/routes';

interface LoadedProductInterface {
    id?: number;
    variants?: ProductVariantInterface[];
    promoTags?: any[];
    name?: string;
    sizes?: any[];
    price?: string;
    title: string;
    promo: any[];
    details: string;
    originalPrice: number;
}

interface SelectedVarianInterface {
    images?: any[];
}

const ProductDetails = () => {
    const { OPTIONS, STORE_CODE } = STORE_CONFIG;
    const { PLAN_OPTIONS } = OPTIONS;
    const mount = useIsMount();
    const { headerHeight, instrumentalBarHeight, footerMenuHeight, lang, appXPadding }: CatalogContextInterface =
        useOutletContext();
    const { modelSku, storeCode, productId } = useParams();
    const [productDetails, setProductDetails] = useState<LoadedProductInterface | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<SelectedVarianInterface | undefined | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    }, []);

    const {
        data: productRes,
        isFetching: loadProduct,
        refetch: updateModel,
    } = useProductsApi().useGetProductByID({ id: productId, lang: lang, storeCode });

    useEffect(() => {
        if (!productRes || loadProduct) return;

        const product = productRes?.data?.products[0];
        const prices = product?.variants?.map(el => Number(el?.inventory[0]?.price)) || [0];
        setProductDetails({
            title: product?.description.title,
            details: product?.description.description,
            originalPrice: Math.max(...prices),
            price: product?.finalPrice,
            id: product?.id,
            variants: product?.variants.sort((a, b) => a.sortOrder - b.sortOrder).filter(el => el.images.length),
            promo:
                product?.options
                    .find(({ code }) => code === 'PROMO')
                    ?.optionValues.map(({ code, id, description }) => {
                        return { code, id, name: description?.name };
                    })
                    .sort((a, b) => a.code - b.code) || [],
            sizes:
                product?.options
                    .find(({ code }) => code === 'SIZE')
                    ?.optionValues.map(({ code, id, description }) => {
                        return { code, id, name: description?.name };
                    })
                    .sort((a, b) => a.code - b.code) || [],
        });
        scrollToTopNewPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productRes, modelSku]);

    useEffect(() => {
        if (mount) return;
        updateModel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang, productId]);

    useEffect(() => {
        if (loadProduct) return;
        if (!loading) return;
        setTimeout(() => {
            setLoading(false);
        }, 250);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadProduct]);

    useEffect(() => {
        if (!productDetails) return;

        setSelectedVariant(productDetails?.variants?.find(product => product.sku === modelSku?.replaceAll('_', '/')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productDetails]);

    const { sx, m, ls } = useDevice();

    const swiperGrid = () => {
        if (sx) return 12;
        return 4;
    };
    const detailsGrid = () => {
        if (sx) return 12;
        return 8;
    };

    if (!productDetails) return <Loader />;

    return (
        <Box px={appXPadding} pb={footerMenuHeight}>
            <InstrumentalSubHeader
                StartSlot={() => <BackButton nav={STORE_ROUTE?.root(STORE_CODE)} action={() => {}} />}
                EndSlot={() => (
                    <Box sx={{ display: 'flex', gap: 0.75 }}>
                        <SkuSearch />
                        <ShareButton path={window.location.href} isShown={PLAN_OPTIONS.productShare} direction="down" />
                    </Box>
                )}
            />
            <TransitionBox dependency={loading}>
                <Grid container xs={12} px={ls ? 0 : 30}>
                    <Grid
                        mt={-10}
                        pt={10}
                        xs={swiperGrid()}
                        sx={{
                            overflow: 'scroll',
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                        }}
                    >
                        <ModelSwiper images={selectedVariant?.images} />
                    </Grid>
                    <Grid
                        px={2}
                        pt={2}
                        xs={detailsGrid()}
                        sx={{
                            height: '100%',
                            overflow: 'scroll',
                            maxHeight: sx
                                ? ''
                                : `calc(100vh - ${headerHeight}px - ${instrumentalBarHeight}px - ${footerMenuHeight}px - 16px)`,
                            '&::-webkit-scrollbar': {
                                display: m ? 'none' : '',
                            },
                        }}
                    >
                        <Box>
                            <ModelDetails
                                productDetails={productDetails}
                                selectedVariant={selectedVariant}
                                setSelectedVariant={setSelectedVariant}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </TransitionBox>
        </Box>
    );
};

export default ProductDetails;
