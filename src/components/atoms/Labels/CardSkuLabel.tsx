import { Box, Typography } from '@mui/material';
import StyledTooltip from 'components/molecules/StyledComponents/StyledTooltip';
import { useOutletContext } from 'react-router-dom';

interface Props {
    sku: string;
}
const CardSkuLabel = ({ sku }: Props) => {
    const { string }: any = useOutletContext();
    return (
        <Box
            px={1}
            sx={{
                border: '1px solid #ccc',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: '16px',
                justifyContent: 'center',
            }}
        >
            <StyledTooltip title={`${string?.vendor_code}: ${sku}`} position="top">
                <Typography
                    sx={{
                        color: 'gray',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: 12,
                        cursor: 'default',
                    }}
                >
                    {sku}
                </Typography>
            </StyledTooltip>
        </Box>
    );
};

export default CardSkuLabel;
