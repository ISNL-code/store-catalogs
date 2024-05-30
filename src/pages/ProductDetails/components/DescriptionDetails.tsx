import { Box, TextField } from '@mui/material';
import DetailsSection from 'components/atoms/Sections/DetailsSection';
import toast from 'react-hot-toast';
import { useOutletContext } from 'react-router-dom';
import { ProductDataInterface } from 'types/app_models';

interface Props {
    productDetails: ProductDataInterface;
}

const DescriptionDetails = ({ productDetails }: Props) => {
    const { string }: any = useOutletContext();

    const handleCopyToClipboard = () => {
        navigator.clipboard
            .writeText(productDetails?.description as string)
            .then(() => toast.success(string?.copied_to_clipboard));
    };

    return (
        <DetailsSection label={string?.description}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    gap: 0.75,
                    flexWrap: 'wrap',
                    overflow: 'hidden',
                }}
            >
                <Box
                    onClick={handleCopyToClipboard}
                    sx={{ position: 'absolute', width: '100%', height: '100%', cursor: 'copy', zIndex: 1 }}
                ></Box>
                <TextField
                    value={productDetails?.description}
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
                />
            </Box>
        </DetailsSection>
    );
};

export default DescriptionDetails;
