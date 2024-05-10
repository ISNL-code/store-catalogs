import { Box } from '@mui/material';
import HeaderNavButton from 'components/atoms/Buttons/HeaderNavButton';
import LanguageButton from 'components/molecules/ToolsButtons/LanguageButton';
import { useDevice } from 'hooks/useDevice';
import { useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import HomeHeaderLogo from 'components/atoms/Logo/HomeHeaderLogo';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';
import { StoreInterface } from 'types';
import { STORE_CODE } from 'constants/constants';
interface HeaderInterface {
    headerHeight;
    appXPadding;
    string;
    lang;
    setLang;
    setOpenModalType;
    store: StoreInterface | null;
}

const HomeHeader = ({ headerHeight, appXPadding, string, lang, setLang, setOpenModalType, store }: HeaderInterface) => {
    const location = useLocation();
    const { sx } = useDevice();
    return (
        <Box
            pr={appXPadding}
            pl={1}
            sx={{
                height: headerHeight,
                borderBottom: '1px solid #cccccc78',
                position: 'fixed',
                width: '100%',
                left: 0,
                top: 0,
                zIndex: 4000,
                backgroundColor: '#ffffffe6',
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
                        icon={props => <HomeIcon {...props} />}
                        isShown={!sx}
                    />
                    <HeaderNavButton
                        title={string?.wholesale_catalog}
                        path={`/catalog/${STORE_CODE}/${'Alberto Bini EU'.replaceAll(' ', '-')}`}
                        icon={props => <AttachMoneyIcon {...props} />}
                        isShown={!sx}
                        isActive={location.pathname.includes('details')}
                        action={() => {
                            localStorage.setItem('catalog_mode', JSON.stringify(1));
                        }}
                    />
                    <HeaderNavButton
                        title={string?.retail_catalog}
                        path={`/catalog/${STORE_CODE}/${'Alberto Bini EU'.replaceAll(' ', '-')}`}
                        icon={props => <StorefrontIcon {...props} />}
                        isShown={!sx}
                        isActive={location.pathname.includes('details')}
                        action={() => {
                            localStorage.setItem('catalog_mode', JSON.stringify(3));
                        }}
                    />
                    <HeaderNavButton
                        title={string?.info}
                        path={`/info`}
                        icon={props => <InfoIcon {...props} />}
                        isShown={!sx}
                        action={() => {}}
                    />
                    <LanguageButton setLang={setLang} string={string} lang={lang} setOpenModalType={setOpenModalType} />
                </Box>
            </Box>
        </Box>
    );
};

export default HomeHeader;
