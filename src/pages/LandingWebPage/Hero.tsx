import { Box, Typography, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Colors } from 'constants/colors';
import { useDevice } from 'hooks/useDevice';
import Slides from './Slides';

const Hero = () => {
    const { sx } = useDevice();
    return (
        <Grid container className="LandingHero" justifyContent="center" alignItems="center">
            <Grid
                px={sx ? 4 : 0}
                pl={sx ? 4 : 25}
                pb={sx ? 2 : 0}
                pt={sx ? 4 : 0}
                xs={sx ? 12 : 6}
                sx={{ height: '100%' }}
            >
                <Typography sx={{ fontSize: sx ? 36 : 42, fontWeight: 700, lineHeight: 1 }} color={Colors?.WHITE}>
                    Создание и продвижение интернет каталогов.
                </Typography>
                <Typography
                    color={Colors?.WHITE}
                    sx={{ mt: 2, fontSize: sx ? 20 : 24, fontWeight: sx ? 40 : 500, lineHeight: 1.1 }}
                >
                    <b>Sales Nest</b> предлагает полный спектр услуг по созданию и продвижению интернет-каталогов, чтобы
                    помочь вам привлекать больше клиентов и увеличивать продажи
                </Typography>
                <Box sx={{ width: '100%', display: 'flex' }}>
                    <Box mt={5} display="flex" sx={{ alignItems: 'center', width: sx ? '100%' : '95%' }}>
                        <TextField
                            value={''}
                            onChange={() => {}}
                            sx={{
                                backgroundColor: Colors?.WHITE,
                                borderRadius: '12px 0 0 12px',
                                height: sx ? 40 : 50,
                                flexGrow: 1,
                                '& .MuiInputBase-root': {
                                    height: sx ? 40 : 50,
                                    paddingRight: 0,
                                    borderRadius: '12px 0 0 12px',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderRadius: '12px 0 0 12px',
                                },
                            }}
                            size="small"
                            inputProps={{ sx: { height: sx ? 40 : 50, padding: '0 10px', fontSize: sx ? 12 : 20 } }}
                            placeholder="Введите ваш номер телефона или @mail"
                            fullWidth
                            variant="outlined"
                        />
                        <Button
                            color="info"
                            variant="contained"
                            sx={{
                                height: sx ? 40 : 50,
                                borderRadius: '0 12px 12px 0',
                                minWidth: sx ? 120 : 160,
                                fontSize: sx ? 12 : 16,
                                whiteSpace: 'nowrap',
                                fontWeight: 700,
                            }}
                        >
                            Создать каталог
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={sx ? 12 : 6} p={sx ? 0 : 2}>
                <Slides />
            </Grid>
        </Grid>
    );
};

export default Hero;
