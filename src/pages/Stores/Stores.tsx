import { Box } from '@mui/material';
// import ScrollButton from 'components/atoms/Buttons/ScrollButton';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
// import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
// import FilterTypes from 'components/organisms/Filters/FilterTypes';
import { StoresContextInterface } from 'types';
import Loader from 'components/atoms/Loader/Loader';
// import HeaderSearchButton from 'components/molecules/ToolsButtons/HeaderSearchButton';
import StoreCards from 'components/organisms/Cards/StoreCards';
import TransitionBox from 'components/atoms/Transitions/TransitionBox';

const Stores = ({ details = false }) => {
    const {
        sortedStores,
        filteredByTypeStores,
        // setScrollPosition,
        // scrollPosition,
        // instrumentalBarHeight,
        // headerHeight,
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
        // window.addEventListener('scroll', listener);
        // setTimeout(() => {
        //     window.scrollTo({
        //         top: scrollPosition - (instrumentalBarHeight + headerHeight),
        //         behavior: 'auto',
        //     });
        //     setScrollPosition(0);
        // }, 150);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (loadStores) return;
        window.addEventListener('scroll', listener);

        setTimeout(() => {
            setLoading(false);
        }, 250);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, loadStores]);

    const filteredStores = storesList
        ?.filter(store => store.name.toLocaleLowerCase().includes(sortedStores.toLocaleLowerCase()))
        .filter(el =>
            filteredByTypeStores.length
                ? el.storeProductTypes.find(item => filteredByTypeStores.includes(item?.code))
                : true
        );

    return (
        <Box pb={1}>
            {showTopBtn && <></>}
            {loadFavoritesStores && <Loader type="linear" />}
            {loading && <Loader />}
            {/* <InstrumentalSubHeader
                EndSlot={() => (
                    <Box sx={{ display: 'flex', gap: 0.75 }}>
                        <HeaderSearchButton />
                        <FilterTypes />
                    </Box>
                )}
            /> */}

            {filteredStores?.length ? (
                <TransitionBox dependency={loading}>
                    {details ? (
                        <StoreCards
                            data={filteredStores}
                            dataFavorite={favoritesStores}
                            setStoreToApprove={setStoreToApprove}
                        />
                    ) : (
                        <StoreDetailsCards
                            data={filteredStores}
                            dataFavorite={favoritesStores}
                            setStoreToApprove={setStoreToApprove}
                        />
                    )}
                </TransitionBox>
            ) : !filteredStores?.length && !loadStores && !loading ? (
                <EmptyPage isShown />
            ) : (
                <Loader position="fixed" />
            )}
        </Box>
    );
};

export default Stores;
