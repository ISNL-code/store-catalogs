import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useDevice } from 'hooks/useDevice';
import DialogApp from 'layouts/DialogApp';
import { ROUTES } from 'router/routes';
import { useFormsApp } from 'layouts/hooks/useFormsApp';
import { Outlet } from 'react-router-dom';
import LandingHeader from './LandingHeader';
import { LandingContextInterface } from 'types/outlet_context_models';
import { LanguageDataInterface } from 'hooks/useGetLanguage';

const OutletContainer = ({ context }: { context: LandingContextInterface }) => {
    return <Outlet context={context} />;
};

interface Props {
    lang: string;
    setLang: (newLang: string) => void;
    currentLanguage: LanguageDataInterface;
}

export default function LandingLayout({ lang, setLang, currentLanguage }: Props) {
    const { sx } = useDevice();
    const HEADER_HEIGHT = 50;
    const HEADER_PADDINGS = sx ? 2 : 4;
    const BODY_PADDINGS = sx ? 0 : 4;
    const INSTRUMENTAL_BAR_HEIGHT = 36;
    const INSTRUMENTAL_BAR_PADDINGS = sx ? 2 : 4;

    const { activeDialogWindow, handleOpenDialog, handleSetDialogState, dialogState } = useFormsApp();

    return (
        <Box>
            <CssBaseline />
            <LandingHeader
                headerHeight={HEADER_HEIGHT}
                appXPadding={HEADER_PADDINGS}
                string={currentLanguage?.string}
                lang={lang}
                setLang={setLang}
            />
            <Box className="HomeBody" mt={`${HEADER_HEIGHT}px`} sx={{ flexGrow: 1 }}>
                <OutletContainer
                    context={{
                        //main
                        handleOpenDialog,
                        handleSetDialogState,

                        // css
                        headerHeight: HEADER_HEIGHT,
                        appXPadding: BODY_PADDINGS,
                        string: currentLanguage?.string,
                        instrumentalBarHeight: INSTRUMENTAL_BAR_HEIGHT,
                        instrumentalBarPadding: INSTRUMENTAL_BAR_PADDINGS,
                    }}
                />
            </Box>

            <DialogApp
                location={ROUTES?.NEW_PASSWORD}
                string={currentLanguage?.string}
                activeDialogWindow={activeDialogWindow}
                handleOpenDialog={handleOpenDialog}
                dialogState={dialogState}
                lang={lang}
            />
        </Box>
    );
}
