import { Box, IconButton, Typography } from '@mui/material';
import { TelegramIcon } from 'assets/svg/telega.js';
import { ViberIcon } from 'assets/svg/Viber_icon-icons.com_66792.js';
import { WhatsAppIcon } from 'assets/svg/whatsapp.js';
import { useOutletContext } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import { useEffect } from 'react';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import BackButton from 'components/atoms/Buttons/BackButton';
import { useDevice } from 'hooks/useDevice';
import { CatalogContextInterface } from 'types';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Grid from '@mui/material/Unstable_Grid2';
import CardItem from 'components/atoms/Sections/CardItem';

const LandingRequestContacts = () => {
    const { string }: CatalogContextInterface = useOutletContext();
    const { sm } = useDevice();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    }, []);

    return (
        <Box p={4}>
            <InstrumentalSubHeader StartSlot={() => <BackButton nav={-1} action={() => {}} />} />

            {[''].map((_, idx) => {
                return (
                    <Grid key={idx} container xs={12} my={2}>
                        <CardItem withHover={false}>
                            <Grid
                                xs={12}
                                p={1}
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderBottom: '1px solid #00000013',
                                }}
                            >
                                <PersonIcon color="disabled" />

                                <Typography variant={sm ? 'h3' : 'h2'} sx={{ fontWeight: 700 }}>
                                    Sales Nest Manager
                                </Typography>
                            </Grid>
                            <Grid container xs={12} p={2}>
                                <Grid
                                    p={2}
                                    xs={12}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: sm ? 1.5 : 2,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Box>
                                            <a href={`tel:+380668652127`} target="_blank" rel="noreferrer">
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: '#fff',
                                                        border: '2px solid #646464',
                                                        color: '#000',
                                                    }}
                                                >
                                                    <CallIcon color="inherit" fontSize="small" />
                                                </IconButton>
                                            </a>
                                        </Box>
                                        <Typography variant={sm ? 'h4' : 'h3'}>+380668652127</Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: sm ? 1.5 : 2,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Box>
                                            <a href={`https://wa.me/+380665738771`} target="_blank" rel="noreferrer">
                                                <Box sx={{ width: 35, height: 35 }}>{WhatsAppIcon()}</Box>
                                            </a>
                                        </Box>
                                        <Typography variant={sm ? 'h4' : 'h3'}>+380665738771</Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: sm ? 1.5 : 2,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Box>
                                            <a
                                                href={`viber://chat?number=${'+380665738771'.replaceAll('+', '%2B')}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Box sx={{ width: 35, height: 35 }}>{ViberIcon()}</Box>
                                            </a>
                                        </Box>
                                        <Typography variant={sm ? 'h4' : 'h3'}>+380665738771</Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: sm ? 1.5 : 2,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Box>
                                            <a href={`https://t.me/@SNBussinessApp`} target="_blank" rel="noreferrer">
                                                <Box sx={{ width: 35, height: 35 }}>{TelegramIcon()}</Box>
                                            </a>
                                        </Box>
                                        <Typography variant={sm ? 'h4' : 'h3'}>
                                            @{'SNBussinessApp'.replaceAll('https://t.me/', '')}
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: sm ? 1.5 : 2,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Box>
                                            <a
                                                href={`mailto:dmytro.orgish88@gmail.com`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: '#fff',
                                                        border: '2px solid #646464',
                                                        color: '#000',
                                                    }}
                                                >
                                                    <AlternateEmailIcon color="inherit" fontSize="small" />
                                                </IconButton>
                                            </a>
                                        </Box>
                                        <Typography variant={sm ? 'h4' : 'h3'}>salesnest.info@gmail.com</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardItem>
                    </Grid>
                );
            })}
            <Box>
                <Grid xs={12} p={4} sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="h4" sx={{ py: 0.25, fontWeight: 400 }}>
                        {string?.call_back_messageA}
                    </Typography>
                    <Typography variant="h4" sx={{ py: 0.25, fontWeight: 700 }}>
                        {string?.call_back_messageB}
                    </Typography>
                    <Typography variant="h4" sx={{ py: 0.25, fontWeight: 400 }}>
                        {string?.call_back_messageC}
                    </Typography>
                </Grid>
            </Box>
        </Box>
    );
};

export default LandingRequestContacts;
