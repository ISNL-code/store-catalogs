import { Box, Typography } from '@mui/material';
import { Colors } from 'constants/colors';
import { useOutletContext } from 'react-router-dom';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { CatalogContextInterface } from 'types/outlet_context_models';
import { map_currency_symbol } from 'utils/mappers/currency_symbol';

interface Props {
    price: number;
}

const DetailsPriceDefault = ({ price }: Props) => {
    const { store }: CatalogContextInterface = useOutletContext();
    const { OPTIONS } = STORE_CONFIG;
    const {
        SALE_PRICE_MULTIPLICATION,
        CURRENCY_MULTIPLICATION,
        MAIN_PRICE_MULTIPLICATION,
        CUSTOM_CURRENCY,
        RETAIL_PRICE_MULTIPLICATION,
    } = OPTIONS;

    return (
        <Box sx={{ display: 'flex' }}>
            <Typography sx={{ color: Colors?.GRAY_900, fontSize: 20 }}>
                {CUSTOM_CURRENCY || map_currency_symbol(store?.currency)}
                {parseFloat(
                    (
                        price *
                        SALE_PRICE_MULTIPLICATION *
                        CURRENCY_MULTIPLICATION *
                        MAIN_PRICE_MULTIPLICATION *
                        RETAIL_PRICE_MULTIPLICATION
                    ).toFixed(2)
                )}
            </Typography>
        </Box>
    );
};

export default DetailsPriceDefault;
