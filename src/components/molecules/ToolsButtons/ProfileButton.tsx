import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Backdrop, Box, IconButton, ListItemText, MenuItem, SwipeableDrawer, Typography } from '@mui/material';
import SwiperButton from 'components/atoms/Elements/SwiperButton';
import { useDevice } from 'hooks/useDevice';
import { Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';

const ProfileButton = ({ string, headerHeight, menuHeight = '', user, setOpenModalType, store }) => {
    const navigate = useNavigate();
    const { storeCode, storeName } = useParams();
    const [state, setState] = useState({
        right: false,
        bottom: false,
    });
    const active = state.bottom || state.right;
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
                            sx={sx ? { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.7 } : {}}
                        >
                            <IconButton
                                sx={
                                    sx
                                        ? {
                                              border: '2px solid',
                                              borderColor: active ? '#1976d2' : '#fff',
                                              borderRadius: '8px',
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
                                <Typography sx={{ fontSize: 10, color: active ? '#1976d2' : 'white' }}>
                                    {string?.my_profile}
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
                            <MenuItem
                                sx={{
                                    cursor: 'pointer',
                                    minWidth: 200,
                                }}
                                onClick={() => {
                                    navigate(`/catalog/${storeCode}/${storeName}/profile`);
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
                            {store?.additionalStoreSettings?.cart && (
                                <MenuItem
                                    sx={{
                                        cursor: 'pointer',
                                        minWidth: 200,
                                    }}
                                    onClick={() => {
                                        setState({ right: false, bottom: false });
                                        navigate(`/catalog/${storeCode}/${storeName}/orders`);
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
                            <MenuItem
                                sx={{
                                    cursor: 'pointer',
                                    minWidth: 200,
                                }}
                                onClick={() => {
                                    setOpenModalType('logout');
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
                        </SwipeableDrawer>
                    </Fragment>
                ))}
            </Box>
        </>
    );
};

export default ProfileButton;
