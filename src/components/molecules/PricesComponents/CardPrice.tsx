import CardPriceDefault from 'components/molecules/PricesComponents/CardPriceDefault';
import CardPriceSales from 'components/molecules/PricesComponents/CardPriceSales';
import { useOutletContext } from 'react-router-dom';

interface Props {
    currency;
    price;
}

const CardPrice = ({ currency, price }: Props) => {
    const { store }: any = useOutletContext();

    return (
        <>
            <>
                {store?.storeType !== 'sales' && <CardPriceDefault currency={currency} price={price} />}
                {store?.storeType === 'sales' && <CardPriceSales currency={currency} price={price} />}
            </>
        </>
    );
};

export default CardPrice;
