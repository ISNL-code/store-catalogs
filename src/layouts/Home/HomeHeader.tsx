import { Box } from '@mui/material';
import HeaderNavButton from 'components/atoms/Buttons/HeaderNavButton';
import LanguageButton from 'components/molecules/ToolsButtons/LanguageButton';
import HomeHeaderLogo from 'components/atoms/Logo/StoresHeaderLogo';
import StoreIcon from '@mui/icons-material/Store';
import { useDevice } from 'hooks/useDevice';
import { useLocation, useParams } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
interface HeaderInterface {
    headerHeight;
    appXPadding;
    string;
    lang;
    setLang;
    setOpenModalType;
}

const HomeHeader = ({ headerHeight, appXPadding, string, lang, setLang, setOpenModalType }: HeaderInterface) => {
    const { storeCode, storeName } = useParams();
    const location = useLocation();
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
                    <HeaderNavButton
                        title={string?.home}
                        path={`/`}
                        icon={props => <StoreIcon {...props} />}
                        isShown={!sx}
                    />
                    <HeaderNavButton
                        title={string?.catalog}
                        path={`/catalog/${storeCode}/${storeName}`}
                        icon={props => <GridViewIcon {...props} />}
                        isShown={!sx}
                        isActive={location.pathname.includes('details')}
                    />
                    <LanguageButton setLang={setLang} string={string} lang={lang} setOpenModalType={setOpenModalType} />
                </Box>
            </Box>
        </Box>
    );
};

export default HomeHeader;
