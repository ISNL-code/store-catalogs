import Grid from '@mui/material/Unstable_Grid2';
import Hero from './Hero';
// import { useOutletContext } from 'react-router-dom';
// import { LandingContextInterface } from 'types';
import { Color, Colors } from 'colors';
import CallBackButton from 'components/atoms/Buttons/CallBackButton';
import { LANDING_ROUTE } from 'constants/routes';

const LandingHomePage = () => {
    // const {}: LandingContextInterface = useOutletContext();

    return (
        <>
            <CallBackButton path={LANDING_ROUTE?.contacts()} />
            <Grid xs={12} container sx={{ width: '100%', overflow: 'hidden' }}>
                <Grid xs={12} sx={{ background: '#4990ec' }}>
                    <Hero />
                </Grid>
            </Grid>
        </>
    );
};

export default LandingHomePage;
