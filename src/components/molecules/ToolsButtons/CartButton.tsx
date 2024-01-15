import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box, IconButton } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { CatalogContextInterface } from 'types';

interface CartButtonInterface {
    isShown: boolean;
}

const CartButton = ({ isShown }: CartButtonInterface) => {
    const { setOpenModalType, auth }: CatalogContextInterface = useOutletContext();
    if (isShown)
        return (
            <Box>
                <Box>
                    <IconButton
                        size="small"
                        sx={{ border: '1px solid #1976d2', backgroundColor: '#fff', width: '33px', height: '33px' }}
                        onClick={() => {
                            if (!auth) return setOpenModalType('register-warning');
                        }}
                    >
                        <AddShoppingCartIcon color="primary" fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
        );
    return null;
};

export default CartButton;
