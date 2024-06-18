import { Box, Typography } from '@mui/material';
import StyledTooltip from 'components/molecules/StyledComponents/StyledTooltip';

const CardDescriptionComponent = ({ title }: { title: string }) => {
    return (
        <Box sx={{ flexShrink: 1, flexBasis: 'auto', overflow: 'hidden' }}>
            <StyledTooltip title={title} position="bottom-end">
                <Box
                    sx={{
                        height: 27,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        cursor: 'default',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: 12,
                            fontWeight: 500,
                            whiteSpace: 'normal',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
            </StyledTooltip>
        </Box>
    );
};

export default CardDescriptionComponent;
