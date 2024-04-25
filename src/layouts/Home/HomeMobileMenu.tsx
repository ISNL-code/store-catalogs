import { Box } from '@mui/material';
import MobileNavButton from 'components/atoms/Buttons/MobileNavButton';
import GridViewIcon from '@mui/icons-material/GridView';
import StoreIcon from '@mui/icons-material/Store';
import Grid from '@mui/material/Unstable_Grid2';

const menuHeight = '70px';

const HomeMobileMenu = ({ appXPadding, isShown, string }) => {
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
                    <Grid xs={4}>
                        <MobileNavButton path={`/`} title={string?.home} icon={p => <StoreIcon {...p} />} />
                    </Grid>
                    <Grid xs={4}>
                        <MobileNavButton
                            path={`/catalog/${'ALBERTO_BINI'}/${'alberto-bini'}`}
                            childPath={['/details', '/contacts', 'model']}
                            title={string?.wholesale_catalog}
                            icon={p => <GridViewIcon {...p} />}
                            action={() => {
                                localStorage.setItem('catalog_mode', JSON.stringify(1));
                            }}
                        />
                    </Grid>
                    <Grid xs={4}>
                        <MobileNavButton
                            path={`/catalog/${'ALBERTO_BINI'}/${'alberto-bini'}`}
                            childPath={['/details', '/contacts', 'model']}
                            title={string?.retail_catalog}
                            icon={p => <GridViewIcon {...p} />}
                            action={() => {
                                localStorage.setItem('catalog_mode', JSON.stringify(3));
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        );
    return null;
};

export default HomeMobileMenu;
