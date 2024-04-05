import { Box } from '@mui/material';
import HeaderNavButton from 'components/atoms/Buttons/HeaderNavButton';
import LanguageButton from 'components/molecules/ToolsButtons/LanguageButton';
import HomeHeaderLogo from 'components/atoms/Logo/StoresHeaderLogo';
import StoreIcon from '@mui/icons-material/Store';
import { useDevice } from 'hooks/useDevice';

interface HeaderInterface {
    headerHeight;
    appXPadding;
    string;
    lang;
    setLang;
    setOpenModalType;
}

const HomeHeader = ({ headerHeight, appXPadding, string, lang, setLang, setOpenModalType }: HeaderInterface) => {
    const { sx } = useDevice();
    return (
        <Box
            pr={appXPadding}
            pl={1}
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
                    {!sx && <HeaderNavButton title={string?.home} path={`/`} icon={() => <StoreIcon />} />}

                    <LanguageButton setLang={setLang} string={string} lang={lang} setOpenModalType={setOpenModalType} />
                </Box>
            </Box>
        </Box>
    );
};

export default HomeHeader;
