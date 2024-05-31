import { Box, IconButton } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { CatalogContextInterface } from 'types/outlet_context_models';
import { ViewModeType } from 'store_constants/types';
import { Color, Colors } from 'constants/colors';
import { BsGrid } from 'react-icons/bs';
import { IoMdGrid } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { DEFAULT_VALUES } from 'defaultData/default';

const ViewModeButton = () => {
    const { setViewMode, viewMode }: CatalogContextInterface = useOutletContext();
    const [mode, setMode] = useState<ViewModeType>(viewMode || DEFAULT_VALUES?.view_mode);

    useEffect(() => {
        setViewMode(mode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        color: mode === ViewModeType?.card ? Color.PRIMARY : '',
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
                        color: mode === ViewModeType?.grid_m ? Color.PRIMARY : '',
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
