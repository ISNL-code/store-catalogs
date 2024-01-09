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
                    <IconButton
                        size="small"
                        sx={{
                            border: '1px solid #ed6c02',
                            backgroundColor: '#fff',
                            width: '33px',
                            height: '33px',
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
