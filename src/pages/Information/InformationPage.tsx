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
                    <Grid container xs={12} sx={{ width: '100%', display: 'flex', gap: 0.5 }}>
                        <Grid>
                            <Button sx={{ background: '#fff', px: 1 }} variant="outlined">
                                {string?.about}
                            </Button>
                        </Grid>
                        <Grid>
                            <Button sx={{ background: '#fff', px: 1 }} variant="outlined">
                                {string?.payments}
                            </Button>
                        </Grid>

                        <Grid>
                            <Button sx={{ background: '#fff', px: 1 }} variant="outlined">
                                {string?.delivery}
                            </Button>
                        </Grid>
                        <Grid>
                            <Button sx={{ background: '#fff', px: 1 }} variant="outlined">
                                {string?.return_exchange}
                            </Button>
                        </Grid>
                        <Grid>
                            <Button sx={{ background: '#fff', px: 1 }} variant="outlined">
                                FAQ
                            </Button>
                        </Grid>
                        <Grid>
                            <Button sx={{ background: '#fff', px: 1 }} variant="outlined">
                                {string?.privacy_policy}
                            </Button>
                        </Grid>
                    </Grid>
                )}
            />
            <Grid mt={5} xs={12} container>
                ...Loading
            </Grid>
        </>
    );
};

export default InformationPage;
