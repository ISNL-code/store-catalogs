import { Box, Typography } from '@mui/material';
import DetailsSection from 'components/atoms/Sections/DetailsSection';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import { useOutletContext } from 'react-router-dom';

const PriceDetails = ({ productDetails, isShown }) => {
    const { string, store }: any = useOutletContext();
    const catalogPriceMode = localStorage.getItem('catalog_mode');
    if (isShown)
        return (
            <DetailsSection label={string?.price}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography>
                            {getCurrencySymbol(store?.currency)}
                            {productDetails?.price?.replace('$', '')?.replace('UAH', '').replace('€', '') *
                                Number(catalogPriceMode)}
                        </Typography>
                    </Box>
                </Box>
            </DetailsSection>
        );
    return null;
};

export default PriceDetails;
