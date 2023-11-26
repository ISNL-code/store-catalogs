import { Box } from '@mui/material';
import MobileNavButton from 'components/atoms/Buttons/MobileNavButton';
import StoreIcon from '@mui/icons-material/Store';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileButton from 'components/molecules/ToolsButtons/ProfileButton';

const menuHeight = '70px';

const MobileMenu = ({
    appXPadding,
    string,
    auth,
    isShown,
    setSortedStores,
    openModalType,
    setOpenModalType,
    favoritesCount,
    headerHeight,
}) => {
    if (isShown)
        return (
            <Box
                px={appXPadding}
                sx={{
                    height: menuHeight,
                    position: 'fixed',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    background: '#000',
                    zIndex: 4000,
                }}
            >
                <Box
                    mt={0.5}
                    sx={{
                        height: menuHeight,
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-around',
                        gap: 2,
                    }}
                >
                    <MobileNavButton path="/" title={string?.stores} icon={p => <StoreIcon {...p} />} />
                    <MobileNavButton
                        path="/my-stores"
                        title={string?.my_stores}
                        icon={p => <AddBusinessIcon {...p} />}
                        clearSort={() => setSortedStores('')}
                        badgeCount={favoritesCount}
                    />

                    {!auth && (
                        <MobileNavButton
                            title={string?.login}
                            icon={p => <PermIdentityIcon {...p} />}
                            clearSort={() => {}}
                            action={() => setOpenModalType('login')}
                            isActive={['login', 'register', 'forgot-password'].includes(openModalType)}
                        />
                    )}
                    {auth && (
                        <MobileNavButton
                            title={string?.logout}
                            icon={p => <LogoutIcon {...p} />}
                            clearSort={() => {}}
                            action={() => setOpenModalType('logout')}
                            isActive={['logout'].includes(openModalType)}
                        />
                    )}
                    <ProfileButton string={string} headerHeight={headerHeight} menuHeight={menuHeight} />
                </Box>
            </Box>
        );
    return null;
};

export default MobileMenu;
