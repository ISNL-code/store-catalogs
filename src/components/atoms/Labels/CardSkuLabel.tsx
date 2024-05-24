import { Box, Typography } from '@mui/material';
import StyledTooltip from 'components/molecules/StyledComponents/StyledTooltip';
import { useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Props {
    sku: string;
}
const CardSkuLabel = ({ sku }: Props) => {
    const { string }: any = useOutletContext();

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(sku).then(() => toast('Copied to clipboard!'));
    };

    return (
        <Box
            onClick={handleCopyToClipboard}
            px={1}
            sx={{
                border: '1px solid #ccc',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: '16px',
                justifyContent: 'center',
                flexGrow: 1,
                flexShrink: 0,
                maxWidth: 80,
                cursor: 'copy',
            }}
        >
            <StyledTooltip title={`${string?.vendor_code}: ${sku}`} position="left">
                <Typography
                    sx={{
                        color: 'gray',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: 11,
                    }}
                >
                    {sku}
                </Typography>
            </StyledTooltip>
        </Box>
    );
};

export default CardSkuLabel;
