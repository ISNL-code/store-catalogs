import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Backdrop, Box, IconButton, ListItemText, MenuItem, SwipeableDrawer, Typography } from '@mui/material';
import SwiperButton from 'components/atoms/Elements/SwiperButton';
import { useDevice } from 'hooks/useDevice';
import { Fragment, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Logout';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import InfoIcon from '@mui/icons-material/Info';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import { STORE_ROUTE } from 'constants/routes';

const ProfileButton = ({ string, headerHeight, menuHeight = '', user, childPath, handleOpenDialog, auth }) => {
    const { OPTIONS, STORE_CODE } = STORE_CONFIG;
    const { PLAN_OPTIONS, INFORMATION_PAGE_ACTIVE } = OPTIONS;

    const location = useLocation();
    const navigate = useNavigate();
    const [state, setState] = useState({
        right: false,
        bottom: false,
    });
    const active = state.bottom || state.right || childPath?.some(el => location?.pathname?.includes(el));
    const { sx } = useDevice();

    const toggleDrawer = (anchor, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <>
            <Box>
                {[sx ? 'bottom' : 'right'].map(anchor => (
                    <Fragment key={anchor}>
                        <Box
                            sx={sx ? { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.4 } : {}}
                        >
                            <IconButton
                                sx={
                                    sx
                                        ? {
                                              border: '2px solid',
                                              borderColor: active ? '#1976d2' : '#fff',
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
                                <AccountCircleIcon sx={{ color: sx ? (active ? '#1976d2' : '#fff') : '' }} />
                                {!sx && (
                                    <Typography
                                        sx={{ fontSize: 10, color: active ? '#1976d2' : 'rgba(0, 0, 0, 0.54)' }}
                                    >
                                        {string?.my_profile}
                                    </Typography>
                                )}
                            </IconButton>
                            {sx && (
                                <Typography sx={{ fontSize: 8, color: active ? '#1976d2' : 'white' }}>
                                    {string?.my_profile.toUpperCase()}
                                </Typography>
                            )}
                        </Box>

                        <SwipeableDrawer
                            anchor={anchor as any}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                            onOpen={toggleDrawer(anchor, true)}
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                                backdrop: {
                                    sx: {
                                        backgroundColor: 'rgba(255, 255, 255, 0)',
                                    },
                                },
                            }}
                            sx={
                                sx
                                    ? {
                                          '.MuiPaper-root': {
                                              mb: menuHeight,
                                              borderTopLeftRadius: 20,
                                              borderTopRightRadius: 20,
                                          },
                                          zIndex: 2000,
                                      }
                                    : {
                                          '.MuiPaper-root': {
                                              mt: `${headerHeight}px`,
                                          },
                                          zIndex: 2000,
                                      }
                            }
                        >
                            {sx && <SwiperButton />}
                            <MenuItem
                                sx={{
                                    cursor: 'pointer',
                                    minWidth: 200,
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
                            </MenuItem>
                            {auth && (
                                <MenuItem
                                    sx={{
                                        cursor: 'pointer',
                                        minWidth: 200,
                                    }}
                                    onClick={() => {
                                        navigate(STORE_ROUTE?.profile(STORE_CODE));
                                        setState({ right: false, bottom: false });
                                    }}
                                >
                                    <ListItemText onClick={toggleDrawer(anchor, false)}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PermIdentityIcon />
                                            <Typography variant="h4">{string?.profile}</Typography>
                                        </Box>
                                    </ListItemText>
                                </MenuItem>
                            )}
                            {PLAN_OPTIONS?.cart && auth && (
                                <MenuItem
                                    sx={{
                                        cursor: 'pointer',
                                        minWidth: 200,
                                    }}
                                    onClick={() => {
                                        setState({ right: false, bottom: false });
                                        navigate(STORE_ROUTE?.orders(STORE_CODE));
                                    }}
                                >
                                    <ListItemText onClick={toggleDrawer(anchor, false)}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <AttachMoneyIcon />
                                            <Typography variant="h4">{string?.orders}</Typography>
                                        </Box>
                                    </ListItemText>
                                </MenuItem>
                            )}
                            {PLAN_OPTIONS?.contacts && (
                                <MenuItem
                                    sx={{
                                        cursor: 'pointer',
                                        minWidth: 200,
                                    }}
                                    onClick={() => {
                                        navigate(STORE_ROUTE?.contacts(STORE_CODE));
                                        setState({ right: false, bottom: false });
                                    }}
                                >
                                    <ListItemText onClick={toggleDrawer(anchor, false)}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PhoneCallbackIcon />
                                            <Typography variant="h4">{string?.contacts}</Typography>
                                        </Box>
                                    </ListItemText>
                                </MenuItem>
                            )}
                            {INFORMATION_PAGE_ACTIVE && (
                                <MenuItem
                                    sx={{
                                        cursor: 'pointer',
                                        minWidth: 200,
                                    }}
                                    onClick={() => {
                                        navigate(STORE_ROUTE?.info(STORE_CODE));
                                        setState({ right: false, bottom: false });
                                    }}
                                >
                                    <ListItemText onClick={toggleDrawer(anchor, false)}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <InfoIcon />
                                            <Typography variant="h4">{string?.info}</Typography>
                                        </Box>
                                    </ListItemText>
                                </MenuItem>
                            )}
                            {auth ? (
                                <MenuItem
                                    sx={{
                                        cursor: 'pointer',
                                        minWidth: 200,
                                    }}
                                    onClick={() => {
                                        handleOpenDialog(DialogWindowType?.LOGOUT);
                                        toggleDrawer(anchor, true);
                                    }}
                                >
                                    <ListItemText onClick={toggleDrawer(anchor, false)}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <LogoutIcon />
                                            <Typography variant="h4">{string?.logout}</Typography>
                                        </Box>
                                    </ListItemText>
                                </MenuItem>
                            ) : (
                                <MenuItem
                                    sx={{
                                        cursor: 'pointer',
                                        minWidth: 200,
                                    }}
                                    onClick={() => {
                                        handleOpenDialog(DialogWindowType?.LOGIN);
                                        toggleDrawer(anchor, true);
                                    }}
                                >
                                    <ListItemText onClick={toggleDrawer(anchor, false)}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <LoginIcon />
                                            <Typography variant="h4">{string?.login}</Typography>
                                        </Box>
                                    </ListItemText>
                                </MenuItem>
                            )}
                        </SwipeableDrawer>
                    </Fragment>
                ))}
            </Box>
        </>
    );
};

export default ProfileButton;
