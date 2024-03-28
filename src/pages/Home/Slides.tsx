import { Box, Typography, IconButton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import Slider from 'react-slick';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
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

    function SamplePrevArrow(props) {
        const { onClick } = props;
        return (
            <IconButton
                onClick={e => {
                    e.stopPropagation();
                    onClick();
                }}
                sx={{
                    zIndex: 1000,
                    position: 'absolute',
                    bottom: sm ? '10%' : '50%',
                    left: '0',
                    backgroundColor: '#fff',
                    '&:hover': {
                        backgroundColor: '#fff',
                    },
                    border: '1px solid #ccc',
                }}
                size="small"
            >
                <ArrowLeftIcon />
            </IconButton>
        );
    }

    function SampleNextArrow(props) {
        const { onClick } = props;
        return (
            <IconButton
                onClick={e => {
                    e.stopPropagation();
                    onClick();
                }}
                sx={{
                    zIndex: 1000,
                    position: 'absolute',
                    bottom: sm ? '10%' : '50%',
                    right: '0',
                    backgroundColor: '#fff',
                    '&:hover': {
                        backgroundColor: '#fff',
                    },
                    border: '1px solid #ccc',
                }}
                size="small"
            >
                <ArrowRightIcon />
            </IconButton>
        );
    }

    return (
        <Box
            sx={{
                backgroundColor: '#f5f5f5',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Box
                px={2}
                sx={{
                    maxWidth: 1600,
                    width: '100%',
                }}
            >
                <Box p={1}>
                    <Typography sx={{ fontSize: 22, fontWeight: 500 }}>{string?.web_mob_view}</Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    borderBottom: '1px solid #ccc',
                }}
            >
                <Slider
                    nextArrow={<SampleNextArrow />}
                    prevArrow={<SamplePrevArrow />}
                    dots
                    arrows
                    style={{ maxWidth: 1200, width: '100vw' }}
                    touchThreshold={20}
                >
                    {SLIDES.map(el => (
                        <Box
                            pb={2}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                backgroundColor: '#f5f5f5',
                            }}
                        >
                            <Grid
                                p={1}
                                xs={12}
                                container
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    flexWrap: 'nowrap',
                                    alignItems: 'flex-end',
                                    // maxWidth: 1200,
                                }}
                            >
                                <Grid
                                    xs={2}
                                    sx={{
                                        boxShadow: '0 0 5px 2px #d3d3d3',
                                        border: '0.5vw solid #000',
                                        borderRadius: sm ? '8px' : '16px',
                                        background: `#000`,
                                        overflow: 'hidden',
                                        height: 'fit-content',
                                        zIndex: 1,
                                    }}
                                    mr={-2}
                                    mb={1}
                                >
                                    {/* <Box sx={{ width: '100%' }}> */}
                                    <img style={{ width: '100%' }} src={require(`./img/${el.mob}.png`)} alt="" />
                                    {/* </Box> */}
                                </Grid>
                                <Grid
                                    xs={10}
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
                            </Grid>
                            <Grid mt={-1} xs={12} sx={{ zIndex: 1, height: '100%' }}>
                                <Box
                                    p={2}
                                    sx={{
                                        width: '100%',

                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography
                                        variant={sx ? 'h4' : 'h3'}
                                        sx={{
                                            color: 'gray',
                                            textAlign: 'center',
                                            maxWidth: '90%',
                                            width: '1000px',
                                        }}
                                    >
                                        {el?.description}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Box>
                    ))}
                </Slider>
            </Box>
        </Box>
    );
};

export default Slides;
