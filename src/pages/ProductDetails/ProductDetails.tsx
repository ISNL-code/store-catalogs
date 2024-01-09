import { Box, Typography } from '@mui/material';
import { useProductsApi } from 'api/useProductsApi';
import BackButton from 'components/atoms/Buttons/BackButton';
import Loader from 'components/atoms/Loader/Loader';
import ShareButton from 'components/molecules/ToolsButtons/ShareButton';
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

    const {
        data: productRes,
        isFetching: loadProduct,
        refetch: updateModel,
    } = useProductsApi().useGetProductByID({ id: productId, lang: lang, store: storeCode });

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
    }, [productRes]);

    useEffect(() => {
        if (mount) return;
        updateModel();
    }, [lang]);

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

    const { xxs, xs, s, sm, sx, m, mx, ls, l, lx, slx, lxx, lxxx } = useDevice();

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
                )}
            />
            <Box
                mt={-10}
                pt={10}
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: sm ? 'column' : 'row',
                    justifyContent: 'center',
                    position: 'relative',
                    gap: sm ? 1 : 2,
                    opacity: loading ? 0 : 1,
                    transition: 'opacity 250ms cubic-bezier(0, 0.2, 0.5, 1)',
                }}
            >
                <Box
                    mt={-10}
                    pt={10}
                    mx={-2}
                    sx={{
                        width: sm ? '100vw' : m ? '300px' : ls ? '350px' : '475px',
                        height: 'auto',
                        overflowY: sm ? 'scroll' : 'auto',

                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                >
                    <ModelSwiper images={selectedVariant?.images} selectedVariant={selectedVariant} />
                </Box>
                <Box
                    sx={{
                        position: 'sticky',
                        width: m ? '100%' : '50%',
                        height: 'fit-content',
                        border: m ? 'none' : '1px solid #ececec',
                        borderRadius: m ? 0 : 2,
                        padding: m ? 0 : 4,
                        marginBottom: 1,
                        paddingTop: sm ? 0 : m ? 1 : 4,
                        paddingBottom: 0,
                        overflow: sm ? 'visible' : 'auto',
                        maxHeight: sm
                            ? ''
                            : `calc(100vh - ${headerHeight}px - ${instrumentalBarHeight}px - ${footerHeight}px - 16px)`,
                        '&::-webkit-scrollbar': {
                            display: m ? 'none' : '',
                        },
                    }}
                >
                    <ModelDetails
                        productDetails={productDetails}
                        selectedVariant={selectedVariant}
                        setSelectedVariant={setSelectedVariant}
                    />
                </Box>
            </Box>
        </>
    );
};

export default ProductDetails;
