import { Box, Button } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CatalogContextInterface } from 'types';

const ActionSection = ({ isShown }) => {
    const { store, string, setOpenModalType, auth }: CatalogContextInterface = useOutletContext();
    if (isShown)
        return (
            <Box mb={0.5} sx={{ display: 'flex', gap: 1 }}>
                {store?.additionalStoreSettings?.cart && (
                    <Button
                        sx={{
                            cursor: 'pointer',
                            borderRadius: 2,
                            width: '100%',
                        }}
                        variant="contained"
                        onClick={() => {
                            if (!auth) return setOpenModalType('register-warning');
                        }}
                        color="primary"
                        endIcon={
                            false ? <ShoppingCartIcon fontSize="small" /> : <AddShoppingCartIcon fontSize="small" />
                        }
                    >
                        {string?.add_to}
                    </Button>
                )}
                {store?.additionalStoreSettings?.favorites && (
                    <Button
                        sx={{
                            cursor: 'pointer',
                            borderRadius: 2,
                            width: '100%',
                        }}
                        variant="contained"
                        onClick={() => {
                            if (!auth) return setOpenModalType('register-warning');
                        }}
                        color="warning"
                        endIcon={false ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                    >
                        {string?.add_to}
                    </Button>
                )}
            </Box>
        );
    return null;
};

export default ActionSection;
