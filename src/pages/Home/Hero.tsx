import { Button, Fab, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { useOutletContext } from 'react-router-dom';
import { StoresContextInterface } from 'types';
import { useDevice } from 'hooks/useDevice';
import { useState } from 'react';
import AdsClickIcon from '@mui/icons-material/AdsClick';

const Hero = ({ setIsOpen, isOpen }) => {
    const { xxxs, xs, sm, slx, sx, m, mx, ls, l } = useDevice();
    const { string }: StoresContextInterface = useOutletContext();
    const [isOpenText, setIsOpenText] = useState(false);

    const getHeight = () => {
        if (xxxs) return 400;
        if (xs) return 370;
        if (sm) return 300;
        if (slx) return 200;
        if (sx) return 200;
        if (m) return 250;
        if (mx) return 230;
        if (l) return 200;

        return 'auto';
    };

    return (
        <>
            <Grid
                py={4}
                px={2}
                pt={0}
                container
                xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    flexDirection: 'column',
                    background: `linear-gradient(89.7deg, rgb(0, 0, 0) 50.7%, rgb(23, 65, 65) 88.8%);`,
                    width: '100%',
                }}
            >
                <Grid
                    xs={12}
                    mb={2}
                    container
                    ml={-2}
                    sx={{
                        width: '100vw',
                        display: 'flex',
                        justifyContent: 'center',
                        background: `linear-gradient(89.7deg, rgba(163, 163, 163, 0.281) 50.7%, rgba(255, 255, 255, 0.452) 88.8%);`,
                    }}
                >
                    <Grid
                        xs={12}
                        sx={{
                            borderRadius: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box
                            p={1}
                            px={5}
                            sx={{
                                maxWidth: 375,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                            }}
                        >
                            <Typography variant={'h1'} sx={{ lineHeight: 1.1, color: '#ffffff', textAlign: 'center' }}>
                                {string?.online_catalog_for_your_business}
                            </Typography>
                            <Fab
                                size="small"
                                color="warning"
                                sx={{ position: 'absolute', left: 15, top: 5 }}
                                onClick={() => setIsOpenText(!isOpenText)}
                            >
                                <AdsClickIcon sx={{ color: 'white', fontSize: 32 }} />
                            </Fab>
                        </Box>
                    </Grid>
                    <Grid
                        xs={12}
                        sx={{
                            height: isOpenText ? getHeight() : 0,
                            maxHeight: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            transition: 'height 500ms linear',
                        }}
                    >
                        <Box
                            p={3}
                            sx={{
                                maxWidth: 1600,
                            }}
                        >
                            <Typography
                                sx={{ lineHeight: 1.1, color: '#ccc', fontSize: sx ? 18 : 22, textAlign: 'center' }}
                            >
                                {string?.hero_text}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid
                    xs={12}
                    sx={{
                        display: 'flex',
                        maxWidth: 1600,
                        gap: 5,
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: '610px',

                            borderRadius: 6,
                        }}
                    >
                        <Box
                            px={3}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography sx={{ lineHeight: 1.1, color: '#fff', fontSize: sx ? 18 : 22 }}>
                                {string?.hero_text}
                            </Typography>
                            <Button
                                onClick={() => {
                                    setIsOpen(!isOpen);
                                }}
                                sx={{ mt: 4, width: 180, height: 40, fontSize: 18 }}
                                variant="contained"
                                size="large"
                            >
                                {string?.request}
                            </Button>
                        </Box>
                    </Box>
                    {!mx && (
                        <Box
                            sx={{
                                borderRadius: 8,
                                overflow: 'hidden',
                                height: '410px',
                                boxShadow: '0 0 8px 2px #ffffff',
                            }}
                        >
                            <img width="400px" src={require('./img/hero.png')} alt="" />
                        </Box>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default Hero;
