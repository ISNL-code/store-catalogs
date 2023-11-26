import { Box, Typography } from '@mui/material';
import DetailsSection from 'components/atoms/Sections/DetailsSection';
import { useOutletContext } from 'react-router-dom';

const PriceDetails = ({ productDetails, isShown }) => {
    const { string }: any = useOutletContext();

    if (isShown)
        return (
            <DetailsSection label={string?.price}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography>{productDetails?.price}</Typography>
                    </Box>
                </Box>
            </DetailsSection>
        );
    return null;
};

export default PriceDetails;
