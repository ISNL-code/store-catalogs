import { Box } from '@mui/material';
import ColorIndicatorButton from 'components/atoms/ColorIndicatorButton/ColorIndicatorButton';
import DetailsSection from 'components/atoms/Sections/DetailsSection';
import { useDevice } from 'hooks/useDevice';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

const ColorsDetails = ({ productDetails, selectedVariant, setSelectedVariant }) => {
    const navigate = useNavigate();
    const { storeName, storeCode } = useParams();
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
                {productDetails?.variants?.map((model, idx) => {
                    const selected = model?.id === selectedVariant?.id;
                    return (
                        <Box key={idx}>
                            <ColorIndicatorButton
                                action={e => {
                                    e.stopPropagation();
                                    setSelectedVariant(
                                        productDetails?.variants?.find(product => product.id === model?.id)
                                    );
                                    navigate(
                                        `/catalog/${storeCode}/${storeName}/details/${
                                            productDetails?.id
                                        }/model/${model?.sku.replaceAll('/', '_')}`
                                    );
                                }}
                                selected={selected}
                                color={model.variation.optionValue.code}
                                size={sm ? 34 : 38}
                                withLabel
                                label={model.variation.optionValue.name}
                            />
                        </Box>
                    );
                })}
            </Box>
        </DetailsSection>
    );
};

export default ColorsDetails;
