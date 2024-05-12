import CardPriceDefault from 'components/molecules/PricesComponents/CardPriceDefault';
import CardPriceSales from 'components/molecules/PricesComponents/CardPriceSales';
import { STORE_CONFIG } from 'constants/stores_config';
import { StoreType } from 'constants/types';

interface Props {
    currency: string;
    price: string | number;
    discountPrice?: string | number | null;
}

const CardPrice = ({ currency, price, discountPrice = null }: Props) => {
    const { OPTIONS } = STORE_CONFIG;
    const {
        CURRENCY_MULTIPLICATION,
        CUSTOM_CURRENCY,
        SALE_PRICE_MULTIPLICATION,
        STORE_TYPE,
        MAIN_PRICE_MULTIPLICATION,
    } = OPTIONS;
    return (
        <>
            <>
                {Boolean(STORE_TYPE !== StoreType.sales) && (
                    <CardPriceDefault
                        currency={CUSTOM_CURRENCY || currency}
                        price={Number(price) * MAIN_PRICE_MULTIPLICATION * CURRENCY_MULTIPLICATION}
                    />
                )}
                {Boolean(STORE_TYPE === StoreType.sales) && (
                    <CardPriceSales
                        currency={CUSTOM_CURRENCY || currency}
                        price={Number(price) * MAIN_PRICE_MULTIPLICATION * CURRENCY_MULTIPLICATION}
                        discountPrice={Number(discountPrice) * SALE_PRICE_MULTIPLICATION * CURRENCY_MULTIPLICATION}
                    />
                )}
            </>
        </>
    );
};

export default CardPrice;
