import { Box, Typography } from '@mui/material';
import DetailsSection from 'components/atoms/Sections/DetailsSection';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import { useOutletContext } from 'react-router-dom';

const PriceDetails = ({ productDetails, isShown }) => {
    const { string, store }: any = useOutletContext();

    if (isShown)
        return (
            <DetailsSection label={string?.price}>
                <Box sx={{ display: 'flex' }}>
                    <Typography variant="h3" sx={{ color: '#505050' }}>
                        {getCurrencySymbol(store?.currency)}
                        {Number(productDetails?.price?.replace('$', '')?.replace('UAH', ''))}
                    </Typography>
                </Box>
            </DetailsSection>
        );
    return null;
};

export default PriceDetails;
