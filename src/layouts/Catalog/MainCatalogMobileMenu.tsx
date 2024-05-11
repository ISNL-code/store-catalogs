import { Box } from '@mui/material';
import MobileNavButton from 'components/atoms/Buttons/MobileNavButton';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useNavigate, useParams } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProfileButton from 'components/molecules/ToolsButtons/ProfileButton';
import { useEffect, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import HomeIcon from '@mui/icons-material/Home';
import { STORE_CONFIG } from 'constants/stores_config';

const MobileMenu = ({
    appXPadding,
    string,
    auth,
    setOpenModalType,
    isShown,
    withFavorites,
    withCart,
    openModalType,
    cart,
    favorites,
    headerHeight,
    user,
    menuHeight,
}) => {
    const { OPTIONS } = STORE_CONFIG;
    const { HOME_PAGE_ACTIVE } = OPTIONS;
    const WINDOW_WIDTH = useWindowWidth();
    const navigate = useNavigate();
    const { storeCode, storeName } = useParams();
    const [position, setPosition] = useState(0);

    useEffect(() => {
        setPosition(0);
    }, [WINDOW_WIDTH]);

    if (isShown)
        return (
            <Box
                px={appXPadding}
                sx={{
                    height: menuHeight,
                    position: 'fixed',
                    left: position,
                    bottom: position,
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
                    {HOME_PAGE_ACTIVE && (
                        <MobileNavButton path={`/`} title={string?.home} icon={p => <HomeIcon {...p} />} />
                    )}
                    <MobileNavButton
                        path={`/catalog/${storeCode}/${storeName}`}
                        childPath={['/details', '/contacts', 'model']}
                        title={string?.catalog}
                        icon={p => <GridViewIcon {...p} />}
                    />
                    {withFavorites && (
                        <MobileNavButton
                            path={`/catalog/${storeCode}/${storeName}/favorites`}
                            title={string?.favorites}
                            icon={p => <FavoriteIcon {...p} />}
                            badgeCount={favorites?.favoriteItems?.length}
                            action={() => {
                                navigate(`/catalog/${storeCode}/${storeName}/favorites`);
                            }}
                            protectedPath={!auth}
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
                            protectedPath={!auth}
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
                        <ProfileButton
                            path={`/catalog/${storeCode}/${storeName}/`}
                            string={string}
                            headerHeight={headerHeight}
                            menuHeight={menuHeight}
                            user={user}
                            setOpenModalType={setOpenModalType}
                            childPath={['orders', 'profile']}
                        />
                    )}
                </Box>
            </Box>
        );
    return null;
};

export default MobileMenu;
