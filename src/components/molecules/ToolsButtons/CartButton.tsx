import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Box, IconButton } from '@mui/material';

interface CartButtonInterface {
    isShown: boolean;
    action;
    selected;
}

const CartButton = ({ isShown, action, selected }: CartButtonInterface) => {
    if (isShown)
        return (
            <Box>
                <Box>
                    <IconButton
                        size="small"
                        sx={{
                            border: selected ? '1px solid green' : '1px solid #1976d2',
                            backgroundColor: selected ? 'green' : '#fff',
                            width: '33px',
                            height: '33px',
                            '&:hover': { backgroundColor: selected ? 'green' : '#fff' },
                        }}
                        onClick={() => {
                            action();
                        }}
                    >
                        {selected ? (
                            <ShoppingCartCheckoutIcon sx={{ color: 'white' }} />
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
