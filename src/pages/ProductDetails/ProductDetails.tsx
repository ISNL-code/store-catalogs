import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useProductsApi } from 'api/useProductsApi';
import BackButton from 'components/atoms/Buttons/BackButton';
import Loader from 'components/atoms/Loader/Loader';
import TransitionBox from 'components/atoms/Transitions/TransitionBox';
import ShareButton from 'components/molecules/ToolsButtons/ShareButton';
import SkuSearch from 'components/molecules/ToolsButtons/SkuSearch';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import { WEB_URL } from 'constants/constants';
import { useDevice } from 'hooks/useDevice';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { CatalogContextInterface, ProductVariantInterface } from 'types';
import ModelDetails from './ModelDetails';
import ModelSwiper from './ModelSwiper';

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
}

interface SelectedVarianInterface {
    images?: any[];
}

const ProductDetails = () => {
    const mount = useIsMount();
    const { store, lang, headerHeight, instrumentalBarHeight, footerHeight }: CatalogContextInterface =
        useOutletContext();
    const { modelSKU, storeCode, storeName, productId } = useParams();
    const [productDetails, setProductDetails] = useState<LoadedProductInterface | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<SelectedVarianInterface | undefined | null>(null);
    const [loading, setLoading] = useState(true);
    const [supportedLanguage, setSupportedLanguage] = useState<any>();

    const {
        data: productRes,
        isFetching: loadProduct,
        refetch: updateModel,
    } = useProductsApi().useGetProductByID({ id: productId, lang: supportedLanguage, store: storeCode });

    useEffect(() => {
        if (!productRes) return;
        const product = productRes.data.products[0];

        setProductDetails({
            title: product?.description.title,
            details: product?.description.description,
            price: product?.finalPrice,
            id: product?.id,
            variants: product?.variants.sort((a, b) => a.sortOrder - b.sortOrder),
            promo:
                product?.options
                    .find(({ code }) => code === 'PROMO')
                    ?.optionValues.map(({ code, id }) => {
                        return { code, id };
                    })
                    .sort((a, b) => a.code - b.code) || [],
            sizes:
                product?.options
                    .find(({ code }) => code === 'SIZE')
                    ?.optionValues.map(({ code, id }) => {
                        return { code, id };
                    })
                    .sort((a, b) => a.code - b.code) || [],
        });
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    }, [productRes, modelSKU]);

    useEffect(() => {
        if (mount) return;
        updateModel();
    }, [lang, modelSKU]);

    useEffect(() => {
        if (loadProduct) return;
        if (!loading) return;
        setTimeout(() => {
            setLoading(false);
        }, 250);
    }, [loadProduct]);

    useEffect(() => {
        if (!productDetails) return;

        setSelectedVariant(productDetails?.variants?.find(product => product.sku === modelSKU));
    }, [productDetails]);

    useEffect(() => {
        if (!store?.supportedLanguages) return;

        setSupportedLanguage(store?.supportedLanguages?.find(el => el.code === lang) ? lang : 'en');
    }, [lang, store?.supportedLanguages]);

    const { sx, m, ls } = useDevice();

    const swiperGrid = () => {
        if (sx) return 12;
        return 4;
    };
    const detailsGrid = () => {
        if (sx) return 12;
        return 8;
    };

    return (
        <>
            {loadProduct && <Loader />}
            <InstrumentalSubHeader
                StartSlot={() => <BackButton nav={`/catalog/${storeCode}/${storeName}`} action={() => {}} />}
                CentralSlot={() => (
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Typography sx={{ backgroundColor: '#fff', padding: 0.5, px: 2, borderRadius: 50 }}>
                            {modelSKU?.replaceAll('_', '/')}
                        </Typography>
                    </Box>
                )}
                EndSlot={() => (
                    <Box sx={{ display: 'flex', gap: 0.75 }}>
                        {store?.mainStoreSettings?.skuSearch && <SkuSearch />}
                        <ShareButton
                            path={`${WEB_URL}/catalog/${storeCode}/${storeName}/details/${productId}/model/${modelSKU?.replaceAll(
                                '/',
                                '_'
                            )}`}
                            text=""
                            color="#ccc"
                            size={35}
                            orientation="down"
                            isShown={store?.mainStoreSettings?.productShare}
                        />
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
                        <ModelSwiper images={selectedVariant?.images} selectedVariant={selectedVariant} />
                    </Grid>
                    <Grid
                        xs={detailsGrid()}
                        sx={{
                            height: '100%',
                            overflow: 'scroll',
                            maxHeight: sx
                                ? ''
                                : `calc(100vh - ${headerHeight}px - ${instrumentalBarHeight}px - ${footerHeight}px - 16px)`,
                            '&::-webkit-scrollbar': {
                                display: m ? 'none' : '',
                            },
                        }}
                    >
                        <Box p={sx ? 0 : 2}>
                            <ModelDetails
                                productDetails={productDetails}
                                selectedVariant={selectedVariant}
                                setSelectedVariant={setSelectedVariant}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </TransitionBox>
        </>
    );
};

export default ProductDetails;
