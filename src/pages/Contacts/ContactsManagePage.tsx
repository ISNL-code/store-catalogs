import { Box, IconButton, Typography } from '@mui/material';
import { TelegramIcon } from 'assets/svg/telega.js';
import { ViberIcon } from 'assets/svg/Viber_icon-icons.com_66792.js';
import { WhatsAppIcon } from 'assets/svg/whatsapp.js';
import { useOutletContext } from 'react-router-dom';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import { useEffect } from 'react';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import BackButton from 'components/atoms/Buttons/BackButton';
import { useDevice } from 'hooks/useDevice';
import { CatalogContextInterface } from 'types/outlet_context_models';
import Grid from '@mui/material/Unstable_Grid2';
import CardItem from 'components/atoms/Sections/CardItem';
import { scrollPage } from 'utils/scrollPage';
import { STORE_CONFIG } from 'store_constants/stores_config';

const ContactsManagePage = () => {
    const { MANAGERS } = STORE_CONFIG;
    const { string, footerMenuHeight, appXPadding }: CatalogContextInterface = useOutletContext();
    const { sm, sx } = useDevice();

    useEffect(() => {
        scrollPage(0);
    }, []);

    return (
        <Box p={sx ? 2 : appXPadding} sx={{ pb: `${footerMenuHeight}px` }}>
            <InstrumentalSubHeader StartSlot={() => <BackButton />} />

            {MANAGERS?.map((manager, idx) => {
                return (
                    <Grid key={idx} container xs={12} my={2}>
                        <CardItem>
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
                                {manager.firstName && (
                                    <Typography variant={sm ? 'h3' : 'h2'} sx={{ fontWeight: 700 }}>
                                        {manager.firstName}
                                    </Typography>
                                )}
                                {manager.lastName && (
                                    <Typography variant={sm ? 'h3' : 'h2'} sx={{ fontWeight: 700 }}>
                                        {manager.lastName}
                                    </Typography>
                                )}
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
                                    {manager.contacts?.phone && (
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
                                                    href={`tel:${manager.contacts?.phone}`}
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
                                                        <CallIcon color="inherit" fontSize="small" />
                                                    </IconButton>
                                                </a>
                                            </Box>
                                            <Typography variant={sm ? 'h4' : 'h3'}>
                                                {manager.contacts?.phone}
                                            </Typography>
                                        </Box>
                                    )}
                                    {manager.contacts?.whatsapp && (
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
                                                    href={`https://wa.me/${manager.contacts?.whatsapp}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <Box sx={{ width: 35, height: 35 }}>{WhatsAppIcon()}</Box>
                                                </a>
                                            </Box>
                                            <Typography variant={sm ? 'h4' : 'h3'}>
                                                {manager.contacts?.whatsapp}
                                            </Typography>
                                        </Box>
                                    )}
                                    {manager.contacts?.viber && (
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
                                                    href={`viber://chat?number=${manager.contacts?.viber.replaceAll(
                                                        '+',
                                                        '%2B'
                                                    )}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <Box sx={{ width: 35, height: 35 }}>{ViberIcon()}</Box>
                                                </a>
                                            </Box>
                                            <Typography variant={sm ? 'h4' : 'h3'}>
                                                {manager.contacts?.viber}
                                            </Typography>
                                        </Box>
                                    )}
                                    {manager.contacts?.telegram && (
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
                                                    href={`https://t.me/${manager.contacts?.telegram}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <Box sx={{ width: 35, height: 35 }}>{TelegramIcon()}</Box>
                                                </a>
                                            </Box>
                                            <Typography variant={sm ? 'h4' : 'h3'}>
                                                @{manager.contacts?.telegram?.replaceAll('https://t.me/', '')}
                                            </Typography>
                                        </Box>
                                    )}
                                    {manager.contacts?.emailAddress && (
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
                                                    href={`mailto:${manager.contacts?.emailAddress}`}
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
                                            <Typography variant={sm ? 'h4' : 'h3'}>
                                                {manager.contacts?.emailAddress}
                                            </Typography>
                                        </Box>
                                    )}
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

export default ContactsManagePage;
