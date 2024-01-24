import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { useOutletContext } from 'react-router-dom';

interface InstrumentalBarInterface {
    StartSlot?: () => ReactNode;
    CentralSlot?: () => ReactNode;
    EndSlot?: () => ReactNode;
}

const InstrumentalSubHeader = ({
    StartSlot = () => <></>,
    CentralSlot = () => <></>,
    EndSlot = () => <></>,
}: InstrumentalBarInterface) => {
    const {
        instrumentalBarHeight,
        headerHeight,
        appXPadding,
    }: { instrumentalBarHeight: number; headerHeight: number; appXPadding: number } = useOutletContext();

    return (
        <Box
            px={appXPadding}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: instrumentalBarHeight,
                width: '100%',
                position: 'fixed',
                top: headerHeight,
                left: 0,
                zIndex: 200,
                backgroundColor: '#cccccc3b',
            }}
        >
            <Box>{StartSlot()}</Box>
            <Box sx={{ width: '100%', textAlign: 'center', position: 'fixed', left: 0, pointerEvents: 'none' }}>
                {CentralSlot()}
            </Box>
            <Box>{EndSlot()}</Box>
        </Box>
    );
};

export default InstrumentalSubHeader;
