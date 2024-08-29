import DetailsPriceDefault from './DetailsPriceDefault';
import DetailsPriceSales from './DetailsPriceSales';

interface Props {
    price: number;
    discountPrice: number;
    originalPrice: number;
    discounted: boolean;
}

const DetailsPrice = ({ price, discountPrice, originalPrice, discounted }: Props) => {
    return (
        <>
            <>
                {!discounted && <DetailsPriceDefault price={price} />}
                {discounted && <DetailsPriceSales originalPrice={originalPrice} discountPrice={discountPrice} />}
            </>
        </>
    );
};

export default DetailsPrice;
