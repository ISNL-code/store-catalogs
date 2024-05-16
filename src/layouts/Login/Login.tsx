import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useGetLanguage } from 'hooks/useGetLanguage';
import { useDevice } from 'hooks/useDevice';
import { useEffect, useState } from 'react';
import HomeHeader from './LoginHeader';
import { StoreInterface } from 'types';
import { useStoresApi } from 'api/useStoresApi';
import { STORES_DATA } from 'dataBase/STORES';
import { STORE_CONFIG } from 'store_constants/stores_config';
import DialogApp from 'layouts/DialogApp';
import { HOME_ROUTE, LOGIN_ROUTE, STORE_ROUTE } from 'constants/routes';
import { DialogWindowType, useFormsApp } from 'layouts/hooks/useFormsApp';
import { useNavigate } from 'react-router-dom';

export default function LoginLayout({ lang, setLang, auth, setAuth }) {
    const navigate = useNavigate();
    const { STORE_CODE, STORE_NAME, REQUIRED_REGISTRATION, OPTIONS } = STORE_CONFIG;
    const { sx } = useDevice();
    const HEADER_HEIGHT = 50;
    const HEADER_PADDINGS = sx ? 2 : 4;
    const { currentLanguage } = useGetLanguage({ lang, storeName: STORE_NAME });
    const [store, setStore] = useState<StoreInterface | null>(null);
    const { data: storeDataRes, isFetching: loadStore } = useStoresApi().useGetStoreByCode({
        code: STORE_CODE,
    });
    const { activeDialogWindow, handleOpenDialog } = useFormsApp();

    useEffect(() => {
        if (REQUIRED_REGISTRATION) {
            if (auth) {
                if (OPTIONS?.HOME_PAGE_ACTIVE) {
                    navigate(HOME_ROUTE?.root(STORE_CODE));
                } else {
                    navigate(STORE_ROUTE?.root(STORE_CODE));
                }
            } else {
                handleOpenDialog(DialogWindowType?.LOGIN);
            }
        } else {
            if (OPTIONS?.HOME_PAGE_ACTIVE) {
                navigate(HOME_ROUTE?.root(STORE_CODE));
            } else {
                navigate(STORE_ROUTE?.root(STORE_CODE));
            }
        }
    }, []);

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
                logo={store?.logo?.path}
                store={store}
            />

            <DialogApp
                location={LOGIN_ROUTE?.root()}
                string={currentLanguage?.string}
                activeDialogWindow={activeDialogWindow}
                handleOpenDialog={handleOpenDialog}
                setAuth={setAuth}
            />
        </Box>
    );
}
