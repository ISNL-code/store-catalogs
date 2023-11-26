import { Box, Divider, IconButton, Typography } from '@mui/material';
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

const ContactsPage = () => {
    const { contacts }: any = useOutletContext();
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
            {contacts.managers.map(manager => {
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
                            {(manager.first_name || manager.last_name) && (
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
                                        {manager.first_name && (
                                            <Typography variant={sm ? 'h3' : 'h2'} sx={{ fontWeight: 700 }}>
                                                {manager.first_name}
                                            </Typography>
                                        )}
                                        {manager.last_name && (
                                            <Typography variant={sm ? 'h3' : 'h2'} sx={{ fontWeight: 700 }}>
                                                {manager.last_name}
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
                                    borderTop:
                                        sm && (manager.first_name || manager.last_name) ? '1px solid #ccc' : 'none',
                                    borderLeft:
                                        !sm && (manager.first_name || manager.last_name) ? '1px solid #ccc' : 'none',
                                }}
                            >
                                {manager.phone_number && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: sm ? 1.5 : 2,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Box>
                                            <a href={`tel:${manager.phone_number}`} target="_blank" rel="noreferrer">
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
                                        <Typography variant={sm ? 'h4' : 'h3'}>{manager.phone_number}</Typography>
                                    </Box>
                                )}

                                {manager.whatsapp && (
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
                                                href={`https://wa.me/${manager.whatsapp}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Box sx={{ width: 35, height: 35 }}>{WhatsAppIcon()}</Box>
                                            </a>
                                        </Box>
                                        <Typography variant={sm ? 'h4' : 'h3'}>{manager.whatsapp}</Typography>
                                    </Box>
                                )}
                                {manager.viber && (
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
                                                href={`viber://chat?number=${manager.viber.replaceAll('+', '%2B')}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Box sx={{ width: 35, height: 35 }}>{ViberIcon()}</Box>
                                            </a>
                                        </Box>
                                        <Typography variant={sm ? 'h4' : 'h3'}>{manager.viber}</Typography>
                                    </Box>
                                )}
                                {manager.telegram && (
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
                                                href={`https://t.me/@${manager.telegram}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Box sx={{ width: 35, height: 35 }}>{TelegramIcon()}</Box>
                                            </a>
                                        </Box>
                                        <Typography variant={sm ? 'h4' : 'h3'}>@{manager.telegram}</Typography>
                                    </Box>
                                )}
                                {manager.email && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: sm ? 1.5 : 2,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Box>
                                            <a href={`mailto:${manager.email}`} target="_blank" rel="noreferrer">
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
                                        <Typography variant={sm ? 'h4' : 'h3'}>{manager.email}</Typography>
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
