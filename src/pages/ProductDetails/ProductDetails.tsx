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
import { useEffect, useState, useMemo } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { ProductDataInterface } from 'types/app_models';
import ModelDetails from './ModelDetails';
import ModelSwiper from './ModelSwiper';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { STORE_ROUTE } from 'router/routes';
import { CatalogContextInterface } from 'types/outlet_context_models';
import { scrollPage } from 'utils/scrollPage';
import { map_product_card } from 'utils/mappers/product_data';

interface SelectedVariantInterface {
    images?: any[];
}

const ProductDetails = () => {
    const { OPTIONS, STORE_CODE } = STORE_CONFIG;
    const { PLAN_OPTIONS } = OPTIONS;
    const mount = useIsMount();
    const { headerHeight, instrumentalBarHeight, footerMenuHeight, lang, appXPadding }: CatalogContextInterface =
        useOutletContext();
    const { modelSku, storeCode, productId } = useParams();
    const [productDetails, setProductDetails] = useState<ProductDataInterface | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<SelectedVariantInterface | undefined | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        scrollPage(0);
    }, []);

    const {
        data: productRes,
        isFetching: loadProduct,
        refetch: updateModel,
    } = useProductsApi().useGetProductByID({ id: productId, lang, storeCode });

    useEffect(() => {
        if (productRes && !loadProduct) {
            const newData: ProductDataInterface | null = map_product_card?.details_card(productRes?.data?.products);
            setProductDetails(newData);
        }
    }, [productRes, loadProduct]);

    useEffect(() => {
        if (!mount) {
            updateModel();
        }
    }, [lang, productId, mount, updateModel]);

    useEffect(() => {
        if (loadProduct && loading) {
            setTimeout(() => {
                setLoading(false);
            }, 250);
        }
    }, [loadProduct, loading]);

    useEffect(() => {
        if (productDetails) {
            setSelectedVariant(
                productDetails?.variants?.find(product => product.variantSku === modelSku?.replaceAll('_', '/'))
            );
        }
    }, [productDetails, modelSku]);

    const { sx, ls } = useDevice();

    const swiperGrid = useMemo(() => (sx ? 12 : 4), [sx]);
    const detailsGrid = useMemo(() => (sx ? 12 : 8), [sx]);

    return (
        <Box px={appXPadding} sx={{ pb: `${footerMenuHeight}px` }}>
            <InstrumentalSubHeader
                StartSlot={() => <BackButton nav={STORE_ROUTE?.root(STORE_CODE)} />}
                EndSlot={() => (
                    <Box sx={{ display: 'flex', gap: 0.75 }}>
                        <SkuSearch />
                        <ShareButton path={window.location.href} isShown={PLAN_OPTIONS.productShare} />
                    </Box>
                )}
            />
            {!productDetails && <Loader />}
            <TransitionBox dependency={loading}>
                <Grid container xs={12} px={ls ? 0 : 30}>
                    <Grid
                        mt={-10}
                        pt={10}
                        xs={swiperGrid}
                        sx={{
                            overflow: 'auto',
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                        }}
                    >
                        <ModelSwiper images={selectedVariant?.images || []} />
                    </Grid>
                    <Grid
                        px={2}
                        pt={2}
                        xs={detailsGrid}
                        sx={{
                            height: '100%',
                            overflow: sx ? 'visible' : 'auto',
                            maxHeight: sx
                                ? ''
                                : `calc(100vh - ${headerHeight + instrumentalBarHeight + footerMenuHeight}px - 16px)`,
                            '&::-webkit-scrollbar': {
                                display: 'none',
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
