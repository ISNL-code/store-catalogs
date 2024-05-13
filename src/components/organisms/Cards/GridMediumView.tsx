import { Box } from '@mui/material';
import { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import Grid from '@mui/material/Unstable_Grid2';
import { Colors } from 'colors';

const GridMediumView = ({ SliderComponent, CardDetails, CardDecoration, opacity, ...rest }) => {
    const cardRef = useRef<HTMLElement>(null);
    const { setScrollPosition }: any = useOutletContext();
    const { s, sx, mx, m, ls } = useDevice();

    const getGridValue = () => {
        if (s) return 6;
        if (sx) return 4;
        if (m) return 3;
        if (mx) return 2.4;
        if (ls) return 2;
        return 1.71;
    };

    return (
        <Grid container xs={getGridValue()} sx={{ opacity: opacity ? 1 : 0 }} {...rest}>
            <Box
                ref={cardRef}
                sx={{
                    position: 'sticky',
                    backgroundColor: Colors?.GRAY_100,
                    border: '0.25px solid',
                    borderColor: Colors?.GRAY_500,
                    width: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
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

export default GridMediumView;
