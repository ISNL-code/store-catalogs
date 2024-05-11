import { Box } from '@mui/material';
import MobileNavButton from 'components/atoms/Buttons/MobileNavButton';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';
import ProfileButton from 'components/molecules/ToolsButtons/ProfileButton';

import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const HomeMobileMenu = ({
    appXPadding,
    menuHeight,
    isShown,
    string,
    storeHeaderName,
    storeCode,
    headerHeight,
    store,
    user,
    auth,
    setOpenModalType,
    openModalType,
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
                    <MobileNavButton path={`/`} title={string?.home} icon={p => <HomeIcon {...p} />} />

                    <MobileNavButton
                        path={`/catalog/${storeCode}/${storeHeaderName.replaceAll(' ', '-').toLowerCase()}`}
                        title={string?.wholesale_catalog}
                        icon={p => <AttachMoneyIcon {...p} />}
                        action={() => {
                            localStorage.setItem('catalog_mode', JSON.stringify(1));
                        }}
                    />

                    <MobileNavButton
                        path={`/catalog/${storeCode}/${storeHeaderName.replaceAll(' ', '-').toLowerCase()}`}
                        title={string?.retail_catalog}
                        icon={p => <StorefrontIcon {...p} />}
                        action={() => {
                            localStorage.setItem('catalog_mode', JSON.stringify(3));
                        }}
                    />

                    <MobileNavButton
                        path={`/info`}
                        title={string?.info}
                        icon={p => <InfoIcon {...p} />}
                        action={() => {}}
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
                        <ProfileButton
                            store={store}
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

export default HomeMobileMenu;
