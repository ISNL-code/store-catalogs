import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import { Colors } from 'colors';
import StyledTooltip from '../StyledComponents/StyledTooltip';

interface FilterButtonInterface {
    isShown: boolean;
    action?: (event: any) => void;
    title: string;
}

const ClearListButton = ({ isShown, action = () => {}, title }: FilterButtonInterface) => {
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
                        borderColor: Colors?.RED,
                    }}
                    onClick={action}
                >
                    <DeleteForeverIcon fontSize="small" sx={{ color: Colors?.RED }} />
                </IconButton>
            </StyledTooltip>
        );
    return null;
};

export default ClearListButton;
