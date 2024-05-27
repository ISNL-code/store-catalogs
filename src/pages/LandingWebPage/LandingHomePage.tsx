import Grid from '@mui/material/Unstable_Grid2';
import Hero from './Hero';
import { useOutletContext } from 'react-router-dom';
import { LandingContextInterface } from 'types';
import { Color, Colors } from 'colors';
import CallBackButton from 'components/atoms/Buttons/CallBackButton';
import { LANDING_ROUTE } from 'constants/routes';
import MessageButton from 'components/atoms/Buttons/MessageButton';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';

const LandingHomePage = () => {
    const { handleOpenDialog }: LandingContextInterface = useOutletContext();

    return (
        <>
            <CallBackButton path={LANDING_ROUTE?.contacts()} />
            <MessageButton action={() => handleOpenDialog(DialogWindowType?.QUESTION)} />
            <Grid xs={12} container sx={{ width: '100%', overflow: 'hidden' }}>
                <Grid xs={12} sx={{ background: '#4990ec' }}>
                    <Hero />
                </Grid>
            </Grid>
        </>
    );
};

export default LandingHomePage;
