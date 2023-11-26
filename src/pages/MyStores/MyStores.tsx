import { Box, Typography } from '@mui/material';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import { useStoresApi } from 'api/useStoresApi';
import ScrollButton from 'components/atoms/Buttons/ScrollButton';
import StoreCard from 'components/organisms/Cards/StoreCard';
import { useEffect, useState } from 'react';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import { useIsMount } from 'hooks/useIsMount';
import BackButton from 'components/atoms/Buttons/BackButton';
import { StoresContextInterface } from 'types';
import HeaderSearchButton from 'components/molecules/ToolsButtons/HeaderSearchButton';
import FilterTypes from 'components/organisms/Filters/FilterTypes';

const MyStores = () => {
    const {
        auth,
        setOpenModalType,
        sortedStores,
        filteredStores,
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

    const forRenderStores = favoritesStores
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

            {forRenderStores?.length ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                        rowGap: 2,
                        opacity: loading ? 0 : 1,
                        transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    {forRenderStores?.map(store => {
                        return (
                            <StoreCard
                                key={store?.id}
                                imgUrl={store?.imgUrl}
                                logo={store?.logo?.path}
                                name={store?.name}
                                description={store?.description}
                                storeId={store?.id}
                                locked={store?.private}
                                setStoreToApprove={setStoreToApprove}
                                storeCode={store?.code}
                                isFavorite={true}
                                supportedLanguages={store?.supportedLanguages?.map(el => el.code)}
                            />
                        );
                    })}
                </Box>
            ) : (
                <EmptyPage />
            )}
        </Box>
    );
};

export default MyStores;
