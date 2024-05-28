import React from 'react';
import { Box, Typography, TextField, Button, useTheme, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Colors } from 'colors';
import Slider from 'react-slick';
import { useDevice } from 'hooks/useDevice';
import Slides from './Slides';

const Advertizing: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { sx } = useDevice();

    const SLIDES = [
        { desc: '1', mob: '11', description: 'Описание 1' },
        { desc: '2', mob: '22', description: 'Описание 2' },
        { desc: '3', mob: '33', description: 'Описание 3' },
        // Добавьте больше слайдов по мере необходимости
    ];

    const settings = {
        fade: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <Grid container justifyContent="center" alignItems="center" className="LandingHero">
            <Grid xs={12} sm={6} sx={{ textAlign: isSmallScreen ? 'center' : 'left', p: isSmallScreen ? 2 : 25 }}>
                <Typography sx={{ fontSize: { xs: 28, sm: 42 }, fontWeight: 700, lineHeight: 1 }} color={Colors?.WHITE}>
                    Создание и продвижение интернет магазинов и каталогов.
                </Typography>
                <Typography
                    color={Colors?.WHITE}
                    sx={{ mt: 2, fontSize: { xs: 16, sm: 24 }, fontWeight: 500, lineHeight: 1 }}
                >
                    Sales Nest предлагает полный спектр услуг по созданию и продвижению интернет-каталогов, чтобы помочь
                    вам привлекать больше клиентов и увеличивать продажи.
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: isSmallScreen ? 'center' : 'flex-start',
                        mt: 3,
                    }}
                >
                    <Box mt={{ xs: 2, sm: 5 }} display="flex" sx={{ alignItems: 'center', width: '95%' }}>
                        <TextField
                            value={''}
                            onChange={() => {}}
                            sx={{
                                backgroundColor: Colors?.WHITE,
                                borderRadius: { xs: '12px', sm: '12px 0 0 12px' },
                                height: { xs: 40, sm: 50 },
                                flexGrow: 1,
                                '& .MuiInputBase-root': {
                                    height: { xs: 40, sm: 50 },
                                    paddingRight: 0,
                                    borderRadius: { xs: '12px', sm: '12px 0 0 12px' },
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderRadius: { xs: '12px', sm: '12px 0 0 12px' },
                                },
                            }}
                            size="small"
                            inputProps={{ sx: { height: { xs: 40, sm: 50 }, padding: '0 10px' } }}
                            placeholder="Введите ваш номер телефона или @mail"
                            fullWidth
                            variant="outlined"
                        />
                        <Button
                            color="info"
                            variant="contained"
                            sx={{
                                height: { xs: 40, sm: 50 },
                                borderRadius: { xs: '12px', sm: '0 12px 12px 0' },
                                minWidth: { xs: 100, sm: 160 },
                                color: Colors?.WHITE,
                                fontSize: { xs: 14, sm: 16 },
                                whiteSpace: 'nowrap',
                                mt: { xs: 2, sm: 0 },
                            }}
                        >
                            Создать каталог
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={12} sm={6} p={2}>
                <Slider {...settings}>
                    {SLIDES.map((slide, index) => (
                        <Box key={index} sx={{ textAlign: 'center' }}>
                            <img
                                src={require(`./img/${slide.desc}.png`)}
                                alt={`Slide ${index}`}
                                style={{ width: '100%' }}
                            />
                            <Typography>{slide.description}</Typography>
                        </Box>
                    ))}
                </Slider>
            </Grid>
        </Grid>
    );
};

export default Advertizing;
