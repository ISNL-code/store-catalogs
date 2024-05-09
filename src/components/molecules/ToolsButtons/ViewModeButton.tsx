import { Box, IconButton } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import GridOnIcon from '@mui/icons-material/GridOn';
import { useOutletContext } from 'react-router-dom';
import { CatalogContextInterface } from 'types';
import { ViewModeType } from 'constants/types';
import { Colors } from 'colors';

const ViewModeButton = () => {
    const { setViewMode, viewMode }: CatalogContextInterface = useOutletContext();

    return (
        <Box
            sx={{
                height: 30,
                backgroundColor: '#fff',
                mr: '2px',
                border: '1px solid rgba(0, 0, 0, 0.120)',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 2,
                overflow: 'hidden',
            }}
        >
            <IconButton
                sx={{
                    border: '1px solid rgba(0, 0, 0, 0.120)',
                    borderRadius: 0,
                    height: 30,
                    color: viewMode === ViewModeType?.card ? Colors?.BLUE : '',
                }}
                onClick={() => {
                    setViewMode(ViewModeType?.card);
                }}
            >
                <ViewModuleIcon fontSize="small" />
            </IconButton>
            <IconButton
                sx={{
                    border: '1px solid rgba(0, 0, 0, 0.120)',
                    borderRadius: 0,
                    height: 30,
                    color: viewMode === ViewModeType?.grid_l ? Colors?.BLUE : '',
                }}
                onClick={() => {
                    setViewMode(ViewModeType?.grid_l);
                }}
            >
                <CalendarViewMonthIcon fontSize="small" />
            </IconButton>
            <IconButton
                sx={{
                    border: '1px solid rgba(0, 0, 0, 0.120)',
                    borderRadius: 0,
                    height: 30,
                    color: viewMode === ViewModeType?.grid_m ? Colors?.BLUE : '',
                }}
                onClick={() => {
                    setViewMode(ViewModeType?.grid_m);
                }}
            >
                <GridOnIcon fontSize="small" />
            </IconButton>
        </Box>
    );
};

export default ViewModeButton;
