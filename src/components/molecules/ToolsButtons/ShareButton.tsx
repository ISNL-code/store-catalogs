import React, { useState } from 'react';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import { TelegramIcon, WhatsappIcon, ViberIcon, EmailIcon } from 'react-share';
import { shareOnTelegram, shareOnWhatsApp, shareOnViber, shareOnEmail } from 'utils/shareFunctions'; // You need to implement these
import { Colors } from 'constants/colors';

interface ShareButtonInterface {
    path: string;
    isShown: boolean;
    direction: 'up' | 'down' | 'left' | 'right';
    size: 'small' | 'large';
}

const ShareButton = ({ path, isShown, direction, size }: ShareButtonInterface) => {
    const [open, setOpen] = useState(false);

    const actions = [
        {
            icon: <TelegramIcon size={size === 'small' ? 32 : 45} round />,
            name: 'Telegram',
            onClick: () => shareOnTelegram(path),
        },
        {
            icon: <WhatsappIcon size={size === 'small' ? 32 : 45} round />,
            name: 'WhatsApp',
            onClick: () => shareOnWhatsApp(path),
        },
        {
            icon: <ViberIcon size={size === 'small' ? 32 : 45} round />,
            name: 'Viber',
            onClick: () => shareOnViber(path),
        },
        {
            icon: <EmailIcon size={size === 'small' ? 32 : 45} round />,
            name: 'Email',
            onClick: () => shareOnEmail(path),
        },
    ];

    if (!isShown) return null;

    return (
        <Box>
            <Box sx={{ position: 'relative', width: 28, height: 28 }}>
                <SpeedDial
                    direction={direction}
                    ariaLabel="Share options"
                    icon={
                        <SpeedDialIcon
                            icon={<IosShareIcon sx={{ color: Colors?.WHITE, fontSize: 18, mt: 0.25 }} />}
                            openIcon={
                                <IosShareIcon
                                    sx={{ transform: 'scaleY(-1)', color: Colors?.WHITE, fontSize: 18, mt: 0.25 }}
                                />
                            }
                        />
                    }
                    onClose={() => setOpen(false)}
                    onOpen={() => {
                        if ('share' in navigator) {
                            navigator.share({
                                url: path,
                                files: undefined,
                            });
                            return;
                        }
                        setOpen(true);
                    }}
                    open={open}
                    FabProps={{
                        color: 'secondary',
                        sx: {
                            width: 30,
                            height: 30,
                            minWidth: 30,
                            minHeight: 30,
                            boxShadow: 'none',
                            mt: direction === 'up' ? -0.5 : 0,
                        },
                    }}
                    sx={{
                        ...(direction === 'up' ? { bottom: 0 } : { top: 0 }),
                        left: size === 'small' ? '-55%' : '-75%',
                        position: 'absolute',
                        zIndex: 100,
                    }}
                >
                    {actions.map((action, idx) => (
                        <SpeedDialAction
                            key={idx}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => {
                                setOpen(false);
                                action.onClick();
                            }}
                            FabProps={{
                                color: 'secondary',
                                sx: {
                                    width: size === 'small' ? 32 : 45,
                                    height: size === 'small' ? 32 : 45,
                                    minWidth: size === 'small' ? 32 : 45,
                                    minHeight: size === 'small' ? 32 : 45,
                                    boxShadow: 'none',
                                    mb: direction === 'up' ? 0 : 0,
                                },
                            }}
                        />
                    ))}
                </SpeedDial>
            </Box>
        </Box>
    );
};

export default ShareButton;
