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
