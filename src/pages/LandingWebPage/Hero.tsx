import { Box, Typography, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Colors } from 'colors';
import { useDevice } from 'hooks/useDevice';
import Slides from './Slides';

const Hero = () => {
    const { sx } = useDevice();
    return (
        <>
            <Grid xs={7}>
                <Typography sx={{ fontSize: 40, fontWeight: 700, lineHeight: 1 }} color={Colors?.WHITE}>
                    Создание и продвижение интернет магазинов и каталогов.
                </Typography>
                <Typography color={Colors?.WHITE} sx={{ mt: 2, fontSize: 24, fontWeight: 500, lineHeight: 1 }}>
                    Sales Nest предлагает полный спектр услуг по созданию и продвижению интернет-каталогов, чтобы помочь
                    вам привлекать больше клиентов и увеличивать продажи.
                </Typography>
                <Box mt={3} display="flex" width="100%" sx={{ alignItems: 'center' }}>
                    <TextField
                        value={''}
                        onChange={() => {}}
                        sx={{
                            backgroundColor: Colors?.WHITE,
                            borderRadius: '4px 0 0 4px',
                            height: 40,
                            flexGrow: 1,
                            '& .MuiInputBase-root': {
                                height: 40,
                                paddingRight: 0,
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                            },
                        }}
                        size="small"
                        inputProps={{ sx: { height: 40, padding: '0 10px' } }}
                        placeholder="Введите емейл"
                    />
                    <Button
                        color="success"
                        variant="contained"
                        sx={{
                            height: 40,
                            borderRadius: '0 4px 4px 0',
                            minWidth: 120,
                        }}
                    >
                        Заказать
                    </Button>
                </Box>
            </Grid>
            <Grid xs={6}>
                <Slides />
            </Grid>
        </>
    );
};

export default Hero;
