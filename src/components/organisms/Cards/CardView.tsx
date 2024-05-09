import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import Grid from '@mui/material/Unstable_Grid2';
import { Colors } from 'colors';

const CardView = ({
    SliderComponent,
    CardDetails,
    CardDecoration,
    opacity,
    handleBodyPadding,
    handleCardSpacings,
    ...rest
}) => {
    const cardRef = useRef<HTMLElement>(null);
    const { setScrollPosition }: any = useOutletContext();
    const { s, sx, mx, l } = useDevice();

    const getGridValue = () => {
        if (s) return 12;
        if (sx) return 6;
        if (mx) return 4;
        if (l) return 3;
        return 2.4;
    };

    useEffect(() => {
        handleBodyPadding(sx ? 2 : 4);
        handleCardSpacings(2);
    }, [sx]); // eslint-disable-line

    return (
        <Grid xs={getGridValue()} sx={{ opacity: opacity ? 1 : 0, transition: 'all 250ms linear' }} {...rest}>
            <Box
                ref={cardRef}
                sx={{
                    boxShadow: Colors?.SHADOW,
                    borderRadius: 4,
                    width: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
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

export default CardView;
