import { Box } from '@mui/material';
import HeaderNavButton from 'components/atoms/Buttons/HeaderNavButton';
import LanguageButton from 'components/molecules/ToolsButtons/LanguageButton';
import { useDevice } from 'hooks/useDevice';
import { useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HeaderLogo from 'components/atoms/Logo/HeaderLogo';
import { Colors } from 'colors';
import { STORE_CONFIG } from 'store_constants/stores_config';
import ProfileButton from 'components/molecules/ToolsButtons/ProfileButton';
import GridViewIcon from '@mui/icons-material/GridView';
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
    cart;
    favorites;
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
    cart,
    favorites,
}: HeaderInterface) => {
    const { OPTIONS, STORE_CODE } = STORE_CONFIG;
    const { CUSTOM_LOGO, PLAN_OPTIONS } = OPTIONS;
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
                    {PLAN_OPTIONS?.favorites && (
                        <HeaderNavButton
                            path={STORE_ROUTE?.favorites(STORE_CODE)}
                            title={string?.favorites}
                            icon={() => <FavoriteIcon />}
                            isShown={!sx}
                            badgeCount={favorites?.favoriteItems?.length}
                        />
                    )}
                    {PLAN_OPTIONS?.cart && (
                        <HeaderNavButton
                            path={STORE_ROUTE?.cart(STORE_CODE)}
                            title={string?.cart}
                            icon={() => <ShoppingCartIcon />}
                            isShown={!sx}
                            badgeCount={cart?.cartItems?.length}
                        />
                    )}

                    {!sx && (
                        <ProfileButton
                            auth={auth}
                            string={string}
                            headerHeight={headerHeight}
                            user={user}
                            handleOpenDialog={handleOpenDialog}
                            childPath={['orders', 'profile', 'info', 'contacts']}
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
