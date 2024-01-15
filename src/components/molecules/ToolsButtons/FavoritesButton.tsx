import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, IconButton } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { CatalogContextInterface } from 'types';

interface FavoriteButtonInterface {
    isShown: boolean;
}

const FavoritesButton = ({ isShown }: FavoriteButtonInterface) => {
    const { setOpenModalType, auth }: CatalogContextInterface = useOutletContext();

    if (isShown)
        return (
            <Box>
                <Box>
                    <IconButton
                        size="small"
                        sx={{
                            border: '1px solid #ed6c02',
                            backgroundColor: '#fff',
                            width: '33px',
                            height: '33px',
                        }}
                        onClick={() => {
                            if (!auth) return setOpenModalType('register-warning');
                        }}
                    >
                        <FavoriteBorderIcon color="warning" />
                    </IconButton>
                </Box>
            </Box>
        );
    return null;
};

export default FavoritesButton;
