import { Paper, Typography } from '@mui/material';
import { Color, Colors } from 'constants/colors';

const SaleTag = ({ price, discountPrice }) => {
    const discountPercentage = Math.floor(((price - discountPrice) / price) * 100);

    if (discountPercentage)
        return (
            <Paper
                sx={{
                    p: 0.1,
                    background: `linear-gradient(135deg, ${Color.ERROR} 50%, #e9ddcf) padding-box, linear-gradient(90deg, ${Colors.RED_300} 80%,${Colors.RED_300}) border-box`,
                    color: 'white',
                    display: 'inline-block',
                    borderRadius: 4,
                    width: 36,
                    textAlign: 'center',
                    border: `2px solid ${Color.ERROR}`,
                }}
            >
                <Typography style={{ fontWeight: 700, color: Colors?.WHITE, fontSize: 13 }}>
                    -{discountPercentage < 100 ? discountPercentage : 99}%
                </Typography>
            </Paper>
        );
    return null;
};

export default SaleTag;
