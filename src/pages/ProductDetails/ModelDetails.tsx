import { Box } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { useOutletContext } from 'react-router-dom';
import { CatalogContextInterface } from 'types';
import ActionSection from './components/ActionSection';
import ArticleDetails from './components/ArticleDetails';
import ColorsDetails from './components/ColorsDetails';
import DescriptionDetails from './components/DescriptionDetails';
import PriceDetails from './components/PriceDetails';
import SizesDetails from './components/SizesDetails';
import TitleDetails from './components/TitleDetails';

const ModelDetails = ({ productDetails, selectedVariant, setSelectedVariant }) => {
    const { store }: CatalogContextInterface = useOutletContext();
    const { m } = useDevice();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: m ? 1.5 : 3 }}>
            <Box>
                <TitleDetails productDetails={productDetails} />
            </Box>
            <Box>
                <ActionSection
                    isShown={store?.additionalStoreSettings?.cart || store?.additionalStoreSettings?.favorites}
                />
            </Box>
            {store?.mainStoreSettings?.prices && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box sx={{ width: '100%' }}>
                        <PriceDetails productDetails={productDetails} isShown={store?.mainStoreSettings?.prices} />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <ArticleDetails isShown={store?.mainStoreSettings?.prices} />
                    </Box>
                </Box>
            )}
            <Box>
                <ColorsDetails
                    productDetails={productDetails}
                    selectedVariant={selectedVariant}
                    setSelectedVariant={setSelectedVariant}
                />
            </Box>
            {store?.mainStoreSettings?.sizes && (
                <Box>
                    <SizesDetails productDetails={productDetails} isShown={store?.mainStoreSettings?.sizes} />
                </Box>
            )}
            <Box mb={1}>
                <DescriptionDetails productDetails={productDetails} />
            </Box>
        </Box>
    );
};

export default ModelDetails;
