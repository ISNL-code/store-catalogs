import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useGetLanguage } from 'hooks/useGetLanguage';
import { useDevice } from 'hooks/useDevice';
import DialogApp from 'layouts/DialogApp';
import { ROUTES } from 'constants/routes';
import { useFormsApp } from 'layouts/hooks/useFormsApp';
import { Outlet } from 'react-router-dom';
import LandingHeader from './LandingHeader';
import { LandingContextInterface } from 'types';

const OutletContainer = ({ context }: { context: LandingContextInterface }) => {
    return <Outlet context={context} />;
};

export default function LandingLayout({ lang, setLang }) {
    const { sx } = useDevice();
    const HEADER_HEIGHT = 50;
    const HEADER_PADDINGS = sx ? 2 : 4;
    const BODY_PADDINGS = sx ? 0 : 4;
    const { currentLanguage } = useGetLanguage({ lang, storeName: 'Sales Nest Catalogs' });

    const { activeDialogWindow, handleOpenDialog } = useFormsApp();

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
                        // css
                        headerHeight: HEADER_HEIGHT,
                        appXPadding: BODY_PADDINGS,
                    }}
                />
            </Box>

            <DialogApp
                location={ROUTES?.NEW_PASSWORD}
                string={currentLanguage?.string}
                activeDialogWindow={activeDialogWindow}
                handleOpenDialog={handleOpenDialog}
            />
        </Box>
    );
}
