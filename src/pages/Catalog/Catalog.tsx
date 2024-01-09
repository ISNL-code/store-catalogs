import { Box } from '@mui/material';
import Loader from 'components/atoms/Loader/Loader';
import CatalogCard from 'components/organisms/Cards/CatalogCard';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import ScrollButton from 'components/atoms/Buttons/ScrollButton';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import LoadMoreButton from 'components/atoms/Buttons/LoadMoreButton';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import FilterCategories from 'components/organisms/Filters/FilterCategories';
import BackButton from 'components/atoms/Buttons/BackButton';
import SkuSearch from 'components/molecules/ToolsButtons/SkuSearch';
import { CatalogContextInterface } from 'types';
import TransitionBox from 'components/atoms/Transitions/TransitionBox';

const Catalog = () => {
    const {
        store,
        productsList,
        scrollPosition,
        loadProducts,
        setScrollPosition,
        setProductsList,
        instrumentalBarHeight,
        headerHeight,
    }: CatalogContextInterface = useOutletContext();
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loadProducts) return;

        setTimeout(() => {
            setLoading(false);
        }, 150);
    }, [loadProducts, loading]);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 1200) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });

        setTimeout(() => {
            window.scrollTo({
                top: scrollPosition - (instrumentalBarHeight + headerHeight),
                behavior: 'auto',
            });
            setScrollPosition(0);
        }, 150);
    }, []);

    return (
        <Box pb={1}>
            {showTopBtn && <ScrollButton />}
            {loading && <Loader />}
            <InstrumentalSubHeader
                StartSlot={() => <BackButton nav="/" action={() => {}} />}
                EndSlot={() => (
                    <Box sx={{ display: 'flex', gap: 0.75 }}>
                        {store?.mainStoreSettings?.skuSearch && <SkuSearch />}
                        <FilterCategories isShown={store?.mainStoreSettings?.categories} />
                    </Box>
                )}
            />

            {productsList?.length ? (
                <TransitionBox dependency={loading}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1,
                            rowGap: 2,
                        }}
                    >
                        {productsList?.map(product => {
                            return (
                                <CatalogCard
                                    key={product.id}
                                    modelsVariants={product.variants}
                                    name={product.name}
                                    productID={product.id}
                                    imgHeight={store?.productImagesOptions?.height}
                                    imgWidth={store?.productImagesOptions?.width}
                                    currency={getCurrencySymbol(store?.currency)}
                                    setProductsList={setProductsList}
                                    cropX={store?.productImagesOptions?.cropX}
                                    withCart={store?.additionalStoreSettings?.cart}
                                    withFavorites={store?.additionalStoreSettings?.favorites}
                                    withShare={store?.mainStoreSettings?.productShare}
                                    promoTags={product?.promoTags}
                                />
                            );
                        })}
                    </Box>
                </TransitionBox>
            ) : !productsList?.length && !loadProducts && !loading ? (
                <>
                    <InstrumentalSubHeader StartSlot={() => <BackButton nav="/" action={() => {}} />} />
                    <EmptyPage isShown />;
                </>
            ) : (
                <Loader position="fixed" />
            )}
            {!!productsList?.length && !loading && <LoadMoreButton />}
        </Box>
    );
};

export default Catalog;
