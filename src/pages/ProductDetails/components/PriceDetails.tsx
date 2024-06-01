import DetailsSection from 'components/atoms/Sections/DetailsSection';
import DetailsPrice from 'components/molecules/PricesComponents/DetailsPrice';
import { useOutletContext } from 'react-router-dom';
import { ProductDataInterface, ProductVariantInterface } from 'types/app_models';
import { CatalogContextInterface } from 'types/outlet_context_models';

interface Props {
    productDetails: ProductDataInterface;
    selectedVariant: ProductVariantInterface;
    isShown: boolean;
}

const PriceDetails = ({ productDetails, isShown, selectedVariant }: Props) => {
    const { string }: CatalogContextInterface = useOutletContext();
    if (isShown)
        return (
            <DetailsSection label={string?.price}>
                <DetailsPrice price={productDetails.originalPrice} discountPrice={selectedVariant?.price} />
            </DetailsSection>
        );
    return null;
};

export default PriceDetails;
