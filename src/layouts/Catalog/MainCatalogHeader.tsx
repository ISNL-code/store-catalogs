import { Box } from '@mui/material';
import HeaderNavButton from 'components/atoms/Buttons/HeaderNavButton';
import HeaderLogo from 'components/atoms/Logo/HeaderLogo';
import LanguageButton from 'components/molecules/ToolsButtons/LanguageButton';
import { useDevice } from 'hooks/useDevice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GridViewIcon from '@mui/icons-material/GridView';
import ProfileMenu from 'components/molecules/ToolsButtons/ProfileMenu';
import { StoreInterface, useAddToCartDataInterface, useAddToFavoriteDataInterface } from 'types/app_models';
import { Color, Colors } from 'constants/colors';
import { STORE_CONFIG } from 'store_constants/stores_config';
import HomeIcon from '@mui/icons-material/Home';
import { HOME_ROUTE, STORE_ROUTE } from 'router/routes';
interface HeaderInterface {
    headerHeight;
    appXPadding;
    string;
    lang: string | null;
    setLang;
    auth;
    logo;
    store: StoreInterface | null;
    cart: useAddToCartDataInterface;
    favorites: useAddToFavoriteDataInterface;
    user;
    handleOpenDialog: (val) => void;
}

const Header = ({
    headerHeight,
    appXPadding,
    string,
    lang,
    setLang,
    auth,
    user,
    handleOpenDialog,
    logo,
    store,
    cart,
    favorites,
}: HeaderInterface) => {
    const { OPTIONS, STORE_CODE, STORE_NAME } = STORE_CONFIG;
    const { CUSTOM_LOGO, PLAN_OPTIONS, HOME_PAGE_ACTIVE } = OPTIONS;
    const { sx } = useDevice();

    return (
        <Box
            px={appXPadding}
            sx={{
                height: `${headerHeight}px`,
                borderBottom: '1px solid',
                borderColor: Colors?.GRAY_300,
                position: 'fixed',
                width: '100%',
                left: 0,
                top: 0,
                zIndex: 3000,
                backgroundColor: Color?.PRIMARY_LIGHT,
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    height: `${headerHeight}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <HeaderLogo title={STORE_NAME} imgUrl={logo} custom={CUSTOM_LOGO} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {HOME_PAGE_ACTIVE && (
                        <HeaderNavButton
                            title={string?.home}
                            path={HOME_ROUTE?.root(STORE_CODE)}
                            icon={() => <HomeIcon />}
                            isShown={!sx}
                        />
                    )}
                    <HeaderNavButton
                        title={string?.catalog}
                        path={STORE_ROUTE?.root(STORE_CODE)}
                        icon={() => <GridViewIcon />}
                        isShown={!sx}
                        childPath={['product']}
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
                        <ProfileMenu
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

export default Header;
