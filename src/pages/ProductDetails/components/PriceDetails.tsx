import { Box, Typography } from '@mui/material';
import DetailsSection from 'components/atoms/Sections/DetailsSection';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import { useOutletContext } from 'react-router-dom';

const PriceDetails = ({ productDetails, isShown }) => {
    const { string, store }: any = useOutletContext();

    if (isShown)
        return (
            <DetailsSection label={string?.price}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography>
                            {getCurrencySymbol(store?.currency)}
                            {productDetails?.price?.replace('$', '')?.replace('UAH', '')?.replace('€', '')}
                        </Typography>
                    </Box>
                </Box>
            </DetailsSection>
        );
    return null;
};

export default PriceDetails;
