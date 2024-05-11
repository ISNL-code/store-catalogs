import { Box } from '@mui/material';
import HeaderNavButton from 'components/atoms/Buttons/HeaderNavButton';
import LanguageButton from 'components/molecules/ToolsButtons/LanguageButton';
import { useDevice } from 'hooks/useDevice';
import { useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';
import HeaderLogo from 'components/atoms/Logo/HeaderLogo';
import { Colors } from 'colors';
import { STORE_CONFIG } from 'constants/stores_config';

interface HeaderInterface {
    headerHeight;
    appXPadding;
    string;
    lang;
    setLang;
    setOpenModalType;
    logo;
    storeHeaderName;
    storeCode;
    store;
}

const HomeHeader = ({
    headerHeight,
    appXPadding,
    string,
    lang,
    setLang,
    setOpenModalType,
    logo,
    storeHeaderName,
    storeCode,
    store,
}: HeaderInterface) => {
    const { OPTIONS } = STORE_CONFIG;
    const { CUSTOM_LOGO } = OPTIONS;
    const location = useLocation();
    const { sx } = useDevice();

    return (
        <Box
            px={appXPadding}
            sx={{
                height: headerHeight,
                borderBottom: '1px solid',
                borderColor: Colors?.GRAY_300,
                position: 'fixed',
                width: '100%',
                left: 0,
                top: 0,
                zIndex: 4000,
                backgroundColor: Colors?.WHITE,
                overflow: 'hidden',
            }}
        >
            <Box sx={{ height: headerHeight, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <HeaderLogo title={storeHeaderName} imgUrl={logo} custom={CUSTOM_LOGO} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HeaderNavButton title={string?.home} path={`/`} icon={() => <HomeIcon />} isShown={!sx} />
                    <HeaderNavButton
                        title={string?.wholesale_catalog}
                        path={`/catalog/${storeCode}/${storeHeaderName?.replaceAll(' ', '-').toLowerCase()}`}
                        icon={() => <AttachMoneyIcon />}
                        isShown={!sx}
                        isActive={location.pathname.includes('details')}
                        action={() => {
                            localStorage.setItem('catalog_mode', JSON.stringify(1));
                        }}
                    />
                    <HeaderNavButton
                        title={string?.retail_catalog}
                        path={`/catalog/${storeCode}/${storeHeaderName?.replaceAll(' ', '-').toLowerCase()}`}
                        icon={() => <StorefrontIcon />}
                        isShown={!sx}
                        isActive={location.pathname.includes('details')}
                        action={() => {
                            localStorage.setItem('catalog_mode', JSON.stringify(3));
                        }}
                    />
                    <HeaderNavButton
                        title={string?.info}
                        path={`/info`}
                        icon={() => <InfoIcon />}
                        isShown={!sx}
                        action={() => {}}
                    />
                    <LanguageButton
                        setLang={setLang}
                        string={string}
                        lang={lang}
                        setOpenModalType={setOpenModalType}
                        storeLanguages={store?.supportedLanguages?.map(el => {
                            return el?.code;
                        })}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default HomeHeader;
