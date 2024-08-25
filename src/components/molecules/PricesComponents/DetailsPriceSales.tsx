import { Box, Typography } from '@mui/material';
import { Color, Colors } from 'constants/colors';
import { useOutletContext } from 'react-router-dom';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { CatalogContextInterface } from 'types/outlet_context_models';
import { map_currency_symbol } from 'utils/mappers/currency_symbol';

interface Props {
    originalPrice: number;
    discountPrice: number;
}

const DetailsPriceSales = ({ originalPrice, discountPrice }: Props) => {
    const { store }: CatalogContextInterface = useOutletContext();
    const { OPTIONS } = STORE_CONFIG;
    const {
        SALE_PRICE_MULTIPLICATION,
        CURRENCY_MULTIPLICATION,
        RETAIL_PRICE_MULTIPLICATION,
        MAIN_PRICE_MULTIPLICATION,
        CUSTOM_CURRENCY,
    } = OPTIONS;

    return (
        <>
            {originalPrice !== discountPrice ? (
                <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ color: Color.ERROR, fontSize: 20, fontWeight: 700 }}>
                        {CUSTOM_CURRENCY || map_currency_symbol(store?.currency)}
                        {parseFloat(
                            (
                                discountPrice *
                                SALE_PRICE_MULTIPLICATION *
                                CURRENCY_MULTIPLICATION *
                                RETAIL_PRICE_MULTIPLICATION
                            ).toFixed(2)
                        )}
                    </Typography>
                    /
                    <Typography sx={{ color: Colors?.GRAY_900, fontSize: 18, textDecoration: 'line-through' }}>
                        {CUSTOM_CURRENCY || map_currency_symbol(CUSTOM_CURRENCY || store?.currency)}
                        {parseFloat(
                            (
                                originalPrice *
                                RETAIL_PRICE_MULTIPLICATION *
                                CURRENCY_MULTIPLICATION *
                                MAIN_PRICE_MULTIPLICATION
                            ).toFixed(2)
                        )}
                    </Typography>
                </Box>
            ) : (
                <Typography sx={{ color: Colors?.GRAY_900, fontSize: 18 }}>
                    {CUSTOM_CURRENCY || map_currency_symbol(CUSTOM_CURRENCY || store?.currency)}
                    {parseFloat(
                        (
                            originalPrice *
                            RETAIL_PRICE_MULTIPLICATION *
                            CURRENCY_MULTIPLICATION *
                            MAIN_PRICE_MULTIPLICATION
                        ).toFixed(2)
                    )}
                </Typography>
            )}
        </>
    );
};

export default DetailsPriceSales;
