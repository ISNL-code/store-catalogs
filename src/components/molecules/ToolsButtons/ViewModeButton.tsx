import { Box, IconButton } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import GridOnIcon from '@mui/icons-material/GridOn';
import { useOutletContext } from 'react-router-dom';
import { CatalogContextInterface } from 'types';
import { ViewModeType } from 'constants/types';
import { Colors } from 'colors';
import { GrGrid } from 'react-icons/gr';
import { RiLayoutGridLine } from 'react-icons/ri';
import { BsGrid } from 'react-icons/bs';
import { IoMdGrid } from 'react-icons/io';
import { RxGrid } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import { STORE_CONFIG } from 'constants/stores_config';

const ViewModeButton = () => {
    const { setViewMode, viewMode }: CatalogContextInterface = useOutletContext();
    const [mode, setMode] = useState<ViewModeType>(viewMode);

    useEffect(() => {
        setViewMode(mode);
    }, [mode]);

    return (
        <>
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
                        color: mode === ViewModeType?.card ? Colors?.BLUE : '',
                        backgroundColor: mode === ViewModeType?.card ? Colors.GRAY_100 : '',
                        boxShadow: mode === ViewModeType?.card ? 'inset 0 0 4px 0.25px #9b9b9b96' : '',
                    }}
                    onClick={() => {
                        setMode(ViewModeType?.card);
                    }}
                >
                    <BsGrid fontSize={18} />
                </IconButton>
                <IconButton
                    sx={{
                        border: '1px solid rgba(0, 0, 0, 0.120)',
                        borderRadius: 0,
                        height: 30,
                        color: mode === ViewModeType?.grid_l ? Colors?.BLUE : '',
                        backgroundColor: mode === ViewModeType?.grid_l ? Colors.GRAY_100 : '',
                        boxShadow: mode === ViewModeType?.grid_l ? 'inset 0 0 4px 0.25px #9b9b9b96' : '',
                    }}
                    onClick={() => {
                        setMode(ViewModeType?.grid_l);
                    }}
                >
                    <RxGrid fontSize={18} />
                </IconButton>
                <IconButton
                    sx={{
                        border: '1px solid rgba(0, 0, 0, 0.120)',
                        borderRadius: 0,
                        height: 30,
                        color: mode === ViewModeType?.grid_m ? Colors?.BLUE : '',
                        backgroundColor: mode === ViewModeType?.grid_m ? Colors.GRAY_100 : '',
                        boxShadow: mode === ViewModeType?.grid_m ? 'inset 0 0 4px 0.25px #9b9b9b96' : '',
                    }}
                    onClick={() => {
                        setMode(ViewModeType?.grid_m);
                    }}
                >
                    <IoMdGrid fontSize={20} />
                </IconButton>
            </Box>
        </>
    );
};

export default ViewModeButton;
