import Grid from '@mui/material/Unstable_Grid2';
import Hero from './Hero';
import { useOutletContext } from 'react-router-dom';
import { LandingContextInterface } from 'types';
import CallBackButton from 'components/atoms/Buttons/CallBackButton';
import { LANDING_ROUTE } from 'constants/routes';
import MessageButton from 'components/atoms/Buttons/MessageButton';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { Color, Colors } from 'colors';
import Advertizing from './Advertizing';
import CreateSteps from './CreateSteps';

const LandingHomePage = () => {
    const { handleOpenDialog, handleSetDialogState }: LandingContextInterface = useOutletContext();

    return (
        <>
            <CallBackButton path={LANDING_ROUTE?.contacts()} />
            <MessageButton
                action={() => {
                    handleSetDialogState({ note: 'Sales Nest' });
                    handleOpenDialog(DialogWindowType?.QUESTION);
                }}
            />
            <Grid xs={12} container sx={{ width: '100%', overflow: 'hidden' }}>
                <Grid xs={12} sx={{ background: Colors?.LIGHT_BLUE }}>
                    <Hero />
                </Grid>
                <Grid xs={12} sx={{ background: Colors?.WHITE }}>
                    <CreateSteps />
                </Grid>
                <Grid xs={12} sx={{ background: Color?.SECONDARY_LIGHT }}>
                    <Advertizing />
                </Grid>
            </Grid>
        </>
    );
};

export default LandingHomePage;
