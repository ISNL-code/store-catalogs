import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useGetLanguage } from 'hooks/useGetLanguage';
import { useDevice } from 'hooks/useDevice';
import { useEffect, useState } from 'react';
import HomeHeader from './SecurityHeader';
import { StoreInterface } from 'types';
import { useStoresApi } from 'api/useStoresApi';
import { STORES_DATA } from 'dataBase/STORES';
import { STORE_CONFIG } from 'store_constants/stores_config';
import DialogApp from 'layouts/DialogApp';
import { ROUTES } from 'constants/routes';
import { DialogWindowType, useFormsApp } from 'layouts/hooks/useFormsApp';
import { useNavigate, useParams } from 'react-router-dom';

export default function NewPassword({ lang, setLang, auth, setAuth }) {
    const navigate = useNavigate();
    const { storeCode, resetToken } = useParams();
    const { STORE_CODE, STORE_NAME } = STORE_CONFIG;
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
        if (storeCode || !resetToken) {
            if (STORE_CODE !== storeCode) {
                navigate('/');
            }
        }
    }, [storeCode, STORE_CODE, store, resetToken]); // eslint-disable-line

    useEffect(() => {
        handleOpenDialog(DialogWindowType?.NEW_PASSWORD);
    }, []); // eslint-disable-line

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
            <Box
                sx={{
                    position: 'fixed',
                    top: HEADER_HEIGHT,
                    left: 0,
                    minWidth: '100vw',
                    minHeight: '100vh',
                    backgroundImage: sx
                        ? `url(${require('assets/img/login_img_mob.webp')})`
                        : `url(${require('assets/img/login_img.webp')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></Box>

            <DialogApp
                location={ROUTES?.NEW_PASSWORD}
                string={currentLanguage?.string}
                activeDialogWindow={activeDialogWindow}
                handleOpenDialog={handleOpenDialog}
                setAuth={setAuth}
            />
        </Box>
    );
}
