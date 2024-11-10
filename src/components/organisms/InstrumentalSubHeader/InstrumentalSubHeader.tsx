import { Box } from '@mui/material';
import { Colors } from 'constants/colors';
import { ReactNode } from 'react';
import { useOutletContext } from 'react-router-dom';
import { CatalogContextInterface, LandingContextInterface } from 'types/outlet_context_models';

interface InstrumentalBarInterface {
    StartSlot?: () => ReactNode;
    CentralSlot?: () => ReactNode;
    EndSlot?: () => ReactNode;
    opacity?: number;
}

const InstrumentalSubHeader = ({ StartSlot, EndSlot }: InstrumentalBarInterface) => {
    const {
        instrumentalBarHeight,
        instrumentalBarPadding,
        headerHeight,
    }: CatalogContextInterface | LandingContextInterface = useOutletContext();

    return (
        <Box
            className="HiddenScroll"
            px={instrumentalBarPadding}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: `${instrumentalBarHeight}px`,
                width: '100%',
                position: 'fixed',
                top: `${headerHeight}px`,
                left: 0,
                zIndex: 200,
                backgroundColor: Colors?.GRAY_300_75,
                overflow: 'visible',
            }}
        >
            {StartSlot ? <Box>{StartSlot()}</Box> : <Box></Box>}

            {EndSlot && (
                <Box>
                    <Box sx={{ ml: 'auto', display: 'flex', justifyContent: 'flex-end' }}>{EndSlot()}</Box>
                </Box>
            )}
        </Box>
    );
};

export default InstrumentalSubHeader;
