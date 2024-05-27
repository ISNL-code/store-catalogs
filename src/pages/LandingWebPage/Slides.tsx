import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import Slider from 'react-slick';
import { StoresContextInterface } from 'types';
import { useOutletContext } from 'react-router-dom';

const Slides = () => {
    const { string }: StoresContextInterface = useOutletContext();
    const { sm, sx } = useDevice();

    const SLIDES = [
        { desc: '1', mob: '11', description: string?.view_descr_1 },
        { desc: '2', mob: '22', description: string?.view_descr_2 },
        { desc: '3', mob: '33', description: string?.view_descr_3 },
        { desc: '6', mob: '66', description: string?.view_descr_6 },
        { desc: '7', mob: '77', description: string?.view_descr_7 },
        { desc: '8', mob: '88', description: string?.view_descr_8 },
        { desc: '9', mob: '99', description: string?.view_descr_9 },
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
                            <img style={{ width: '100%' }} src={require(`./img/${el.mob}.png`)} alt="" />
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
                                    <img style={{ width: '100%' }} src={require(`./img/${el.desc}.png`)} alt="" />
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
