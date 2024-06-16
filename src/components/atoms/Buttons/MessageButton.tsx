import { Box, Fab, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import { Color } from 'constants/colors';

const MessageButton = ({ action }) => {
    const { string }: any = useOutletContext();
    const { sx, s } = useDevice();

    return (
        <Box
            sx={{
                width: sx ? 'fit-content' : 125,
                zIndex: 2000,
                position: 'fixed',
                right: sx ? '72px' : '36px',
                bottom: sx ? 80 : 62,
                border: sx ? 'none' : '1px solid',
                borderColor: Color.PRIMARY,
                backgroundColor: sx ? 'none' : Color.PRIMARY,
                opacity: 0.75,
                borderRadius: 50,
                p: s ? 0 : 0.25,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
            }}
            onClick={() => {
                action();
            }}
        >
            {!sx && (
                <Typography
                    m={0.4}
                    sx={{ fontSize: 11, fontWeight: '700', color: '#fff', minWidth: 80, textAlign: 'center' }}
                >
                    {string?.message}
                </Typography>
            )}
            <Fab
                size={sx ? 'medium' : 'small'}
                sx={{
                    p: 2,
                    backgroundColor: '#ffffff',
                    border: '1px solid #ccc',
                    boxShadow: `0 0 5px 2px ${Color.PRIMARY}`,
                    maxHeight: sx ? 45 : 30,
                    maxWidth: sx ? 45 : 30,
                }}
            >
                <SendIcon color="primary" fontSize={sx ? 'medium' : 'small'} />
            </Fab>
        </Box>
    );
};

export default MessageButton;
