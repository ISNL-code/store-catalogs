import { Box } from '@mui/material';
import HeaderNavButton from 'components/atoms/Buttons/HeaderNavButton';
import HeaderLogo from 'components/atoms/Logo/HeaderLogo';
import LanguageButton from 'components/molecules/ToolsButtons/LanguageButton';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useDevice } from 'hooks/useDevice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GridViewIcon from '@mui/icons-material/GridView';
import ProfileButton from 'components/molecules/ToolsButtons/ProfileButton';
import { StoreInterface, useAddToCartDataInterface, useAddToFavoriteDataInterface } from 'types';
import { Colors } from 'colors';

interface HeaderInterface {
    headerHeight;
    appXPadding;
    string;
    lang: string | null;
    setLang;
    auth;
    logo;
    storeHeaderName;
    setOpenModalType;
    openModalType;
    store: StoreInterface | null;
    cart: useAddToCartDataInterface;
    favorites: useAddToFavoriteDataInterface;
    user;
}

const Header = ({
    headerHeight,
    appXPadding,
    string,
    lang,
    setLang,
    auth,
    logo,
    storeHeaderName,
    setOpenModalType,
    openModalType,
    store,
    cart,
    favorites,
    user,
}: HeaderInterface) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { sx } = useDevice();
    const { storeCode, storeName } = useParams();

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
                    <HeaderLogo title={storeHeaderName} imgUrl={logo} headerHeight={headerHeight} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HeaderNavButton
                        title={string?.catalog}
                        path={`/catalog/${storeCode}/${storeName}`}
                        icon={() => <GridViewIcon />}
                        isShown={!sx}
                        isActive={location.pathname.includes('details')}
                    />

                    {store?.additionalStoreSettings?.favorites && (
                        <HeaderNavButton
                            path={`/catalog/${storeCode}/${storeName}/favorites`}
                            title={string?.favorites}
                            icon={() => <FavoriteIcon />}
                            isShown={!sx}
                            action={() => {
                                navigate(`/catalog/${storeCode}/${storeName}/favorites`);
                            }}
                            badgeCount={favorites?.favoriteItems?.length}
                            protectedPath={!auth}
                        />
                    )}
                    {store?.additionalStoreSettings?.cart && (
                        <HeaderNavButton
                            path={`/catalog/${storeCode}/${storeName}/cart`}
                            title={string?.cart}
                            icon={() => <ShoppingCartIcon />}
                            isShown={!sx}
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
                            store={store}
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
                        setOpenModalType={setOpenModalType}
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
