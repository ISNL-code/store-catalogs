import { Box, Divider, Typography } from '@mui/material';
import PromoTags from 'components/atoms/PromoTags/PromoTags';
import SaleTag from 'components/atoms/PromoTags/SaleTag';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { StoreType } from 'store_constants/types';
import { ProductDataInterface, ProductVariantInterface } from 'types/app_models';

interface Props {
    productDetails: ProductDataInterface;
    selectedVariant: ProductVariantInterface;
}

const TitleDetails = ({ productDetails, selectedVariant }: Props) => {
    const { OPTIONS } = STORE_CONFIG;
    const { STORE_TYPE } = OPTIONS;

    return (
        <>
            <Box
                mb={1}
                sx={{
                    width: '100%',
                    display: 'flex',
                    gap: 0.75,
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                }}
            >
                <Typography>{productDetails?.name}</Typography>

                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {productDetails?.promoTags.map(el => (
                        <PromoTags key={el.id} value={el.name} disabled={true} code={el?.code} />
                    ))}
                    <Box>
                        {STORE_TYPE === StoreType.sales && (
                            <SaleTag price={productDetails?.originalPrice} discountPrice={selectedVariant?.price} />
                        )}
                    </Box>
                </Box>
            </Box>
            <Divider />
        </>
    );
};

export default TitleDetails;
