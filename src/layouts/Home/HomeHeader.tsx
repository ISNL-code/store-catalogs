import { Box } from '@mui/material';
import HeaderNavButton from 'components/atoms/Buttons/HeaderNavButton';
import LanguageButton from 'components/molecules/ToolsButtons/LanguageButton';
import { useDevice } from 'hooks/useDevice';
import { useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import HeaderLogo from 'components/atoms/Logo/HeaderLogo';
import { Colors } from 'colors';
import { STORE_CONFIG } from 'store_constants/stores_config';
import ProfileButton from 'components/molecules/ToolsButtons/ProfileButton';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import GridViewIcon from '@mui/icons-material/GridView';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { HOME_ROUTE, STORE_ROUTE } from 'constants/routes';

interface HeaderInterface {
    headerHeight;
    appXPadding;
    string;
    lang;
    setLang;
    handleOpenDialog;
    logo;
    storeHeaderName;
    store;
    auth;
    user;
}

const HomeHeader = ({
    headerHeight,
    appXPadding,
    string,
    lang,
    setLang,
    logo,
    storeHeaderName,
    handleOpenDialog,
    store,
    auth,
    user,
}: HeaderInterface) => {
    const { OPTIONS, STORE_CODE } = STORE_CONFIG;
    const { CUSTOM_LOGO, INFORMATION_PAGE_ACTIVE } = OPTIONS;
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
                    <HeaderNavButton
                        title={string?.home}
                        path={HOME_ROUTE?.root(STORE_CODE)}
                        icon={() => <HomeIcon />}
                        isShown={!sx}
                    />

                    <HeaderNavButton
                        title={string?.catalog}
                        path={STORE_ROUTE?.root(STORE_CODE)}
                        icon={() => <GridViewIcon />}
                        isShown={!sx}
                        isActive={location.pathname.includes('details')}
                    />

                    {INFORMATION_PAGE_ACTIVE && (
                        <HeaderNavButton
                            title={string?.info}
                            path={HOME_ROUTE?.info(STORE_CODE)}
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
                            action={() => handleOpenDialog(DialogWindowType?.LOGIN)}
                        />
                    )}
                    {!sx && auth && (
                        <ProfileButton
                            path={HOME_ROUTE?.root(STORE_CODE)}
                            string={string}
                            headerHeight={headerHeight}
                            user={user}
                            handleOpenDialog={handleOpenDialog}
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
