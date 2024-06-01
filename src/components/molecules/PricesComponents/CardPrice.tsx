import CardPriceDefault from 'components/molecules/PricesComponents/CardPriceDefault';
import CardPriceSales from 'components/molecules/PricesComponents/CardPriceSales';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { StoreType } from 'store_constants/types';

interface Props {
    currency: string;
    price?: number;
    discountPrice?: number;
}

const CardPrice = ({ currency, price, discountPrice }: Props) => {
    const { OPTIONS } = STORE_CONFIG;
    const { STORE_TYPE } = OPTIONS;
    return (
        <>
            <>
                {Boolean(STORE_TYPE !== StoreType.sales) && price && (
                    <CardPriceDefault currency={currency} price={price} />
                )}
                {Boolean(STORE_TYPE === StoreType.sales) && discountPrice && price && (
                    <CardPriceSales currency={currency} price={price} discountPrice={discountPrice} />
                )}
            </>
        </>
    );
};

export default CardPrice;
