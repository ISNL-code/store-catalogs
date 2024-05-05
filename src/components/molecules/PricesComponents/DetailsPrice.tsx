import { STORE_CONFIG } from 'constants/stores_config';
import DetailsPriceDefault from './DetailsPriceDefault';
import DetailsPriceSales from './DetailsPriceSales';

interface Props {
    currency: string;
    price: string | number;
    discountPrice?: string | number | null;
}

const DetailsPrice = ({ currency, price, discountPrice = null }: Props) => {
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
                {Boolean(STORE_TYPE === 'wholesales' || STORE_TYPE === 'default') && (
                    <DetailsPriceDefault
                        currency={CUSTOM_CURRENCY || currency}
                        price={Number(price) * MAIN_PRICE_MULTIPLICATION * CURRENCY_MULTIPLICATION}
                    />
                )}
                {Boolean(STORE_TYPE === 'sales') && (
                    <DetailsPriceSales
                        currency={CUSTOM_CURRENCY || currency}
                        price={Number(price) * MAIN_PRICE_MULTIPLICATION * CURRENCY_MULTIPLICATION}
                        discountPrice={Number(discountPrice) * SALE_PRICE_MULTIPLICATION * CURRENCY_MULTIPLICATION}
                    />
                )}
            </>
        </>
    );
};

export default DetailsPrice;
