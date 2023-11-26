import { Box } from '@mui/material';
import ScrollButton from 'components/atoms/Buttons/ScrollButton';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import StoreCard from 'components/organisms/Cards/StoreCard';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import FilterTypes from 'components/organisms/Filters/FilterTypes';
import { StoresContextInterface } from 'types';
import Loader from 'components/atoms/Loader/Loader';
import HeaderSearchButton from 'components/molecules/ToolsButtons/HeaderSearchButton';

const Stores = () => {
    const {
        sortedStores,
        filteredStores,
        setScrollPosition,
        scrollPosition,
        instrumentalBarHeight,
        headerHeight,
        setStoreToApprove,
        favoritesStores,
        storesList,
        loadStores,
        loadFavoritesStores,
    }: StoresContextInterface = useOutletContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [showTopBtn, setShowTopBtn] = useState<boolean>(false);

    const listener = () => {
        if (window.scrollY > 600) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', listener);

        setTimeout(() => {
            window.scrollTo({
                top: scrollPosition - (instrumentalBarHeight + headerHeight),
                behavior: 'auto',
            });
            setScrollPosition(0);
        }, 150);
    }, []);

    useEffect(() => {
        if (loadStores) return;
        window.addEventListener('scroll', listener);

        setTimeout(() => {
            setLoading(false);
        }, 250);
    }, [loading, loadStores]);

    const forRenderStores = storesList
        ?.filter(store => store.name.toLocaleLowerCase().includes(sortedStores.toLocaleLowerCase()))
        .filter(store => {
            if (!filteredStores.length) return true;
            const filteredStore = store.productTypes.some(({ id }) => {
                return filteredStores.find(el => {
                    return Number(el) === Number(id);
                });
            });
            return filteredStore;
        });

    return (
        <Box pb={1}>
            {showTopBtn && <ScrollButton />}
            {loadFavoritesStores && <Loader type="linear" />}
            {loading && <Loader />}
            <InstrumentalSubHeader
                EndSlot={() => (
                    <Box sx={{ display: 'flex', gap: 0.75 }}>
                        <HeaderSearchButton />
                        <FilterTypes />
                    </Box>
                )}
            />

            {forRenderStores?.length ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                        rowGap: 2,
                        opacity: loading ? 0 : 1,
                        transition: 'opacity 750ms cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    {forRenderStores?.map(store => {
                        return (
                            <StoreCard
                                key={store.id}
                                imgUrl={store.imgUrl}
                                logo={store?.logo?.path}
                                name={store.name}
                                description={store.description}
                                storeId={store.id}
                                locked={store.private}
                                setStoreToApprove={setStoreToApprove}
                                storeCode={store.code}
                                isFavorite={!!favoritesStores?.find(el => el.code === store?.code)}
                                supportedLanguages={store.supportedLanguages?.map(el => el.code)}
                            />
                        );
                    })}
                </Box>
            ) : !forRenderStores?.length && !loadStores && !loading ? (
                <EmptyPage isShown />
            ) : (
                <Loader position="fixed" />
            )}
        </Box>
    );
};

export default Stores;
