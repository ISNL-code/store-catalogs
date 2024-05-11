import { Box, IconButton, Typography } from '@mui/material';
import DetailsSection from 'components/atoms/Sections/DetailsSection';
import SizesIndicatorButton from 'components/atoms/SizesIndicatorButton/SizesIndicatorButton';
import { useOutletContext } from 'react-router-dom';
import StraightenIcon from '@mui/icons-material/Straighten';
import { useDevice } from 'hooks/useDevice';
import { CatalogContextInterface } from 'types';
import { STORE_CONFIG } from 'constants/stores_config';

const SizesDetails = ({ productDetails, isShown }) => {
    const { OPTIONS } = STORE_CONFIG;
    const { PLAN_OPTIONS } = OPTIONS;
    const { string }: CatalogContextInterface = useOutletContext();
    const { sm } = useDevice();

    if (isShown)
        return (
            <>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <DetailsSection label={string?.sizes}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0.5 }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    gap: sm ? 0.5 : 0.75,
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                }}
                            >
                                {productDetails?.sizes?.length ? (
                                    productDetails?.sizes?.map(({ code, id, name }) => (
                                        <SizesIndicatorButton
                                            key={id}
                                            size={sm ? 34 : 38}
                                            selected={false}
                                            disabled={true}
                                            label={name || code}
                                        />
                                    ))
                                ) : (
                                    <Typography variant="h4" sx={{ color: 'red' }}>
                                        {string?.no_available_sizes}
                                    </Typography>
                                )}
                            </Box>
                            {PLAN_OPTIONS?.tableSizes && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 0.25,
                                        mt: 0.5,
                                    }}
                                >
                                    <IconButton
                                        onClick={() => {}}
                                        size="small"
                                        sx={{
                                            border: '1px solid #1976d2',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ color: '#1976d2', textTransform: 'uppercase' }}
                                        >
                                            {string?.sizes_table}
                                        </Typography>
                                        <StraightenIcon color="primary" fontSize="small" />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    </DetailsSection>
                </Box>
            </>
        );
    return null;
};

export default SizesDetails;
