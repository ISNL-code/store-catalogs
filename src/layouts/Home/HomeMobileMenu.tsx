import { Box } from '@mui/material';
import MobileNavButton from 'components/atoms/Buttons/MobileNavButton';
import GridViewIcon from '@mui/icons-material/GridView';
import StoreIcon from '@mui/icons-material/Store';

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
                    <MobileNavButton path={`/`} title={string?.home} icon={p => <StoreIcon {...p} />} />
                    <MobileNavButton
                        path={`/catalog/${'ALBERTO_BINI'}/${'alberto-bini'}`}
                        childPath={['/details', '/contacts', 'model']}
                        title={string?.wholesale_catalog}
                        icon={p => <GridViewIcon {...p} />}
                        action={() => {
                            localStorage.setItem('catalog_mode', JSON.stringify(1));
                        }}
                    />
                    <MobileNavButton
                        path={`/catalog/${'ALBERTO_BINI'}/${'alberto-bini'}`}
                        childPath={['/details', '/contacts', 'model']}
                        title={string?.retail_catalog}
                        icon={p => <GridViewIcon {...p} />}
                        action={() => {
                            localStorage.setItem('catalog_mode', JSON.stringify(3));
                        }}
                    />
                </Box>
            </Box>
        );
    return null;
};

export default HomeMobileMenu;
