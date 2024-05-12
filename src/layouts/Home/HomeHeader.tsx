import { Box } from '@mui/material';
import HeaderNavButton from 'components/atoms/Buttons/HeaderNavButton';
import LanguageButton from 'components/molecules/ToolsButtons/LanguageButton';
import { useDevice } from 'hooks/useDevice';
import { useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import HeaderLogo from 'components/atoms/Logo/HeaderLogo';
import { Colors } from 'colors';
import { STORE_CONFIG } from 'constants/stores_config';
import ProfileButton from 'components/molecules/ToolsButtons/ProfileButton';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import GridViewIcon from '@mui/icons-material/GridView';

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
    auth;
    user;
    openModalType;
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
    auth,
    user,
    openModalType,
}: HeaderInterface) => {
    const { OPTIONS } = STORE_CONFIG;
    const { CUSTOM_LOGO, STORE_TYPE, INFORMATION_PAGE_ACTIVE } = OPTIONS;
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
                        title={string?.catalog}
                        path={`/catalog/${storeCode}/${storeHeaderName?.replaceAll(' ', '-').toLowerCase()}`}
                        icon={() => <GridViewIcon />}
                        isShown={!sx}
                        isActive={location.pathname.includes('details')}
                    />

                    {INFORMATION_PAGE_ACTIVE && (
                        <HeaderNavButton
                            title={string?.info}
                            path={`/info`}
                            icon={() => <InfoIcon />}
                            isShown={!sx}
                            action={() => {}}
                        />
                    )}
                    {!auth && (
                        <HeaderNavButton
                            title={string?.login}
                            icon={() => <PermIdentityIcon />}
                            isShown={!sx}
                            action={() => setOpenModalType('login')}
                            isActive={['login', 'register', 'forgot-password'].includes(openModalType)}
                        />
                    )}
                    {!sx && auth && (
                        <ProfileButton
                            path={`/`}
                            string={string}
                            headerHeight={headerHeight}
                            user={user}
                            setOpenModalType={setOpenModalType}
                            childPath={['orders', 'profile']}
                        />
                    )}
                    <LanguageButton
                        setLang={setLang}
                        string={string}
                        lang={lang}
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
