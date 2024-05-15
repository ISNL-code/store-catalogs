import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTextField = styled(TextField)<any>(() => ({
    label: {
        color: '#898B9B',
    },
    '.Mui-disabled input, .Mui-disabled textarea': {
        WebkitTextFillColor: 'black',
    },
}));
