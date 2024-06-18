import { Box, IconButton } from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Color, Colors } from 'constants/colors';

interface ShareButtonInterface {
    path: string;
    isShown: boolean;
}

const ShareButton = ({ path, isShown }: ShareButtonInterface) => {
    const handleShare = async () => {
        try {
            await navigator.share({
                url: path,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    if (!isShown) return null;
    if ('share' in navigator)
        return (
            <Box>
                <IconButton
                    onClick={handleShare}
                    size="small"
                    sx={{ background: Color?.SECONDARY, '&:hover': { background: Color?.SECONDARY_DARK } }}
                >
                    <IosShareIcon sx={{ color: Colors?.WHITE, fontSize: 19 }} />
                </IconButton>
            </Box>
        );
    return null;
};

export default ShareButton;
