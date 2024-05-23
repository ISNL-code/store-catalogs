import { Box } from '@mui/material';
import MobileNavButton from 'components/atoms/Buttons/MobileNavButton';
import HomeIcon from '@mui/icons-material/Home';
import ProfileMenu from 'components/molecules/ToolsButtons/ProfileMenu';
import GridViewIcon from '@mui/icons-material/GridView';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { useEffect, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import { HOME_ROUTE, STORE_ROUTE } from 'constants/routes';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const HomeMobileMenu = ({
    appXPadding,
    menuHeight,
    isShown,
    string,
    handleOpenDialog,
    headerHeight,
    user,
    auth,
    withFavorites,
    withCart,
    cart,
    favorites,
}) => {
    const WINDOW_WIDTH = useWindowWidth();
    const { STORE_CODE } = STORE_CONFIG;

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
                    left: 0,
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
                    <MobileNavButton
                        path={HOME_ROUTE?.root(STORE_CODE)}
                        title={string?.home}
                        icon={p => <HomeIcon {...p} />}
                    />

                    <MobileNavButton
                        path={STORE_ROUTE?.root(STORE_CODE)}
                        title={string?.catalog}
                        icon={p => <GridViewIcon {...p} />}
                        childPath={['product']}
                    />
                    {withFavorites && (
                        <MobileNavButton
                            path={STORE_ROUTE?.favorites(STORE_CODE)}
                            title={string?.favorites}
                            icon={p => <FavoriteIcon {...p} />}
                            badgeCount={favorites?.favoriteItems?.length}
                        />
                    )}
                    {withCart && (
                        <MobileNavButton
                            path={STORE_ROUTE?.cart(STORE_CODE)}
                            title={string?.cart}
                            icon={p => <ShoppingCartIcon {...p} />}
                            badgeCount={cart?.cartItems?.length}
                        />
                    )}

                    <ProfileMenu
                        auth={auth}
                        string={string}
                        headerHeight={headerHeight}
                        footerMenuHeight={menuHeight}
                        user={user}
                        handleOpenDialog={handleOpenDialog}
                        childPath={['orders', 'profile', 'info', 'contacts']}
                    />
                </Box>
            </Box>
        );
    return null;
};

export default HomeMobileMenu;
