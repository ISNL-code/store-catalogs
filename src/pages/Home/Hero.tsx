import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { useOutletContext } from 'react-router-dom';
import { StoresContextInterface } from 'types';
import { useDevice } from 'hooks/useDevice';

const Hero = ({ setIsOpen, isOpen }) => {
    const { sx, mx } = useDevice();
    const { string }: StoresContextInterface = useOutletContext();
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
                        }}
                    >
                        <Box
                            p={1}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant={'h1'} sx={{ lineHeight: 1.1, color: '#ffffff', textAlign: 'center' }}>
                                {string?.online_catalog_for_your_business}
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
