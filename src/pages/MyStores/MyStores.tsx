import { Box } from '@mui/material';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ScrollButton from 'components/atoms/Buttons/ScrollButton';
import { useEffect, useState } from 'react';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import { useIsMount } from 'hooks/useIsMount';
import BackButton from 'components/atoms/Buttons/BackButton';
import { StoresContextInterface } from 'types';
import HeaderSearchButton from 'components/molecules/ToolsButtons/HeaderSearchButton';
import FilterTypes from 'components/organisms/Filters/FilterTypes';
import TransitionBox from 'components/atoms/Transitions/TransitionBox';
import StoreCards from 'components/organisms/Cards/StoreCards';

const MyStores = () => {
    const {
        auth,
        setOpenModalType,
        sortedStores,
        filteredByTypeStores,
        setScrollPosition,
        scrollPosition,
        instrumentalBarHeight,
        headerHeight,
        openModalType,
        setStoreToApprove,
        favoritesStores,
    }: StoresContextInterface = useOutletContext();
    const navigate = useNavigate();
    const mount = useIsMount();
    const [loading, setLoading] = useState(true);
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        if (!auth) setOpenModalType('register-warning');
        return function cleanup() {
            setOpenModalType(null);
        };
    }, [auth]);

    useEffect(() => {
        if (mount) return;
        if (!auth && !openModalType) navigate('/');
    }, [openModalType]);

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
        window.addEventListener('scroll', listener);

        setTimeout(() => {
            setLoading(false);
        }, 150);
    }, [loading]);

    const filteredStores = favoritesStores
        ?.filter(store => store.name.toLocaleLowerCase().includes(sortedStores.toLocaleLowerCase()))
        .filter(el =>
            filteredByTypeStores.length
                ? el.storeProductTypes.find(item => filteredByTypeStores.includes(item?.code))
                : true
        );

    if (!auth) return null;

    return (
        <Box pb={1}>
            {showTopBtn && <ScrollButton />}
            <InstrumentalSubHeader
                StartSlot={() => <BackButton nav="/" action={() => {}} />}
                EndSlot={() => (
                    <Box sx={{ display: 'flex', gap: 0.75 }}>
                        <HeaderSearchButton />
                        <FilterTypes />
                    </Box>
                )}
            />

            {filteredStores?.length ? (
                <TransitionBox dependency={loading}>
                    <StoreCards
                        data={filteredStores}
                        dataFavorite={favoritesStores}
                        setStoreToApprove={setStoreToApprove}
                    />
                </TransitionBox>
            ) : (
                <EmptyPage />
            )}
        </Box>
    );
};

export default MyStores;
