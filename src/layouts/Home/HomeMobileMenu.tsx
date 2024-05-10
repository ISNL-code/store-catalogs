import { Box } from '@mui/material';
import MobileNavButton from 'components/atoms/Buttons/MobileNavButton';
import HomeIcon from '@mui/icons-material/Home';
import Grid from '@mui/material/Unstable_Grid2';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';
import { STORE_CONFIG } from 'constants/stores_config';

const menuHeight = '70px';

const HomeMobileMenu = ({ appXPadding, isShown, string }) => {
    const { STORE_CODE, STORE_NAME } = STORE_CONFIG;
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
                <Grid
                    xs={12}
                    container
                    mt={0.5}
                    sx={{
                        height: menuHeight,
                    }}
                >
                    <Grid xs={3}>
                        <MobileNavButton path={`/`} title={string?.home} icon={p => <HomeIcon {...p} />} />
                    </Grid>
                    <Grid xs={3}>
                        <MobileNavButton
                            path={`/catalog/${STORE_CODE}/${STORE_NAME.replaceAll(' ', '-')}`}
                            title={string?.wholesale_catalog}
                            icon={p => <AttachMoneyIcon {...p} />}
                            action={() => {
                                localStorage.setItem('catalog_mode', JSON.stringify(1));
                            }}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <MobileNavButton
                            path={`/catalog/${STORE_CODE}/${STORE_NAME.replaceAll(' ', '-')}`}
                            title={string?.retail_catalog}
                            icon={p => <StorefrontIcon {...p} />}
                            action={() => {
                                localStorage.setItem('catalog_mode', JSON.stringify(3));
                            }}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <MobileNavButton
                            path={`/info`}
                            title={string?.info}
                            icon={p => <InfoIcon {...p} />}
                            action={() => {}}
                        />
                    </Grid>
                </Grid>
            </Box>
        );
    return null;
};

export default HomeMobileMenu;
