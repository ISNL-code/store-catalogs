import { Box } from '@mui/material';
import MobileNavButton from 'components/atoms/Buttons/MobileNavButton';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useParams } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import ProfileButton from 'components/molecules/ToolsButtons/ProfileButton';

const menuHeight = '70px';

const MobileMenu = ({
    appXPadding,
    string,
    auth,
    isShown,
    withCart,
    withShare,
    openModalType,
    setOpenModalType,
    cart,
    favorites,
}) => {
    const navigate = useNavigate();
    const { storeCode, storeName } = useParams();

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
                    <MobileNavButton
                        path={`/catalog/${storeCode}/${storeName}`}
                        childPath={['/details', '/contacts', 'model']}
                        title={string?.catalog}
                        icon={p => <GridViewIcon {...p} />}
                    />
                    {withShare && (
                        <MobileNavButton
                            path={`/catalog/${storeCode}/${storeName}/favorites`}
                            title={string?.favorites}
                            icon={p => <FavoriteIcon {...p} />}
                            badgeCount={favorites?.favoriteItems?.length}
                            action={() => {
                                if (auth) {
                                    navigate(`/catalog/${storeCode}/${storeName}/favorites`);
                                } else setOpenModalType('login');
                            }}
                        />
                    )}
                    {withCart && (
                        <MobileNavButton
                            path={`/catalog/${storeCode}/${storeName}/cart`}
                            title={string?.cart}
                            icon={p => <ShoppingCartIcon {...p} />}
                            badgeCount={cart?.cartItems?.length}
                            action={() => {
                                if (auth) {
                                    navigate(`/catalog/${storeCode}/${storeName}/cart`);
                                } else setOpenModalType('login');
                            }}
                        />
                    )}
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
                    {/* <ProfileButton string={string} headerHeight={headerHeight} menuHeight={menuHeight} /> */}
                </Box>
            </Box>
        );
    return null;
};

export default MobileMenu;
