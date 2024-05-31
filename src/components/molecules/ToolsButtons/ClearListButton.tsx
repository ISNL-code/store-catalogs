import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import { Color, Colors } from 'constants/colors';
import StyledTooltip from '../StyledComponents/StyledTooltip';

interface FilterButtonInterface {
    isShown: boolean;
    action?: (event: any) => void;
    title: string;
    disabled?: boolean;
}

const ClearListButton = ({ isShown, action = () => {}, title, disabled = false }: FilterButtonInterface) => {
    if (isShown)
        return (
            <StyledTooltip title={title}>
                <IconButton
                    sx={{
                        height: 30,
                        width: 30,
                        backgroundColor: Colors?.WHITE,
                        mr: '2px',
                        border: '1px solid',
                        borderColor: disabled ? Colors?.GRAY_500 : Color.ERROR,
                    }}
                    onClick={action}
                    disabled={disabled}
                >
                    <DeleteForeverIcon fontSize="small" sx={{ color: disabled ? Colors?.GRAY_500 : Color.ERROR }} />
                </IconButton>
            </StyledTooltip>
        );
    return null;
};

export default ClearListButton;
