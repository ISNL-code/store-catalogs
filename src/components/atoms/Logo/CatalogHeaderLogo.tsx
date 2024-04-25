import { Box, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { useNavigate } from 'react-router-dom';

const CatalogHeaderLogo = () => {
    const { xs } = useDevice();
    const navigate = useNavigate();
    return (
        <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: xs ? 0.25 : 0.25 }}
            onClick={() => navigate('/')}
        >
            <Box sx={{ boxShadow: '0 0 5px 1px #414141c5', borderRadius: '50%', border: '2.2px solid #383838' }}>
                <Box
                    sx={{
                        width: xs ? 40 : 55,
                        height: xs ? 40 : 55,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    <img
                        src={require('assets/img/logo.png')}
                        style={{
                            width: xs ? 62 : 78,
                            height: xs ? 62 : 78,
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50.1%,-51.2%)',
                        }}
                        alt="logo"
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    pt: 0.3,
                    pb: -1.5,
                    display: 'flex',
                    gap: 0.05,
                    alignItems: 'center',
                    mt: 0.5,
                    px: 0.25,
                    position: 'relative',
                    mb: 0.5,
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 32,
                        fontWeight: 600,
                        color: '#161616',
                        textShadow: '#0000006a 0 0 2px',
                        mr: 0.1,
                        mt: 0.1,
                    }}
                >
                    A
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 32,
                        fontWeight: 500,
                        color: '#616161c6',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    L
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 32,
                        fontWeight: 500,
                        color: '#616161c6',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    B
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 32,
                        fontWeight: 500,
                        color: '#616161c6',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    E
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 32,
                        fontWeight: 500,
                        color: '#616161c6',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    R
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 32,
                        fontWeight: 500,
                        color: '#616161c6',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    T
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 32,
                        fontWeight: 500,
                        color: '#616161c6',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    O
                </Typography>
                <Typography
                    sx={{
                        ml: 1,
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 32,
                        fontWeight: 600,
                        color: '#161616',
                        textShadow: '#0000006a 0 0 2px',
                        mr: 0.1,
                        mt: 0.1,
                    }}
                >
                    B
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 32,
                        fontWeight: 500,
                        color: '#616161c6',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    I
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 32,
                        fontWeight: 500,
                        color: '#616161c6',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    N
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 32,
                        fontWeight: 500,
                        color: '#616161c6',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    I
                </Typography>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 1,
                        left: 0,
                        borderTop: '0.1px solid #272727',
                        width: '100%',
                        boxShadow: '0 0 2px 1px #7c7c7c',
                    }}
                ></Box>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: -3,
                        left: 0,
                        borderBottom: '0.1px solid #6d6d6d',
                        width: '100%',
                        boxShadow: '0 0 1px 1px #7c7c7c6f',
                    }}
                ></Box>
            </Box>
        </Box>
    );
};

export default CatalogHeaderLogo;
