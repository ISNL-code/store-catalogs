import { Box } from '@mui/material';
import MobileNavButton from 'components/atoms/Buttons/MobileNavButton';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ProfileButton from 'components/molecules/ToolsButtons/ProfileButton';
import GridViewIcon from '@mui/icons-material/GridView';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { STORE_CONFIG } from 'constants/stores_config';
import { useEffect, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import { MdDiscount } from 'react-icons/md';
import { MdOutlineDiscount } from 'react-icons/md';

const HomeMobileMenu = ({
    appXPadding,
    menuHeight,
    isShown,
    string,
    storeHeaderName,
    storeCode,
    headerHeight,
    user,
    auth,
    setOpenModalType,
    openModalType,
}) => {
    const WINDOW_WIDTH = useWindowWidth();
    const { OPTIONS } = STORE_CONFIG;
    const { INFORMATION_PAGE_ACTIVE } = OPTIONS;

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
                    <MobileNavButton path={`/`} title={string?.home} icon={p => <HomeIcon {...p} />} />

                    <MobileNavButton
                        path={`/catalog/${storeCode}/${storeHeaderName.replaceAll(' ', '-').toLowerCase()}`}
                        childPath={['/details', '/contacts', 'model']}
                        title={string?.catalog}
                        icon={p => <GridViewIcon {...p} />}
                    />

                    <MobileNavButton
                        path={`/catalog/${storeCode}/${storeHeaderName.replaceAll(' ', '-').toLowerCase()}`}
                        title={string?.wholesale_catalog}
                        icon={p => <MdDiscount {...p} color={p?.sx?.color} fontSize={24} />}
                        action={() => {
                            localStorage.setItem('catalog_mode', JSON.stringify(1));
                        }}
                    />

                    <MobileNavButton
                        path={`/catalog/${storeCode}/${storeHeaderName.replaceAll(' ', '-').toLowerCase()}`}
                        title={string?.retail_catalog}
                        icon={p => <MdOutlineDiscount {...p} color={p?.sx?.color} fontSize={24} />}
                        action={() => {
                            localStorage.setItem('catalog_mode', JSON.stringify(3));
                        }}
                    />

                    {INFORMATION_PAGE_ACTIVE && (
                        <MobileNavButton
                            path={`/info`}
                            title={string?.info}
                            icon={p => <InfoIcon {...p} />}
                            action={() => {}}
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
                            path={`/`}
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
