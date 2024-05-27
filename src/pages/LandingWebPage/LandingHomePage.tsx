import Grid from '@mui/material/Unstable_Grid2';
import Hero from './Hero';
// import { useOutletContext } from 'react-router-dom';
// import { LandingContextInterface } from 'types';
import { Color } from 'colors';

const LandingHomePage = () => {
    // const {}: LandingContextInterface = useOutletContext();

    return (
        <Grid xs={12} container sx={{ width: '100%', overflow: 'hidden' }}>
            <Grid xs={12} sx={{ background: Color?.PRIMARY }}>
                <Hero />
            </Grid>
        </Grid>
    );
};

export default LandingHomePage;
