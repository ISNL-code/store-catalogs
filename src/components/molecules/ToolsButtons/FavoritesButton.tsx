import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, IconButton } from '@mui/material';

interface FavoriteButtonInterface {
    isShown: boolean;
    selected: boolean;
    onClick: () => void;
}

const FavoritesButton = ({ isShown, selected, onClick }: FavoriteButtonInterface) => {
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
                        onClick={e => {
                            e.stopPropagation();
                            onClick();
                        }}
                    >
                        {selected ? <FavoriteIcon color="warning" /> : <FavoriteBorderIcon color="warning" />}
                    </IconButton>
                </Box>
            </Box>
        );
    return null;
};

export default FavoritesButton;
