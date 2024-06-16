import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useDevice } from 'hooks/useDevice';
import { useEffect } from 'react';
import HomeHeader from './SecurityHeader';
import { STORE_CONFIG } from 'store_constants/stores_config';
import DialogApp from 'layouts/DialogApp';
import { LOGIN_ROUTE, ROUTES } from 'router/routes';
import { DialogWindowType, useFormsApp } from 'layouts/hooks/useFormsApp';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from 'components/atoms/Loader/Loader';
import { StoreInterface } from 'types/app_models';
import { LanguageDataInterface } from 'hooks/useGetLanguage';

interface Props {
    lang: string;
    setAuth: (newAuth: boolean) => void;
    setLang: (newLang: string) => void;
    store: StoreInterface | null;
    currentLanguage: LanguageDataInterface;
    setApiToken: (token: string | null) => void;
}

export default function SecurityLayout({ lang, setLang, store, setAuth, currentLanguage, setApiToken }: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const { formType, storeCode } = useParams();
    const { STORE_CODE } = STORE_CONFIG;
    const { sx } = useDevice();
    const HEADER_HEIGHT = 50;
    const HEADER_PADDINGS = sx ? 2 : 4;

    const { activeDialogWindow, handleOpenDialog, handleSetDialogState } = useFormsApp();

    useEffect(() => {
        if (storeCode) {
            if (STORE_CODE !== storeCode) {
                navigate(LOGIN_ROUTE?.root(STORE_CODE, formType));
            }
        }
        if (activeDialogWindow !== DialogWindowType?.LOGIN) {
            navigate(LOGIN_ROUTE?.root(STORE_CODE, 'login'));
        }
    }, []); // eslint-disable-line

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
        if (formType === DialogWindowType?.LOGIN && activeDialogWindow !== DialogWindowType?.LOGIN) {
            return handleOpenDialog(DialogWindowType?.LOGIN);
        }
        if (formType === DialogWindowType?.REGISTER && activeDialogWindow !== DialogWindowType?.REGISTER) {
            return handleOpenDialog(DialogWindowType?.REGISTER);
        }
        if (formType === DialogWindowType?.RESET_PASSWORD && activeDialogWindow !== DialogWindowType?.RESET_PASSWORD) {
            return handleOpenDialog(DialogWindowType?.RESET_PASSWORD);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formType]);

    if (!store) return <Loader />;

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
                lang={lang}
                setApiToken={setApiToken}
                handleSetDialogState={handleSetDialogState}
            />
        </Box>
    );
}
