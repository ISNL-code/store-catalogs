import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Button } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { CatalogContextInterface } from 'types/outlet_context_models';

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
                onClick={e => {
                    e.stopPropagation();
                    action();
                }}
                size="medium"
                sx={{
                    width: '100%',
                    borderRadius: 3,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textTransform: 'uppercase',
                    fontSize: 10,
                    lineHeight: 1,
                    alignItems: 'center',
                }}
                color={selected ? 'success' : 'primary'}
                variant="contained"
                endIcon={
                    selected ? <ShoppingCartCheckoutIcon fontSize="small" /> : <AddShoppingCartIcon fontSize="small" />
                }
            >
                {selected ? string?.in_cart : string?.add_to_cart}
            </Button>
        );
    return null;
};

export default CartButton;
