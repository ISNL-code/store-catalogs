import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import Grid from '@mui/material/Unstable_Grid2';
import { Colors } from 'constants/colors';

const GridMediumView = ({ SliderComponent, CardDetails, CardDecoration, ...rest }) => {
    const cardRef = useRef<HTMLElement>(null);
    const { setScrollPosition }: any = useOutletContext();
    const { sm, sx, mx, m, l } = useDevice();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 100);
    }, []);

    const getGridValue = () => {
        if (sm) return 6;
        if (sx) return 4;
        if (m) return 3;
        if (mx) return 2.4;
        if (l) return 2;
        return 1.71;
    };

    return (
        <Grid
            // container
            xs={getGridValue()}
            sx={{
                opacity: loading ? 0 : 1,
            }}
            {...rest}
        >
            <Box
                ref={cardRef}
                sx={{
                    position: 'sticky',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: Colors?.GRAY_100,
                    border: '1px solid',
                    borderColor: Colors?.GRAY_100,
                    borderRadius: 4,
                    overflow: 'hidden',
                }}
                onClick={() => {
                    setScrollPosition(cardRef?.current?.offsetTop);
                }}
            >
                <Box sx={{ position: 'relative' }}>
                    {CardDecoration()}
                    {SliderComponent()}
                </Box>
                {CardDetails()}
            </Box>
        </Grid>
    );
};

export default GridMediumView;
