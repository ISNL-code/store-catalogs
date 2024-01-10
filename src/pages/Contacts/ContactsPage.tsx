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
import { CatalogContextInterface } from 'types';

const ContactsPage = () => {
    const { store }: CatalogContextInterface = useOutletContext();
    const { sm, mx } = useDevice();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    }, []);

    return (
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            <InstrumentalSubHeader StartSlot={() => <BackButton nav={-1} action={() => {}} />} />
            {store?.managers.map(manager => {
                return (
                    <Box
                        my={1}
                        sx={{
                            backgroundColor: '#fcfcfc',
                            borderRadius: 6,
                            overflow: 'hidden',
                            boxShadow: '0 0 12px 1px #00000037',
                            transition: 'all .3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.01)',
                            },
                            width: sm ? '100%' : 'fit-content',
                        }}
                    >
                        <Box
                            py={3.5}
                            px={2.5}
                            sx={{
                                display: 'flex',
                                gap: sm ? 0.5 : 2,
                                flexDirection: sm ? 'column' : 'row',
                                justifyContent: 'start',
                                alignItems: sm ? 'center' : 'start',
                            }}
                        >
                            {(manager.firstName || manager.lastName) && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: sm ? 1.5 : 2,
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            justifyContent: 'center',
                                            width: '100%',
                                            height: '35px',
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
                                    </Box>
                                </Box>
                            )}

                            <Box
                                pt={sm ? 1 : 0}
                                pl={sm ? 0 : 2}
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'start',
                                    gap: sm ? 1.5 : 2,
                                    justifyContent: 'start',
                                    flexDirection: 'column',
                                    borderTop: sm && (manager.lastName || manager.lastName) ? '1px solid #ccc' : 'none',
                                    borderLeft:
                                        !sm && (manager.lastName || manager.lastName) ? '1px solid #ccc' : 'none',
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
                                            <a href={`tel:${manager.contacts?.phone}`} target="_blank" rel="noreferrer">
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
                                        <Typography variant={sm ? 'h4' : 'h3'}>{manager.contacts?.phone}</Typography>
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
                                        <Typography variant={sm ? 'h4' : 'h3'}>{manager.contacts?.whatsapp}</Typography>
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
                                        <Typography variant={sm ? 'h4' : 'h3'}>{manager.contacts?.viber}</Typography>
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
                                                href={`https://t.me/@${manager.contacts?.telegram}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Box sx={{ width: 35, height: 35 }}>{TelegramIcon()}</Box>
                                            </a>
                                        </Box>
                                        <Typography variant={sm ? 'h4' : 'h3'}>
                                            @{manager.contacts?.telegram}
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
                            </Box>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};

export default ContactsPage;
