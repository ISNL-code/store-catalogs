import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useGetLanguage } from 'hooks/useGetLanguage';
import { useDevice } from 'hooks/useDevice';
import { useEffect, useState } from 'react';
import HomeHeader from './LoginHeader';
import { StoreInterface } from 'types';
import { useStoresApi } from 'api/useStoresApi';
import { STORES_DATA } from 'dataBase/STORES';
import { STORE_CONFIG } from 'constants/stores_config';
import Login from 'pages/Login/Login';
import Register from 'pages/Login/Register';

export default function LoginLayout({ lang, setLang, auth, setAuth }) {
    const { STORE_CODE, STORE_NAME } = STORE_CONFIG;
    const { sx } = useDevice();
    const HEADER_HEIGHT = 50;
    const HEADER_PADDINGS = sx ? 2 : 4;
    const [openModalType, setOpenModalType] = useState<string | null>(null);
    const { currentLanguage } = useGetLanguage({ lang, storeName: STORE_NAME });

    const [store, setStore] = useState<StoreInterface | null>(null);

    const { data: storeDataRes, isFetching: loadStore } = useStoresApi().useGetStoreByCode({
        code: STORE_CODE,
    });

    useEffect(() => {
        console.log(openModalType);
        if (!openModalType) setOpenModalType('login');
    }, [openModalType]);

    useEffect(() => {
        if (!storeDataRes || loadStore) return;
        setStore({ ...STORES_DATA.find(el => el.code === STORE_CODE), ...storeDataRes.data });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeDataRes]);

    if (!store) return <></>;

    return (
        <Box>
            <CssBaseline />

            <HomeHeader
                headerHeight={HEADER_HEIGHT}
                appXPadding={HEADER_PADDINGS}
                string={currentLanguage?.string}
                lang={lang}
                setLang={setLang}
                setOpenModalType={setOpenModalType}
                logo={store?.logo?.path}
                storeHeaderName={store?.name}
                store={store}
            />

            {openModalType === 'login' && (
                <Login
                    setAuth={setAuth}
                    string={currentLanguage?.string}
                    close={null}
                    setOpenModalType={setOpenModalType}
                />
            )}
            {openModalType === 'register' && (
                <Register
                    setAuth={setAuth}
                    lang={lang}
                    string={currentLanguage?.string}
                    close={null}
                    setOpenModalType={setOpenModalType}
                />
            )}
        </Box>
    );
}
