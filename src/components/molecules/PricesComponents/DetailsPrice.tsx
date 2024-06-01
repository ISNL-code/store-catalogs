import { STORE_CONFIG } from 'store_constants/stores_config';
import { StoreType } from 'store_constants/types';
import DetailsPriceDefault from './DetailsPriceDefault';
import DetailsPriceSales from './DetailsPriceSales';

interface Props {
    price: number;
    discountPrice: number;
}

const DetailsPrice = ({ price, discountPrice }: Props) => {
    const { OPTIONS } = STORE_CONFIG;
    const { STORE_TYPE } = OPTIONS;

    return (
        <>
            <>
                {Boolean(STORE_TYPE !== StoreType.sales) && <DetailsPriceDefault price={price} />}
                {Boolean(STORE_TYPE === StoreType.sales) && (
                    <DetailsPriceSales price={price} discountPrice={discountPrice} />
                )}
            </>
        </>
    );
};

export default DetailsPrice;
