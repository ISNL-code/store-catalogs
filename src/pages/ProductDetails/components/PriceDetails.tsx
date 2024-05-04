import DetailsSection from 'components/atoms/Sections/DetailsSection';
import DetailsPrice from 'components/molecules/PricesComponents/DetailsPrice';
import { useOutletContext } from 'react-router-dom';

const PriceDetails = ({ productDetails, isShown }) => {
    const { string, store }: any = useOutletContext();

    if (isShown)
        return (
            <DetailsSection label={string?.price}>
                <DetailsPrice
                    currency={store?.currency}
                    price={Number(productDetails?.price?.replace('$', '')?.replace('UAH', '')?.replace('€', ''))}
                    discountPrice={Number(
                        productDetails?.price?.replace('$', '')?.replace('UAH', '')?.replace('€', '')
                    )}
                />
            </DetailsSection>
        );
    return null;
};

export default PriceDetails;
