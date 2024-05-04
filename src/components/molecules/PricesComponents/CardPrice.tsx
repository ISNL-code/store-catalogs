import CardPriceDefault from 'components/molecules/PricesComponents/CardPriceDefault';
import CardPriceSales from 'components/molecules/PricesComponents/CardPriceSales';
import {
    HARD_SET_CURRENCY,
    MAIN_PRICE_MULTIPLICATION,
    SALE_PRICE_MULTIPLICATION,
    STORE_TYPE,
} from 'constants/store_config_options';

interface Props {
    currency;
    price;
    discountPrice?;
}

const CardPrice = ({ currency, price, discountPrice = null }: Props) => {
    return (
        <>
            <>
                {STORE_TYPE !== 'sales' && (
                    <CardPriceDefault
                        currency={HARD_SET_CURRENCY || currency}
                        price={price * MAIN_PRICE_MULTIPLICATION}
                    />
                )}
                {STORE_TYPE === 'sales' && (
                    <CardPriceSales
                        currency={HARD_SET_CURRENCY || currency}
                        price={price * MAIN_PRICE_MULTIPLICATION}
                        discountPrice={discountPrice * SALE_PRICE_MULTIPLICATION}
                    />
                )}
            </>
        </>
    );
};

export default CardPrice;
