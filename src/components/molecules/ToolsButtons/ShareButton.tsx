import React, { useState } from 'react';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import {
    TelegramShareButton,
    TelegramIcon,
    WhatsappShareButton,
    WhatsappIcon,
    EmailShareButton,
    EmailIcon,
} from 'react-share';
import { Colors } from 'colors';

interface ShareButtonInterface {
    path: string;
    isShown: boolean;
    direction: 'up' | 'down' | 'left' | 'right';
}

const ShareButton = ({ path, isShown, direction }: ShareButtonInterface) => {
    const [open, setOpen] = useState(false);

    const actions = [
        {
            icon: (
                <TelegramShareButton url={path}>
                    <TelegramIcon size={40} round />
                </TelegramShareButton>
            ),
            name: 'Telegram',
        },
        {
            icon: (
                <WhatsappShareButton url={path}>
                    <WhatsappIcon size={40} round />
                </WhatsappShareButton>
            ),
            name: 'WhatsApp',
        },
        {
            icon: (
                <EmailShareButton url={path}>
                    <EmailIcon size={40} round />
                </EmailShareButton>
            ),
            name: 'Email',
        },
        {
            icon: (
                <EmailShareButton url={path}>
                    <EmailIcon size={40} round />
                </EmailShareButton>
            ),
            name: 'Email',
        },
    ];

    if (!isShown) return null;

    return (
        <Box>
            <Box sx={{ position: 'relative', width: 30, height: 30 }}>
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
                    onOpen={() => setOpen(true)}
                    open={open}
                    FabProps={{
                        color: 'secondary',
                        sx: {
                            width: 30,
                            height: 30,
                            minWidth: 30,
                            minHeight: 30,
                            boxShadow: 'none',
                        },
                    }}
                    sx={{
                        ...(direction === 'up' ? { bottom: 0 } : { top: 0 }),
                        left: '-50%',
                        position: 'absolute',
                        zIndex: 100,
                    }}
                >
                    {actions.map(action => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => setOpen(false)}
                            FabProps={{
                                color: 'secondary',
                                sx: {
                                    width: 30,
                                    height: 30,
                                    minWidth: 30,
                                    minHeight: 30,
                                    boxShadow: 'none',
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
