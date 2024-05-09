import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Box, IconButton } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { CatalogContextInterface } from 'types';

interface CartButtonInterface {
    isShown: boolean;
    action;
    selected;
}

const CartButton = ({ isShown, action, selected }: CartButtonInterface) => {
    const { setOpenModalType, auth }: CatalogContextInterface = useOutletContext();
    if (isShown)
        return (
            <Box>
                <Box>
                    <IconButton
                        size="small"
                        sx={{
                            border: selected ? '1px solid green' : '1px solid #1976d2',
                            backgroundColor: selected ? 'green' : '#fff',
                            width: '30px',
                            height: '30px',
                            '&:hover': { backgroundColor: selected ? 'green' : '#fff' },
                        }}
                        onClick={() => {
                            if (!auth) return setOpenModalType('register-warning');
                            action();
                        }}
                    >
                        {selected ? (
                            <ShoppingCartCheckoutIcon sx={{ color: 'white' }} fontSize="small" />
                        ) : (
                            <AddShoppingCartIcon sx={{ color: '#1976d2' }} fontSize="small" />
                        )}
                    </IconButton>
                </Box>
            </Box>
        );
    return null;
};

export default CartButton;
