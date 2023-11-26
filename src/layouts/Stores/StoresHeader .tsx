import { Box } from '@mui/material';
import HeaderNavButton from 'components/atoms/Buttons/HeaderNavButton';
import LanguageButton from 'components/molecules/ToolsButtons/LanguageButton';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { useDevice } from 'hooks/useDevice';
import LogoutIcon from '@mui/icons-material/Logout';
import MainHeaderLogo from 'components/atoms/Logo/MainHeaderLogo';
import StoreIcon from '@mui/icons-material/Store';
import ProfileButton from 'components/molecules/ToolsButtons/ProfileButton';

const Header = ({
    headerHeight,
    appXPadding,
    string,
    lang,
    setLang,
    setSortedStores,

    auth,
    setOpenModalType,
    openModalType,
    favoritesCount,
}) => {
    const { sx } = useDevice();

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
                    <MainHeaderLogo headerHeight={headerHeight} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HeaderNavButton title={string?.stores} path={`/`} icon={() => <StoreIcon />} isShown={!sx} />

                    <HeaderNavButton
                        title={string?.my_stores}
                        path="/my-stores"
                        icon={() => <AddBusinessIcon />}
                        isShown={!sx}
                        clearSort={() => setSortedStores('')}
                        badgeCount={favoritesCount}
                    />
                    {!auth && (
                        <HeaderNavButton
                            title={string?.login}
                            icon={() => <PermIdentityIcon />}
                            isShown={!sx}
                            clearSort={() => {}}
                            action={() => setOpenModalType('login')}
                            isActive={['login', 'register', 'forgot-password'].includes(openModalType)}
                        />
                    )}
                    {auth && (
                        <HeaderNavButton
                            title={string?.logout}
                            isShown={!sx}
                            icon={() => <LogoutIcon />}
                            clearSort={() => {}}
                            action={() => setOpenModalType('logout')}
                            isActive={['logout'].includes(openModalType)}
                        />
                    )}
                    {!sx && <ProfileButton string={string} headerHeight={headerHeight} />}
                    <LanguageButton setLang={setLang} string={string} lang={lang} />
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
