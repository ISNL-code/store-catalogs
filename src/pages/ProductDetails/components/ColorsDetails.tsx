import { Box } from '@mui/material';
import ColorIndicatorButton from 'components/atoms/ColorIndicatorButton/ColorIndicatorButton';
import DetailsSection from 'components/atoms/Sections/DetailsSection';
import { STORE_ROUTE } from 'router/routes';
import { useDevice } from 'hooks/useDevice';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { ProductDataInterface, ProductVariantInterface } from 'types/app_models';

interface Props {
    productDetails: ProductDataInterface;
    selectedVariant: ProductVariantInterface;
    setSelectedVariant: Dispatch<SetStateAction<any>>;
}

const ColorsDetails = ({ productDetails, selectedVariant, setSelectedVariant }: Props) => {
    const { STORE_CODE } = STORE_CONFIG;
    const navigate = useNavigate();
    const { string }: any = useOutletContext();
    const { sm } = useDevice();

    return (
        <DetailsSection label={string?.colors}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    gap: sm ? 0.75 : 1.25,
                    flexWrap: 'wrap',
                }}
            >
                {productDetails?.variants?.map((variant, idx) => {
                    const selected = variant?.variantId === selectedVariant?.variantId;
                    return (
                        <Box key={idx}>
                            <ColorIndicatorButton
                                action={e => {
                                    e.stopPropagation();
                                    setSelectedVariant(
                                        productDetails?.variants?.find(
                                            product => product.productId === variant?.productId
                                        )
                                    );
                                    navigate(STORE_ROUTE?.product(STORE_CODE, productDetails?.id, variant?.variantSku));
                                }}
                                selected={selected}
                                color={variant.colorCode || ''}
                                size={sm ? 34 : 38}
                                withLabel
                                label={variant?.colorName || ''}
                            />
                        </Box>
                    );
                })}
            </Box>
        </DetailsSection>
    );
};

export default ColorsDetails;
