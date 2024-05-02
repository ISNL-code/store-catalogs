import { Box } from '@mui/material';
import HeaderNavButton from 'components/atoms/Buttons/HeaderNavButton';
import LanguageButton from 'components/molecules/ToolsButtons/LanguageButton';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useDevice } from 'hooks/useDevice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GridViewIcon from '@mui/icons-material/GridView';
import ProfileButton from 'components/molecules/ToolsButtons/ProfileButton';

import HomeIcon from '@mui/icons-material/Home';
import { StoreInterface, useAddToCartDataInterface, useAddToFavoriteDataInterface } from 'types';
import HeaderNavIconButton from 'components/atoms/Buttons/HeaderNavIconButton';
import CatalogHeaderLogo from 'components/atoms/Logo/CatalogHeaderLogo';

interface HeaderInterface {
    headerHeight;
    appXPadding;
    string;
    lang;
    setLang;
    auth;
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
            pr={appXPadding}
            pl={1}
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
                    <CatalogHeaderLogo />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HeaderNavButton
                        title={string?.home}
                        path={`/`}
                        icon={props => <HomeIcon {...props} />}
                        isShown={!sx}
                    />
                    <HeaderNavButton
                        title={string?.catalog}
                        path={`/catalog/${storeCode}/${storeName?.replaceAll(' ', '-')}`}
                        icon={props => <GridViewIcon {...props} />}
                        isShown={!sx}
                        isActive={location.pathname.includes('details')}
                    />

                    {store?.additionalStoreSettings?.favorites && (
                        <HeaderNavIconButton
                            path={`/catalog/${storeCode}/${storeName?.replaceAll(' ', '-')}/favorites`}
                            title={string?.favorites}
                            icon={() => <FavoriteIcon />}
                            isShown={!sx}
                            action={() => {
                                navigate(`/catalog/${storeCode}/${storeName?.replaceAll(' ', '-')}/favorites`);
                            }}
                            badgeCount={favorites?.favoriteItems?.length}
                            protectedPath={!auth}
                        />
                    )}
                    {store?.additionalStoreSettings?.cart && (
                        <HeaderNavIconButton
                            path={`/catalog/${storeCode}/${storeName?.replaceAll(' ', '-')}/cart`}
                            title={string?.cart}
                            icon={() => <ShoppingCartIcon />}
                            isShown={!sx}
                            badgeCount={cart?.cartItems?.length}
                            action={() => {
                                if (auth) {
                                    navigate(`/catalog/${storeCode}/${storeName?.replaceAll(' ', '-')}/cart`);
                                } else setOpenModalType('login');
                            }}
                            protectedPath={!auth}
                        />
                    )}

                    {!auth && (
                        <HeaderNavIconButton
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
                        />
                    )}
                    <LanguageButton
                        setLang={setLang}
                        string={string}
                        lang={lang}
                        setOpenModalType={setOpenModalType}
                        storeLanguages={store?.supportedLanguages?.map(el => {
                            return { code: el?.code };
                        })}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
