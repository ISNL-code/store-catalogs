import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import { Colors } from 'colors';
import { useOutletContext } from 'react-router-dom';
import StyledTooltip from '../StyledComponents/StyledTooltip';

interface FilterButtonInterface {
    isShown: boolean;
    action?: (event: any) => void;
}

const ClearListButton = ({ isShown, action = () => {} }: FilterButtonInterface) => {
    const { string }: any = useOutletContext();
    if (isShown)
        return (
            <StyledTooltip title={string?.clear_favorites}>
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
