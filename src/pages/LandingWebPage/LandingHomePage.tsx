import Grid from '@mui/material/Unstable_Grid2';
import Hero from './Hero';
import { useOutletContext } from 'react-router-dom';
import { LandingContextInterface } from 'types';
import { useDevice } from 'hooks/useDevice';
import { Color } from 'colors';

const LandingHomePage = () => {
    const { appXPadding }: LandingContextInterface = useOutletContext();
    const { sx } = useDevice();

    return (
        <Grid xs={12} container>
            <Grid xs={12} py={4} px={sx ? 2 : 40} sx={{ background: Color?.PRIMARY }}>
                <Hero />
            </Grid>
        </Grid>
    );
};

export default LandingHomePage;
