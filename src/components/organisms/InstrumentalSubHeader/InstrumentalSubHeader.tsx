import { Box } from '@mui/material';
import { Colors } from 'colors';
import { ReactNode } from 'react';
import { useOutletContext } from 'react-router-dom';
import { CatalogContextInterface } from 'types';

interface InstrumentalBarInterface {
    StartSlot?: () => ReactNode;
    CentralSlot?: () => ReactNode;
    EndSlot?: () => ReactNode;
    opacity?: number;
}

const InstrumentalSubHeader = ({ StartSlot, CentralSlot, EndSlot, opacity = 0.75 }: InstrumentalBarInterface) => {
    const { instrumentalBarHeight, headerHeight, instrumentalBarPadding }: CatalogContextInterface = useOutletContext();

    return (
        <Box
            px={instrumentalBarPadding}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: instrumentalBarHeight,
                width: '100%',
                position: 'fixed',
                top: headerHeight,
                left: 0,
                zIndex: 200,
                backgroundColor: Colors?.GRAY_300,
                opacity,
            }}
        >
            {StartSlot && <Box sx={{ width: '100%' }}>{StartSlot()}</Box>}
            {CentralSlot && (
                <Box sx={{ width: '100%', textAlign: 'center', position: 'fixed', left: 0, pointerEvents: 'none' }}>
                    {CentralSlot()}
                </Box>
            )}
            {EndSlot && (
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ ml: 'auto', display: 'flex', justifyContent: 'flex-end' }}>{EndSlot()}</Box>
                </Box>
            )}
        </Box>
    );
};

export default InstrumentalSubHeader;
