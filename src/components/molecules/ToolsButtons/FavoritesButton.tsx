import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, IconButton } from '@mui/material';

interface FavoriteButtonInterface {
    isShown: boolean;
}

const FavoritesButton = ({ isShown }: FavoriteButtonInterface) => {
    if (isShown)
        return (
            <Box>
                <Box>
                    <IconButton size="small">
                        <FavoriteBorderIcon color="warning" />
                    </IconButton>
                </Box>
            </Box>
        );
    return null;
};

export default FavoritesButton;
