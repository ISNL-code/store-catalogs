import CardPriceDefault from 'components/molecules/PricesComponents/CardPriceDefault';
import CardPriceSales from 'components/molecules/PricesComponents/CardPriceSales';

interface Props {
    currency: string;
    price?: number;
    originalPrice?: number;
    discountPrice?: number;
    discounted: boolean;
}

const CardPrice = ({ currency, originalPrice, price, discountPrice, discounted }: Props) => {
    return (
        <>
            <>
                {!discounted && price && <CardPriceDefault currency={currency} price={price} />}
                {discounted && discountPrice && price && (
                    <CardPriceSales currency={currency} originalPrice={originalPrice} discountPrice={discountPrice} />
                )}
            </>
        </>
    );
};

export default CardPrice;
