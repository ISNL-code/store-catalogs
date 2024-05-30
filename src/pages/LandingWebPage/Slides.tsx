import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import Slider from 'react-slick';

const Slides = () => {
    const { sm, sx } = useDevice();

    const SLIDES = [
        { desc: '002.png', mob: '102.jpg' },
        { desc: '01.png', mob: '001.png' },
        { desc: '1.png', mob: '11.png' },
        { desc: '030.png', mob: '0333.jpg' },
        { desc: '2.png', mob: '22.png' },
        { desc: '3.png', mob: '33.png' },
        { desc: '120.png', mob: '1200.jpg' },
        { desc: '6.png', mob: '66.png' },
        { desc: '7.png', mob: '77.png' },
        { desc: '8.png', mob: '88.png' },
        { desc: '9.png', mob: '99.png' },
    ];

    const settings = {
        fade: sx ? false : true,
        autoplay: true,
        autoplaySpeed: sx ? 3500 : 3000,
        arrows: false,
    };

    return (
        <Slider style={{ width: sx ? '100%' : '120%' }} touchThreshold={20} {...settings}>
            {SLIDES.map(el => (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <Grid
                        p={sx ? 8 : 0.5}
                        py={sx ? 1 : 0.5}
                        xs={12}
                        container
                        sx={{
                            display: 'flex',
                            gap: 1,
                            flexWrap: 'nowrap',
                            alignItems: 'flex-end',
                        }}
                    >
                        <Grid
                            xs={sx ? 12 : 2}
                            sx={{
                                boxShadow: '0 0 5px 2px #d3d3d3',
                                border: sx ? '10px solid #000' : '0.5vw solid #000',
                                borderRadius: sm ? '32px' : '16px',
                                background: `#000`,
                                overflow: 'hidden',
                                height: 'fit-content',
                                zIndex: 1,
                            }}
                            mr={-2}
                            mb={1}
                        >
                            <img style={{ width: '100%' }} src={require(`./img/${el.mob}`)} alt="" />
                        </Grid>
                        {!sx && (
                            <Grid
                                xs={sx ? 0 : 10}
                                sx={{
                                    border: '1vw solid #000',
                                    borderRadius: sm ? '12px' : '24px',
                                    background: `#fff`,
                                    overflow: 'hidden',
                                    height: 'fit-content',
                                    boxShadow: '0 0 5px 2px #d3d3d3',
                                }}
                            >
                                <Box sx={{ width: '100%' }}>
                                    <img style={{ width: '100%' }} src={require(`./img/${el.desc}`)} alt="" />
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            ))}
        </Slider>
    );
};

export default Slides;
