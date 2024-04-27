import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import { useOutletContext } from 'react-router-dom';

const InformationPage = () => {
    const { string }: any = useOutletContext();

    return (
        <>
            <InstrumentalSubHeader
                StartSlot={() => (
                    <Grid container xs={12} sx={{ width: '100%' }} spacing={0.5}>
                        <Grid>
                            <Button sx={{ background: '#fff' }} variant="outlined">
                                {string?.delivery}
                            </Button>
                        </Grid>
                        <Grid>
                            <Button sx={{ background: '#fff' }} variant="outlined">
                                {string?.payments}
                            </Button>
                        </Grid>

                        <Grid>
                            <Button sx={{ background: '#fff' }} variant="outlined">
                                {string?.additional}
                            </Button>
                        </Grid>
                    </Grid>
                )}
            />
            <Grid xs={12} container>
                ...Loading
            </Grid>
        </>
    );
};

export default InformationPage;
