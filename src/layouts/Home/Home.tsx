import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useGetLanguage } from 'hooks/useGetLanguage';
import { useDevice } from 'hooks/useDevice';
import { useState } from 'react';
import HomeHeader from './HomeHeader';
import HomeMobileMenu from './HomeMobileMenu';

export default function Home({ lang, setLang }) {
    const { sx, l } = useDevice();
    const headerHeight = 50;
    const footerHeight = sx ? 70 : 0;
    const instrumentalBarHeight = 36;
    const appXPadding = l ? 2 : 4;
    const [openModalType, setOpenModalType] = useState<string | null>(null);
    const { currentLanguage } = useGetLanguage({ lang: lang?.code });
    const [scrollPosition, setScrollPosition] = useState(0);
    const [supportedLanguage, setSupportedLanguage] = useState<any>();

    return (
        <Box>
            <CssBaseline />

            <HomeHeader
                headerHeight={headerHeight}
                appXPadding={appXPadding}
                string={currentLanguage?.string}
                lang={supportedLanguage}
                setLang={setLang}
                setOpenModalType={setOpenModalType}
            />

            <Box
                px={appXPadding}
                pt={1}
                sx={{ mt: `${headerHeight + instrumentalBarHeight}px`, mb: `${footerHeight}px` }}
            >
                <Outlet
                    context={{
                        //main data
                        lang: lang?.code,
                        supportedLanguage: supportedLanguage?.code,
                        string: currentLanguage?.string,
                        scrollPosition: scrollPosition,
                        setScrollPosition: setScrollPosition,
                        setOpenModalType: setOpenModalType,
                        openModalType: openModalType,

                        //css data
                        instrumentalBarHeight: instrumentalBarHeight,
                        headerHeight: headerHeight,
                        footerHeight: footerHeight,
                        appXPadding: appXPadding,
                    }}
                />
            </Box>
            <HomeMobileMenu appXPadding={appXPadding} isShown={!!sx} />
        </Box>
    );
}
