import { Select, SelectProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledSelect = styled(Select)<SelectProps>(({ disabled }) => ({
    div: {
        textTransform: 'capitalize',
    },
    '.Mui-disabled': {
        WebkitTextFillColor: 'black !important',
    },
    svg: {
        display: disabled ? 'none' : 'initial',
    },
    fieldset: {
        border: disabled ? 'none' : '1.25px solid rgba(0, 0, 0, 0.23)',
    },
}));
