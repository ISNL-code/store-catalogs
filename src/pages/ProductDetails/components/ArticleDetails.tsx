import { Box, Typography } from '@mui/material';
import DetailsSection from 'components/atoms/Sections/DetailsSection';
import { useOutletContext, useParams } from 'react-router-dom';

const ArticleDetails = ({ isShown }) => {
    const { string }: any = useOutletContext();
    const { modelSKU } = useParams();
    if (isShown)
        return (
            <DetailsSection label={string?.vendor_code}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography>{modelSKU}</Typography>
                    </Box>
                </Box>
            </DetailsSection>
        );
    return null;
};

export default ArticleDetails;
