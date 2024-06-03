import { Box, Typography } from '@mui/material';
import StyledTooltip from 'components/molecules/StyledComponents/StyledTooltip';

const CardDescriptionComponent = ({ title }) => {
    return (
        <Box sx={{ flexShrink: 1, flexBasis: 'auto', overflow: 'hidden' }}>
            <StyledTooltip title={title} position="top-start">
                <Box
                    sx={{
                        height: 38, // Высота 2х строк в вашем случае
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
                            whiteSpace: 'normal', // Вернемся к обычному поведению переноса слов
                            overflow: 'hidden',
                            display: '-webkit-box', // Для поддержки Safari
                            WebkitLineClamp: 2, // Ограничение числа строк
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
