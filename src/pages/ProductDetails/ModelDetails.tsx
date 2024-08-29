import { Box } from '@mui/material';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { useDevice } from 'hooks/useDevice';
import ActionSection from './components/ActionSection';
import ArticleDetails from './components/ArticleDetails';
import ColorsDetails from './components/ColorsDetails';
import DescriptionDetails from './components/DescriptionDetails';
import PriceDetails from './components/PriceDetails';
import SizesDetails from './components/SizesDetails';
import TitleDetails from './components/TitleDetails';
import Loader from 'components/atoms/Loader/Loader';
import { ProductDataInterface } from 'types/app_models';

interface Props {
    productDetails: ProductDataInterface | null;
    selectedVariant;
    setSelectedVariant;
}

const ModelDetails = ({ productDetails, selectedVariant, setSelectedVariant }: Props) => {
    const { OPTIONS } = STORE_CONFIG;
    const { PLAN_OPTIONS } = OPTIONS;
    const { m } = useDevice();

    if (!productDetails) return <Loader />;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: m ? 1.5 : 3 }}>
            <Box>
                <TitleDetails productDetails={productDetails} selectedVariant={selectedVariant} />
            </Box>
            <Box>
                <ColorsDetails
                    productDetails={productDetails}
                    selectedVariant={selectedVariant}
                    setSelectedVariant={setSelectedVariant}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
                {PLAN_OPTIONS?.prices && (
                    <Box sx={{ width: '100%' }}>
                        <PriceDetails
                            productDetails={productDetails}
                            selectedVariant={selectedVariant}
                            isShown={PLAN_OPTIONS?.prices}
                        />
                    </Box>
                )}

                <Box sx={{ width: '100%' }}>
                    <ArticleDetails />
                </Box>
            </Box>

            <Box>
                <ActionSection
                    selectedVariant={selectedVariant}
                    isShown={PLAN_OPTIONS?.cart || PLAN_OPTIONS?.favorites}
                />
            </Box>
            {PLAN_OPTIONS.sizes && (
                <Box>
                    <SizesDetails productDetails={productDetails} isShown={PLAN_OPTIONS?.sizes} />
                </Box>
            )}

            <Box mb={2}>
                <DescriptionDetails productDetails={productDetails} />
            </Box>
        </Box>
    );
};

export default ModelDetails;
