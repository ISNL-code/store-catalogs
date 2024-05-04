import { Box, Typography } from '@mui/material';
import DetailsSection from 'components/atoms/Sections/DetailsSection';
import { useOutletContext, useParams } from 'react-router-dom';

const ArticleDetails = ({ isShown }) => {
    const { string }: any = useOutletContext();
    const { modelSku } = useParams();
    if (isShown)
        return (
            <DetailsSection label={string?.vendor_code}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography sx={{ fontSize: 20 }}>{modelSku?.replaceAll('_', '/')}</Typography>
                    </Box>
                </Box>
            </DetailsSection>
        );
    return null;
};

export default ArticleDetails;
