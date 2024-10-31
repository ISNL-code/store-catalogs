import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { STORE_CONFIG } from 'store_constants/stores_config';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ForwardIcon from '@mui/icons-material/Forward';
import { Color, Colors } from 'constants/colors';
import { useDevice } from 'hooks/useDevice';
import { useNavigate } from 'react-router-dom';

interface Props {
    code: string;
    title: string;
    withLink: boolean;
    status?: string | null;
}

const ErrorComponent = ({ code, title, withLink, status }: Props) => {
    const navigate = useNavigate();
    const { sx } = useDevice();
    const { STORE_NAME } = STORE_CONFIG;
    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: sx
                    ? `url(${require('assets/img/error_mob.webp')})`
                    : `url(${require('assets/img/error_desc.webp')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                left: 0,
                top: 0,
            }}
        >
            <Box
                py={3}
                px={4}
                sx={{
                    position: 'relative',
                    minWidth: 300,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    backgroundColor: Colors?.WHITE,
                    borderRadius: 4,
                    boxShadow: Colors?.SHADOW,
                    opacity: 0.97,
                }}
            >
                <ErrorOutlineIcon sx={{ position: 'absolute', top: 5, left: 5, color: Color?.ERROR, fontSize: 48 }} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        sx={{
                            m: 0,
                            fontSize: 90,
                            color: Colors?.GRAY,
                            backgroundColor: Colors?.WHITE,
                            fontWeight: 700,
                            lineHeight: 1,
                            '&:hover': { backgroundColor: Colors?.WHITE },
                        }}
                    >
                        {code}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', color: Color?.ERROR, gap: 1 }}>
                    <Typography
                        sx={{
                            fontSize: 18,
                            backgroundColor: Colors?.WHITE,
                            fontWeight: 700,
                            lineHeight: 1,
                            m: 0,
                            color: Colors?.GRAY,
                            gap: 1,
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
                <Box mt={1} sx={{ display: 'flex', color: Color?.ERROR, gap: 1 }}>
                    <Typography
                        sx={{
                            fontSize: 18,
                            backgroundColor: Colors?.WHITE,
                            fontWeight: 700,
                            lineHeight: 1,
                            m: 0,
                            color: Colors?.RED_300,
                            gap: 1,
                            textAlign: 'center',
                        }}
                    >
                        {status}
                    </Typography>
                </Box>
                {withLink && (
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => navigate('/')}
                        sx={{
                            fontSize: 16,
                            mt: 3,
                        }}
                        startIcon={<ForwardIcon />}
                    >
                        {STORE_NAME}
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default ErrorComponent;
