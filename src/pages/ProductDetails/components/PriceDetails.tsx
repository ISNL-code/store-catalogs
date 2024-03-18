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
                    <Typography variant="h4" sx={{ textDecoration: 'line-through' }}>
                        {getCurrencySymbol(store?.currency)}
                        {productDetails?.price?.replace('$', '')?.replace('UAH', '') * 140}
                    </Typography>
                    /
                    <Typography variant="h3" sx={{ color: 'red' }}>
                        {getCurrencySymbol(store?.currency)}
                        {productDetails?.price?.replace('$', '')?.replace('UAH', '') * 80}
                    </Typography>
                </Box>
            </DetailsSection>
        );
    return null;
};

export default PriceDetails;
