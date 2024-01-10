import { Box } from '@mui/material';
import HeaderNavButton from 'components/atoms/Buttons/HeaderNavButton';
import HeaderLogo from 'components/atoms/Logo/HeaderLogo';
import LanguageButton from 'components/molecules/ToolsButtons/LanguageButton';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useDevice } from 'hooks/useDevice';
import { useLocation, useParams } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import GridViewIcon from '@mui/icons-material/GridView';
import ProfileButton from 'components/molecules/ToolsButtons/ProfileButton';
import { StoreInterface } from 'types';

interface HeaderInterface {
    headerHeight;
    appXPadding;
    string;
    lang;
    setLang;
    auth;
    logo;
    storeHeaderName;
    setOpenModalType;
    openModalType;
    store: StoreInterface | null;
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
}: HeaderInterface) => {
    const location = useLocation();
    const { sx } = useDevice();
    const { storeCode, storeName } = useParams();

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
                    <HeaderLogo
                        title={storeHeaderName}
                        path={`/catalog/${storeCode}/${storeName}`}
                        imgUrl={logo}
                        headerHeight={headerHeight}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HeaderNavButton title={string?.stores} path={`/`} icon={() => <StoreIcon />} />

                    <HeaderNavButton
                        title={string?.catalog}
                        path={`/catalog/${storeCode}/${storeName}`}
                        icon={() => <GridViewIcon />}
                        isShown={!sx}
                        isActive={location.pathname.includes('details')}
                    />

                    {store?.additionalStoreSettings?.favorites && (
                        <HeaderNavButton
                            title={string?.favorites}
                            path={`/catalog/${storeCode}/${storeName}/favorites`}
                            icon={() => <FavoriteIcon />}
                            isShown={!sx}
                        />
                    )}
                    {store?.additionalStoreSettings?.cart && (
                        <HeaderNavButton
                            title={string?.cart}
                            path={`/catalog/${storeCode}/${storeName}/cart`}
                            icon={() => <ShoppingCartIcon />}
                            isShown={!sx}
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
                    <LanguageButton setLang={setLang} string={string} lang={lang} setOpenModalType={setOpenModalType} />
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
