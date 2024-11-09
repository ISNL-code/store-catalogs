import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import Grid from '@mui/material/Unstable_Grid2';
import { Colors } from 'constants/colors';

const CardView = ({ SliderComponent, CardDetails, CardDecoration, opacity, ...rest }) => {
    const cardRef = useRef<HTMLElement>(null);
    const { setScrollPosition }: any = useOutletContext();
    const { sm, sx, mx, l } = useDevice();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 100);
    }, []);

    const getGridValue = () => {
        if (sm) return 12;
        if (sx) return 6;
        if (mx) return 4;
        if (l) return 3;
        return 2.4;
    };

    return (
        <Grid xs={getGridValue()} sx={{ opacity: loading ? 0 : 1 }} {...rest}>
            <Box
                ref={cardRef}
                sx={{
                    borderRadius: 4,
                    width: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: Colors?.GRAY_300,
                    border: '1px solid',
                    borderColor: Colors?.GRAY_300,
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

export default CardView;
