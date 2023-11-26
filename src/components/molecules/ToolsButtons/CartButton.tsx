import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box, IconButton } from '@mui/material';

interface CartButtonInterface {
    isShown: boolean;
}

const CartButton = ({ isShown }: CartButtonInterface) => {
    if (isShown)
        return (
            <Box>
                <Box>
                    <IconButton
                        size="small"
                        sx={{ border: '1px solid #1976d2', backgroundColor: '#fff', width: '33px', height: '33px' }}
                    >
                        <AddShoppingCartIcon color="primary" fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
        );
    return null;
};

export default CartButton;
