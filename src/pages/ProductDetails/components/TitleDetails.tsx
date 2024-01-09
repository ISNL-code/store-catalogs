import { Box, Divider, Typography } from '@mui/material';
import PromoTags from 'components/atoms/PromoTags/PromoTags';
import { useOutletContext } from 'react-router-dom';
import { CatalogContextInterface } from 'types';

const TitleDetails = ({ productDetails }) => {
    const { store }: CatalogContextInterface = useOutletContext();

    return (
        <>
            <Box
                mb={1}
                sx={{
                    width: '100%',
                    display: 'flex',
                    gap: 0.75,
                    flexWrap: 'no-wrap',
                    justifyContent: 'space-between',
                }}
            >
                <Typography>{productDetails?.title}</Typography>
                {store?.additionalStoreSettings?.promo && (
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {productDetails?.promo.map(el => (
                            <PromoTags key={el.id} value={el.code} size={15} selected={true} disabled={true} />
                        ))}
                    </Box>
                )}
            </Box>
            <Divider />
        </>
    );
};

export default TitleDetails;
