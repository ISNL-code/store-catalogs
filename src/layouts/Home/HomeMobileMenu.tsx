import { Box } from '@mui/material';
import MobileNavButton from 'components/atoms/Buttons/MobileNavButton';
import GridViewIcon from '@mui/icons-material/GridView';
import { useParams } from 'react-router-dom';

const menuHeight = '70px';

const HomeMobileMenu = ({ appXPadding, isShown, string }) => {
    const { storeCode, storeName } = useParams();

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
                    <MobileNavButton
                        path={`/catalog/${storeCode}/${storeName}`}
                        childPath={['/details', '/contacts', 'model']}
                        title={string?.catalog}
                        icon={p => <GridViewIcon {...p} />}
                    />
                </Box>
            </Box>
        );
    return null;
};

export default HomeMobileMenu;
