import DetailsSection from 'components/atoms/Sections/DetailsSection';
import DetailsPrice from 'components/molecules/PricesComponents/DetailsPrice';
import { useOutletContext } from 'react-router-dom';
import { ProductDataInterface, ProductVariantInterface } from 'types/app_models';

interface Props {
    productDetails: ProductDataInterface;
    selectedVariant: ProductVariantInterface;
    isShown: boolean;
}

const PriceDetails = ({ productDetails, isShown, selectedVariant }: Props) => {
    const { string, store }: any = useOutletContext();
    if (isShown)
        return (
            <DetailsSection label={string?.price}>
                <DetailsPrice
                    currency={store?.currency}
                    price={Number(productDetails?.originalPrice).toFixed(2)}
                    discountPrice={Number(selectedVariant?.price?.replace(/[^0-9.]/g, '')).toFixed(2)}
                />
            </DetailsSection>
        );
    return null;
};

export default PriceDetails;
