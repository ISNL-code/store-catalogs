import { Box, TextField } from '@mui/material';
import DetailsSection from 'components/atoms/Sections/DetailsSection';
import { useOutletContext } from 'react-router-dom';

const DescriptionDetails = ({ productDetails }) => {
    const { string }: any = useOutletContext();

    return (
        <DetailsSection label={string?.description}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    gap: 0.75,
                    flexWrap: 'wrap',
                }}
            >
                <TextField
                    value={productDetails?.details}
                    disabled
                    size="small"
                    fullWidth
                    sx={{
                        '& label': {
                            color: '#898B9B',
                        },
                        div: {
                            textTransform: 'capitalize',
                        },
                        fieldset: {
                            border: 'none',
                        },
                        '.Mui-disabled input, .Mui-disabled textarea': {
                            WebkitTextFillColor: 'black',
                            fontSize: 14,
                            fontWeight: 400,
                        },
                        '.MuiInputBase-root': { p: 0 },
                    }}
                    multiline
                    minRows={2}
                />
            </Box>
        </DetailsSection>
    );
};

export default DescriptionDetails;
