import { cloneElement, useState } from 'react';
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
        { icon: <TelegramIcon size={35} round />, name: 'Telegram', component: TelegramShareButton },
        { icon: <WhatsappIcon size={35} round />, name: 'WhatsApp', component: WhatsappShareButton },
        { icon: <EmailIcon size={35} round />, name: 'Email', component: EmailShareButton },
    ];

    if (!isShown) return null;

    return (
        <Box>
            <Box
                sx={{
                    position: 'relative',
                    width: 30,
                    height: 30,
                }}
            >
                <SpeedDial
                    direction={direction}
                    ariaLabel="Share options"
                    icon={
                        <SpeedDialIcon
                            icon={<IosShareIcon sx={{ color: Colors?.WHITE, fontSize: 16, mt: 0.25 }} />}
                            openIcon={
                                <IosShareIcon
                                    sx={{ transform: 'scaleY(-1)', color: Colors?.WHITE, fontSize: 16, mt: 0.25 }}
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
                    {actions.map((action, index) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={cloneElement(action.icon, { size: 38 })} // Reduce icon size
                            tooltipTitle={action.name}
                            onClick={() =>
                                window.open(`https://api.whatsapp.com/send? ${window.location.href}${path}`, '_blank')
                            }
                            sx={{
                                padding: 0, // Adjust padding for spacing
                                fontSize: '12px', // Adjust font size for text
                                mb: -0.5,
                                width: 42,
                                height: 42, // Set custom height to 25px
                            }}
                        />
                    ))}
                </SpeedDial>
            </Box>
        </Box>
    );
};

export default ShareButton;
