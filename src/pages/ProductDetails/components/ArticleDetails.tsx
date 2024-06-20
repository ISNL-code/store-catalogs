import { Box, Typography } from '@mui/material';
import DetailsSection from 'components/atoms/Sections/DetailsSection';
import toast from 'react-hot-toast';
import { useOutletContext, useParams } from 'react-router-dom';

const ArticleDetails = () => {
    const { string }: any = useOutletContext();
    const { modelSku } = useParams();

    const handleCopyToClipboard = () => {
        navigator.clipboard
            .writeText(modelSku?.replaceAll('_', '/') as string)
            .then(() => toast.success(string?.copied_to_clipboard));
    };

    return (
        <DetailsSection label={string?.vendor_code}>
            <Box
                sx={{ display: 'flex', justifyContent: 'space-between', cursor: 'copy' }}
                onClick={handleCopyToClipboard}
            >
                <Box>
                    <Typography sx={{ fontSize: 20 }}>{modelSku?.replaceAll('_', '/')}</Typography>
                </Box>
            </Box>
        </DetailsSection>
    );
};

export default ArticleDetails;
