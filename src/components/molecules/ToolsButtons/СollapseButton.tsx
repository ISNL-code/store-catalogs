import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Box, IconButton } from '@mui/material';

interface CartButtonInterface {
    isShown: boolean;
    collapse;
}

const CollapseButton = ({ isShown, collapse }: CartButtonInterface) => {
    if (isShown)
        return (
            <Box>
                <Box>
                    <IconButton
                        size="small"
                        sx={{ border: '2px solid #00000054', backgroundColor: '#fff', width: '33px', height: '33px' }}
                        onClick={() => collapse(false)}
                    >
                        <ExpandLessIcon color="inherit" />
                    </IconButton>
                </Box>
            </Box>
        );
    return null;
};

export default CollapseButton;
