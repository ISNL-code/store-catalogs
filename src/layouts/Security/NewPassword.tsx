import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useDevice } from 'hooks/useDevice';
import { useEffect } from 'react';
import HomeHeader from './SecurityHeader';
import { STORE_CONFIG } from 'store_constants/stores_config';
import DialogApp from 'layouts/DialogApp';
import { ROUTES } from 'router/routes';
import { DialogWindowType, useFormsApp } from 'layouts/hooks/useFormsApp';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from 'components/atoms/Loader/Loader';
import { useUserApi } from 'api/useUserApi';
import { StoreInterface } from 'types/app_models';
import { LanguageDataInterface } from 'hooks/useGetLanguage';

interface Props {
    lang: string;
    setLang: (newLang: string) => void;
    setAuth: (newAuth: boolean) => void;
    store: StoreInterface | null;
    currentLanguage: LanguageDataInterface;
}

export default function NewPassword({ lang, setLang, setAuth, currentLanguage, store }: Props) {
    const navigate = useNavigate();
    const { storeCode, tokenId } = useParams();
    const { STORE_CODE } = STORE_CONFIG;
    const { sx } = useDevice();
    const HEADER_HEIGHT = 50;
    const HEADER_PADDINGS = sx ? 2 : 4;

    const { activeDialogWindow, handleOpenDialog, handleSetDialogState } = useFormsApp();
    const {
        data: verifyTokenResult,
        isFetching,
        status,
    } = useUserApi().useVerifyResetPasswordToken({
        storeCode,
        resetToken: tokenId,
    });

    useEffect(() => {
        if (storeCode || !tokenId) {
            if (STORE_CODE !== storeCode) {
                navigate('/');
            }
        }
    }, [storeCode, STORE_CODE, store, tokenId]); // eslint-disable-line

    useEffect(() => {
        if (!verifyTokenResult) return handleOpenDialog(DialogWindowType?.WENT_WRONG);

        if (status === 'success') {
            return handleOpenDialog(DialogWindowType?.NEW_PASSWORD);
        }
    }, [verifyTokenResult]); // eslint-disable-line

    if (!store || isFetching) return <Loader title={currentLanguage?.string?.security_check} />;

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
                lang={lang}
                handleSetDialogState={handleSetDialogState}
            />
        </Box>
    );
}
