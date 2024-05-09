import { Box } from '@mui/material';
import { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import Grid from '@mui/material/Unstable_Grid2';
import { Colors } from 'colors';

const GridLargeView = ({ SliderComponent, CardDetails, CardDecoration, opacity }) => {
    const cardRef = useRef<HTMLElement>(null);
    const { setScrollPosition }: any = useOutletContext();
    const { s, sx, ls, l } = useDevice();

    const getGridValue = () => {
        if (s) return 12;
        if (sx) return 6;
        if (ls) return 4;
        if (l) return 3;
        return 2.4;
    };

    return (
        <Grid container xs={getGridValue()} sx={{ opacity: opacity ? 1 : 0, transition: 'all 500ms linear' }}>
            <Box
                ref={cardRef}
                sx={{
                    position: 'sticky',
                    backgroundColor: Colors?.GRAY_100,
                    border: s ? 'none' : '0.25px solid',
                    borderColor: Colors?.GRAY_500,
                    width: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onClick={() => {
                    setScrollPosition(cardRef?.current?.offsetTop);
                }}
            >
                {CardDecoration()}
                {SliderComponent()}
                {CardDetails()}
            </Box>
        </Grid>
    );
};

export default GridLargeView;
