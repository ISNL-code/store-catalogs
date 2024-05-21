import { Typography } from '@mui/material';
import StyledTooltip from 'components/molecules/StyledComponents/StyledTooltip';

const CardDescriptionComponent = ({ title }) => {
    return (
        <StyledTooltip title={title} position="top-start">
            <Typography
                variant="h4"
                sx={{
                    height: 19,
                    fontSize: 14,
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
    );
};

export default CardDescriptionComponent;
