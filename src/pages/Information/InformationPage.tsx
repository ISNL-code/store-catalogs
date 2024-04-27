import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';

const InformationPage = () => {
    const { string }: any = useOutletContext();

    const data = [
        { title: string?.info_title_1, text: string?.info_text_1 },
        { title: string?.info_title_2, text: string?.info_text_2 },
        { title: string?.info_title_3, text: string?.info_text_3 },
        { title: string?.info_title_4, text: string?.info_text_4 },
    ];

    return (
        <>
            <InstrumentalSubHeader
                StartSlot={() => (
                    <Grid container xs={12} sx={{ width: '100%', display: 'flex', gap: 0.5 }}>
                        <Grid>
                            <Button sx={{ background: '#fff', px: 1 }} variant="outlined">
                                {string?.about_store}
                            </Button>
                        </Grid>
                        <Grid>
                            <Button sx={{ background: '#fff', px: 1 }} variant="outlined">
                                {string?.payments_delivery}
                            </Button>
                        </Grid>
                        <Grid>
                            <Button sx={{ background: '#fff', px: 1 }} variant="outlined">
                                {string?.return_exchange}
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
            <Grid
                mt={5}
                xs={12}
                container
                sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
            >
                {data?.map(({ title, text }, idx) => (
                    <Grid key={idx} xs={12} container mb={3} sx={{ maxWidth: 1200 }}>
                        <Grid xs={12} sx={{ background: '#ececec7c', py: 0.75, mb: 1, textAlign: 'center' }}>
                            <Typography variant="h2" sx={{ lineHeight: 1 }}>
                                {title}
                            </Typography>
                        </Grid>

                        <Typography
                            sx={{ color: '#313131' }}
                            dangerouslySetInnerHTML={{ __html: text?.replace(/\n/g, '<br />') }}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default InformationPage;
