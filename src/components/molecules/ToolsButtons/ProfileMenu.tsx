import React, { useEffect, useState } from 'react';
import {
    PermIdentity as PermIdentityIcon,
    AttachMoney as AttachMoneyIcon,
    Logout as LogoutIcon,
    Login as LoginIcon,
    PhoneCallback as PhoneCallbackIcon,
    AlternateEmail as AlternateEmailIcon,
} from '@mui/icons-material';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, SwipeableDrawer, Typography, MenuItem } from '@mui/material';
import SwiperButton from 'components/atoms/Elements/SwiperButton';
import { useDevice } from 'hooks/useDevice';
import { useLocation, useNavigate } from 'react-router-dom';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { STORE_ROUTE } from 'router/routes';
import HeaderNavButton from 'components/atoms/Buttons/HeaderNavButton';
import MobileNavButton from 'components/atoms/Buttons/MobileNavButton';
import ShopIcon from '@mui/icons-material/Shop';

interface ProfileMenuProps {
    string: any;
    headerHeight: number;
    footerMenuHeight?: string;
    user: any;
    childPath?: string[];
    handleOpenDialog: (type: DialogWindowType) => void;
    auth: boolean;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
    string,
    headerHeight,
    user,
    childPath,
    handleOpenDialog,
    auth,
    footerMenuHeight,
}) => {
    const { OPTIONS, STORE_CODE } = STORE_CONFIG;
    const { PLAN_OPTIONS, INFORMATION_PAGE_ACTIVE } = OPTIONS;
    const location = useLocation();
    const navigate = useNavigate();
    const [state, setState] = useState<{ right: boolean; bottom: boolean }>({ right: false, bottom: false });
    const active = state.bottom || state.right || childPath?.some(el => location.pathname.includes(el));
    const { sx } = useDevice();

    useEffect(() => {
        const handleOutsideClick = event => {
            // Refining the selector to exclude clicks on the menu button or its children
            const menuButton = document.querySelector('.OpenMenuButton');
            if (menuButton && !menuButton.contains(event.target)) {
                setState(prev => ({ ...prev, right: false, bottom: false }));
            }
        };

        // Add listener if any drawer is open
        if (state.right || state.bottom) {
            document.addEventListener('click', handleOutsideClick);
        }

        // Cleanup listener
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [state.right, state.bottom]); // Only re-run the effect if the drawer's state changes

    const toggleDrawer =
        (anchor: 'right' | 'bottom', open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
            setState(prev => ({ ...prev, [anchor]: open }));
        };

    const MenuComponents = [
        {
            onClick: () => navigate(STORE_ROUTE.profile(STORE_CODE)),
            icon: <PermIdentityIcon />,
            name: string.profile,
            visible: auth,
        },
        {
            onClick: () => navigate(STORE_ROUTE.orders(STORE_CODE)),
            icon: <AttachMoneyIcon />,
            name: string.orders,
            visible: auth && PLAN_OPTIONS?.cart,
        },
        {
            onClick: () => navigate(STORE_ROUTE.contacts(STORE_CODE)),
            icon: <PhoneCallbackIcon />,
            name: string.contacts,
            visible: PLAN_OPTIONS.contacts,
        },
        {
            onClick: () => navigate(STORE_ROUTE.info(STORE_CODE)),
            icon: <PrivacyTipIcon />,
            name: string.info,
            visible: INFORMATION_PAGE_ACTIVE,
        },
        {
            onClick: () => window?.open('https://salesnestonlinecatalog.com'),
            icon: <ShopIcon />,
            name: 'Cocktail E-Catalogs',
            visible: true,
        },
        {
            onClick: () => handleOpenDialog(DialogWindowType.LOGOUT),
            icon: <LogoutIcon />,
            name: string.logout,
            visible: auth,
        },
        {
            onClick: () => handleOpenDialog(DialogWindowType.LOGIN),
            icon: <LoginIcon />,
            name: string.login,
            visible: !auth,
        },
    ];

    const Item = ({ name, icon, onClick, anchor, visible }) => (
        <MenuItem
            onClick={e => {
                toggleDrawer(anchor, false)(e);
                onClick();
            }}
            sx={{ height: 50, gap: 2, display: visible ? 'flex' : 'none' }}
        >
            <IconButton size="small" sx={{ border: `1px solid #ccc` }}>
                {icon}
            </IconButton>
            <Typography variant="h3" color="gray">
                {name}
            </Typography>
        </MenuItem>
    );

    return (
        <Box>
            {[(sx ? 'bottom' : 'right') as 'right' | 'bottom'].map(anchor => (
                <React.Fragment key={anchor}>
                    <Box
                        className="OpenMenuButton"
                        sx={sx ? { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.4 } : {}}
                    >
                        {sx ? (
                            <MobileNavButton
                                title={string?.menu}
                                icon={p => <MenuIcon {...p} />}
                                action={toggleDrawer(anchor, !state[anchor])}
                                isActive={active}
                            />
                        ) : (
                            <HeaderNavButton
                                title={string?.menu}
                                icon={() => <MenuIcon />}
                                action={toggleDrawer(anchor, !state[anchor])}
                                isActive={active}
                            />
                        )}
                    </Box>

                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false) as any}
                        onOpen={toggleDrawer(anchor, true) as any}
                        slotProps={{
                            backdrop: {
                                onClick: event => {
                                    event.preventDefault();
                                    toggleDrawer(anchor, false)(event as any);
                                },
                            },
                        }}
                        PaperProps={{
                            onClick: (event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                toggleDrawer(anchor, false)(event as any);
                            },
                            sx: {
                                pt: sx ? 0 : `${headerHeight}px`,
                                pb: sx ? `${footerMenuHeight}px` : 0,
                                borderRadius: sx ? 4 : 0,
                                minWidth: 280,
                            },
                        }}
                    >
                        {sx && <SwiperButton />}
                        {user?.currentUserData?.emailAddress && auth && (
                            <Box
                                p={2}
                                sx={{
                                    borderBottom: '1px solid #ccc',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <IconButton size="small" sx={{ cursor: 'default' }}>
                                    <AlternateEmailIcon />
                                </IconButton>

                                <Typography color="gray" variant="h4">
                                    {user?.currentUserData?.emailAddress}
                                </Typography>
                            </Box>
                        )}
                        {MenuComponents?.map(({ onClick, name, icon, visible }, idx) => (
                            <Item
                                key={idx}
                                name={name}
                                onClick={() => {
                                    onClick();
                                }}
                                icon={icon}
                                anchor={anchor}
                                visible={visible}
                            />
                        ))}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </Box>
    );
};

export default ProfileMenu;
