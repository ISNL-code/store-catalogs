import { Box, Typography } from '@mui/material';
import StyledTooltip from 'components/molecules/StyledComponents/StyledTooltip';

const CardDescriptionComponent = ({ title }) => {
    return (
        <Box sx={{ flexShrink: 1, flexBasis: 'auto', overflow: 'hidden' }}>
            <StyledTooltip title={title} position="top-start">
                <Typography
                    variant="h4"
                    sx={{
                        height: 19,
                        fontSize: 12,
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        cursor: 'default',
                    }}
                >
                    {title}
                </Typography>
            </StyledTooltip>
        </Box>
    );
};

export default CardDescriptionComponent;
