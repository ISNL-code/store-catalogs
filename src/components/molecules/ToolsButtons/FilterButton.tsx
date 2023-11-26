import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton } from '@mui/material';

interface FilterButtonInterface {
    isShown: boolean;
    action?: (event: any) => void;
}

const FilterButton = ({ isShown, action = () => {} }: FilterButtonInterface) => {
    if (isShown)
        return (
            <IconButton
                sx={{
                    height: 30,
                    width: 30,
                    backgroundColor: '#fff',
                    mr: '2px',
                    border: '1px solid rgba(0, 0, 0, 0.120)',
                }}
                onClick={action}
            >
                <FilterListIcon fontSize="small" />
            </IconButton>
        );
    return null;
};

export default FilterButton;
