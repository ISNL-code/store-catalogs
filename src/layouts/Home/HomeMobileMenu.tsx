import { Box } from '@mui/material';
import MobileNavButton from 'components/atoms/Buttons/MobileNavButton';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ProfileButton from 'components/molecules/ToolsButtons/ProfileButton';
import GridViewIcon from '@mui/icons-material/GridView';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { useEffect, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { HOME_ROUTE, STORE_ROUTE } from 'constants/routes';

const HomeMobileMenu = ({ appXPadding, menuHeight, isShown, string, handleOpenDialog, headerHeight, user, auth }) => {
    const WINDOW_WIDTH = useWindowWidth();
    const { OPTIONS, STORE_CODE } = STORE_CONFIG;
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
                    <MobileNavButton
                        path={HOME_ROUTE?.root(STORE_CODE)}
                        title={string?.home}
                        icon={p => <HomeIcon {...p} />}
                    />

                    <MobileNavButton
                        path={STORE_ROUTE?.root(STORE_CODE)}
                        childPath={['/details', '/contacts', 'model']}
                        title={string?.catalog}
                        icon={p => <GridViewIcon {...p} />}
                    />

                    {INFORMATION_PAGE_ACTIVE && (
                        <MobileNavButton
                            path={HOME_ROUTE?.info(STORE_CODE)}
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
                            action={() => handleOpenDialog(DialogWindowType?.LOGIN)}
                        />
                    )}
                    {auth && (
                        <ProfileButton
                            path={HOME_ROUTE?.root(STORE_CODE)}
                            string={string}
                            headerHeight={headerHeight}
                            menuHeight={menuHeight}
                            user={user}
                            handleOpenDialog={handleOpenDialog}
                            childPath={['orders', 'profile']}
                        />
                    )}
                </Box>
            </Box>
        );
    return null;
};

export default HomeMobileMenu;
