import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Button } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { CatalogContextInterface } from 'types';

interface CartButtonInterface {
    isShown: boolean;
    action;
    selected;
}

const CartButton = ({ isShown, action, selected }: CartButtonInterface) => {
    const { string }: CatalogContextInterface = useOutletContext();
    if (isShown)
        return (
            <Button
                onClick={() => {
                    action();
                }}
                size="small"
                sx={{ width: '100%', borderRadius: 2 }}
                color={selected ? 'success' : 'primary'}
                variant="contained"
                startIcon={
                    selected ? <ShoppingCartCheckoutIcon fontSize="small" /> : <AddShoppingCartIcon fontSize="small" />
                }
            >
                {selected ? string?.added : string?.add_to}
            </Button>
        );
    return null;
};

export default CartButton;
