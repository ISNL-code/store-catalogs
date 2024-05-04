import {
    HARD_SET_CURRENCY,
    MAIN_PRICE_MULTIPLICATION,
    SALE_PRICE_MULTIPLICATION,
    STORE_TYPE,
} from 'constants/store_config_options';
import DetailsPriceDefault from './DetailsPriceDefault';
import DetailsPriceSales from './DetailsPriceSales';

interface Props {
    currency;
    price;
    discountPrice?;
}

const DetailsPrice = ({ currency, price, discountPrice = null }: Props) => {
    return (
        <>
            <>
                {Boolean(STORE_TYPE === 'wholesales' || STORE_TYPE === 'default') && (
                    <DetailsPriceDefault
                        currency={HARD_SET_CURRENCY || currency}
                        price={price * MAIN_PRICE_MULTIPLICATION}
                    />
                )}
                {Boolean(STORE_TYPE === 'sales') && (
                    <DetailsPriceSales
                        currency={HARD_SET_CURRENCY || currency}
                        price={price * MAIN_PRICE_MULTIPLICATION}
                        discountPrice={discountPrice * SALE_PRICE_MULTIPLICATION}
                    />
                )}
            </>
        </>
    );
};

export default DetailsPrice;
