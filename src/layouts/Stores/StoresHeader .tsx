import { Box } from '@mui/material';
import HeaderNavButton from 'components/atoms/Buttons/HeaderNavButton';
import LanguageButton from 'components/molecules/ToolsButtons/LanguageButton';
// import AddBusinessIcon from '@mui/icons-material/AddBusiness';
// import { useDevice } from 'hooks/useDevice';
import StoresHeaderLogo from 'components/atoms/Logo/StoresHeaderLogo';
import StoreIcon from '@mui/icons-material/Store';

const Header = ({ headerHeight, appXPadding, string, lang, setLang }) => {
    // const { sx } = useDevice();

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
                background: `#fff`,
                overflow: 'hidden',
            }}
        >
            <Box sx={{ height: headerHeight, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <StoresHeaderLogo />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HeaderNavButton title={string?.home} path={`/`} icon={() => <StoreIcon />} />

                    <LanguageButton setLang={setLang} string={string} lang={lang} />
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
