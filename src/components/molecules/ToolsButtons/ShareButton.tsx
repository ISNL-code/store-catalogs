import IosShareIcon from '@mui/icons-material/IosShare';
import {
    TelegramShareButton,
    ViberShareButton,
    WhatsappShareButton,
    FacebookShareButton,
    EmailIcon,
} from 'react-share';
import { TelegramIcon, ViberIcon, WhatsappIcon, FacebookIcon, EmailShareButton } from 'react-share';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';

interface ShareButtonInterface {
    orientation?: 'up' | 'down';
    path: string;
    text: string;
    size?;
    color?;
    isShown: boolean;
}

const ShareButton = ({ orientation = 'up', path, text, size, color, isShown }: ShareButtonInterface) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    if (isShown)
        return (
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: orientation === 'down' ? 'column' : 'column-reverse',
                        position: 'relative',
                    }}
                    onMouseLeave={() => {
                        handleClose();
                    }}
                    onClick={() => setOpen(!open)}
                >
                    <Box>
                        <IconButton
                            size="small"
                            sx={{
                                border: color ? '1px solid rgba(0, 0, 0, 0.120)' : '1px solid #00000054',
                                backgroundColor: '#fff',
                                width: size || '28px',
                                height: size || '28px',
                            }}
                        >
                            <IosShareIcon sx={{ color: '#rgba(0, 0, 0, 0.54)', fontSize: 18 }} />
                        </IconButton>
                    </Box>

                    <Box
                        onMouseLeave={() => {
                            handleClose();
                        }}
                        pt={1}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.3,
                            height: open ? 260 : 0,
                            width: open ? 60 : 0,
                            transition: 'height 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                            overflow: 'hidden',
                            position: 'absolute',
                            top: orientation === 'down' ? 30 : -225,
                            left: -17,
                            zIndex: 1000,
                            cursor: 'default',
                        }}
                    >
                        {open && (
                            <>
                                <TelegramShareButton url={path} title={text}>
                                    <TelegramIcon size={36} round={true} />
                                </TelegramShareButton>

                                <ViberShareButton url={path} title={text}>
                                    <ViberIcon size={36} round={true} />
                                </ViberShareButton>

                                <WhatsappShareButton url={path} title={text}>
                                    <WhatsappIcon size={36} round={true} />
                                </WhatsappShareButton>

                                <FacebookShareButton url={path} title={text}>
                                    <FacebookIcon size={36} round={true} />
                                </FacebookShareButton>

                                <EmailShareButton url={path} title={text}>
                                    <EmailIcon size={36} round={true} />
                                </EmailShareButton>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        );
    return null;
};

export default ShareButton;
