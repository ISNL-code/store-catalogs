import { Box } from '@mui/material';
import HeaderNavButton from 'components/atoms/Buttons/HeaderNavButton';
import LanguageButton from 'components/molecules/ToolsButtons/LanguageButton';
import GridViewIcon from '@mui/icons-material/GridView';
import HomeHeaderLogo from 'components/atoms/Logo/StoresHeaderLogo';

interface HeaderInterface {
    headerHeight;
    appXPadding;
    string;
    lang;
    setLang;
    setOpenModalType;
}

const HomeHeader = ({ headerHeight, appXPadding, string, lang, setLang, setOpenModalType }: HeaderInterface) => {
    return (
        <Box
            px={appXPadding}
            sx={{
                height: headerHeight,
                borderBottom: '1px solid #ccc',
                position: 'fixed',
                width: '100%',
                left: 0,
                top: 0,
                zIndex: 4000,
                backgroundColor: '#fff',
                overflow: 'hidden',
            }}
        >
            <Box sx={{ height: headerHeight, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <HomeHeaderLogo />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HeaderNavButton title={string?.home} path={`/`} icon={() => <GridViewIcon />} />

                    <LanguageButton setLang={setLang} string={string} lang={lang} setOpenModalType={setOpenModalType} />
                </Box>
            </Box>
        </Box>
    );
};

export default HomeHeader;
