import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTextField = styled(TextField)<any>(({ disabled, shown }: { disabled: boolean; shown: boolean }) => ({
    label: {
        color: '#898B9B',
    },
    '.Mui-disabled input, .Mui-disabled textarea': {
        WebkitTextFillColor: 'black',
    },
    fieldset: {
        border: disabled && Boolean(!shown) ? 'none' : '1.25px solid rgba(0, 0, 0, 0.23)',
    },
}));
