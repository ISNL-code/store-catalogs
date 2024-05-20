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
import { LOGIN_ROUTE, ROUTES } from 'constants/routes';
import { DialogWindowType, useFormsApp } from 'layouts/hooks/useFormsApp';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function SecurityLayout({ lang, setLang, auth, setAuth }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { formType, storeCode } = useParams();
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
        if (storeCode) {
            if (STORE_CODE !== storeCode) {
                navigate(LOGIN_ROUTE?.root(STORE_CODE, formType));
            }
        }
    }, [storeCode, STORE_CODE, store]); // eslint-disable-line

    useEffect(() => {
        if (activeDialogWindow === DialogWindowType?.LOGIN && !location?.pathname.includes('login')) {
            return navigate(`${ROUTES?.SECURITY}/${STORE_CODE}/login`);
        }
        if (activeDialogWindow === DialogWindowType?.REGISTER && !location?.pathname.includes('register')) {
            return navigate(`${ROUTES?.SECURITY}/${STORE_CODE}/register`);
        }
        if (activeDialogWindow === DialogWindowType?.RESET_PASSWORD && !location?.pathname.includes('reset-password')) {
            return navigate(`${ROUTES?.SECURITY}/${STORE_CODE}/reset-password`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeDialogWindow]);

    useEffect(() => {
        if (formType === 'login' && activeDialogWindow !== DialogWindowType?.LOGIN) {
            return handleOpenDialog(DialogWindowType?.LOGIN);
        }
        if (formType === 'register' && activeDialogWindow !== DialogWindowType?.REGISTER) {
            return handleOpenDialog(DialogWindowType?.REGISTER);
        }
        if (formType === 'reset-password' && activeDialogWindow !== DialogWindowType?.RESET_PASSWORD) {
            return handleOpenDialog(DialogWindowType?.RESET_PASSWORD);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formType]);

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
                location={ROUTES?.SECURITY}
                string={currentLanguage?.string}
                activeDialogWindow={activeDialogWindow}
                handleOpenDialog={handleOpenDialog}
                setAuth={setAuth}
            />
        </Box>
    );
}
