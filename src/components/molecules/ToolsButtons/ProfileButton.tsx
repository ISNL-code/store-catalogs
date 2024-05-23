import React, { useState } from 'react';
import {
    PermIdentity as PermIdentityIcon,
    AttachMoney as AttachMoneyIcon,
    Logout as LogoutIcon,
    Login as LoginIcon,
    PhoneCallback as PhoneCallbackIcon,
} from '@mui/icons-material';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, SwipeableDrawer, Typography, MenuItem, ListItemText } from '@mui/material';
import SwiperButton from 'components/atoms/Elements/SwiperButton';
import { useDevice } from 'hooks/useDevice';
import { useLocation, useNavigate } from 'react-router-dom';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { STORE_ROUTE } from 'constants/routes';
import { Color } from 'colors';

interface ProfileButtonProps {
    string: any;
    headerHeight: string;
    menuHeight?: string;
    user: any;
    childPath?: string[];
    handleOpenDialog: (type: DialogWindowType) => void;
    auth: boolean;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
    string,
    headerHeight,
    menuHeight = '',
    user,
    childPath,
    handleOpenDialog,
    auth,
}) => {
    const { OPTIONS, STORE_CODE } = STORE_CONFIG;
    const { PLAN_OPTIONS, INFORMATION_PAGE_ACTIVE } = OPTIONS;
    const location = useLocation();
    const navigate = useNavigate();
    const [state, setState] = useState<{ right: boolean; bottom: boolean }>({ right: false, bottom: false });
    const active = state.bottom || state.right || childPath?.some(el => location.pathname.includes(el));
    const { sx } = useDevice();

    const toggleDrawer =
        (anchor: 'right' | 'bottom', open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                (event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Tab') ||
                (event as React.KeyboardEvent).key === 'Shift'
            ) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };

    const MenuComponents = [
        {
            onClick: () => navigate(STORE_ROUTE.profile(STORE_CODE)),
            icon: <PermIdentityIcon />,
            name: string.profile,
            visible: auth,
        },
        {
            onClick: () => navigate(STORE_ROUTE.profile(STORE_CODE)),
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
            onClick={() => {
                onClick();
                toggleDrawer(anchor, false);
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
                    <Box sx={sx ? { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.4 } : {}}>
                        <IconButton
                            sx={
                                sx
                                    ? {
                                          border: '2px solid',
                                          borderColor: active ? Color?.PRIMARY : '#fff',
                                          width: 33,
                                          height: 33,
                                          borderRadius: '12px',
                                          p: 0.5,
                                      }
                                    : {
                                          display: 'flex',
                                          flexDirection: 'column',
                                          alignItems: 'center',
                                          '&:hover': { backgroundColor: '#fff' },
                                      }
                            }
                            color={active ? `primary` : 'default'}
                            onClick={toggleDrawer(anchor, !state[anchor])}
                        >
                            <MenuIcon sx={{ color: sx ? (active ? Color?.PRIMARY : '#fff') : '' }} />
                            {!sx && (
                                <Typography
                                    sx={{ fontSize: 10, color: active ? Color?.PRIMARY : 'rgba(0, 0, 0, 0.54)' }}
                                >
                                    {string?.menu}
                                </Typography>
                            )}
                        </IconButton>
                        {sx && (
                            <Typography sx={{ fontSize: 8, color: active ? Color?.PRIMARY : 'white' }}>
                                {string?.menu?.toUpperCase()}
                            </Typography>
                        )}
                    </Box>

                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                        sx={{
                            ...{
                                zIndex: 2000,
                                '.MuiDrawer-paper': {
                                    minWidth: '240px',
                                },
                            },
                            ...(sx
                                ? {
                                      '.MuiPaper-root': {
                                          marginBottom: menuHeight,
                                          borderTopLeftRadius: 20,
                                          borderTopRightRadius: 20,
                                      },
                                  }
                                : {
                                      '.MuiPaper-root': {
                                          marginTop: `${headerHeight}px`,
                                      },
                                  }),
                        }}
                    >
                        {sx && <SwiperButton />}
                        {user?.currentUserData?.emailAddress && auth && (
                            <Box
                                px={2}
                                sx={{
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #ccc',
                                }}
                            >
                                <ListItemText onClick={toggleDrawer(anchor, false)}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
                                        <Typography color="gray" variant="h4">
                                            {user?.currentUserData?.emailAddress}
                                        </Typography>
                                    </Box>
                                </ListItemText>
                            </Box>
                        )}
                        {MenuComponents?.map(({ onClick, name, icon, visible }, idx) => (
                            <Item
                                key={idx}
                                name={name}
                                onClick={onClick}
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

export default ProfileButton;
