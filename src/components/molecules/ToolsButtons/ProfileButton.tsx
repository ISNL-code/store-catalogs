import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Backdrop, Box, IconButton, ListItemText, MenuItem, SwipeableDrawer, Typography } from '@mui/material';
import SwiperButton from 'components/atoms/Elements/SwiperButton';
import { useDevice } from 'hooks/useDevice';
import { Fragment, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProfileButton = ({ string, headerHeight, menuHeight = '' }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setState] = useState({
        top: false,
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
                                        backgroundColor: 'rgba(131, 131, 131, 0.863)',
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
                                      }
                                    : {
                                          '.MuiPaper-root': {
                                              mt: `${headerHeight}px`,
                                          },
                                      }
                            }
                        >
                            {sx && <SwiperButton />}
                            <MenuItem
                                sx={{
                                    cursor: 'pointer',
                                }}
                            >
                                <ListItemText>
                                    <Typography>Item</Typography>
                                </ListItemText>
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    cursor: 'pointer',
                                }}
                            >
                                <ListItemText>
                                    <Typography>Item</Typography>
                                </ListItemText>
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    cursor: 'pointer',
                                }}
                            >
                                <ListItemText>
                                    <Typography>Item</Typography>
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
