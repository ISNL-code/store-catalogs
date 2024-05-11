import { Box, Typography } from '@mui/material';
import { STORE_CONFIG } from 'constants/stores_config';
import { useDevice } from 'hooks/useDevice';

const CatalogHeaderLogo = () => {
    const { WEB_HEAD_DATA } = STORE_CONFIG;
    const { STORE_LOGO } = WEB_HEAD_DATA;
    const { xs } = useDevice();
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: xs ? 0.25 : 0.25 }}>
            <Box sx={{ boxShadow: '0 0 5px 1px #414141c5', borderRadius: '50%', border: '2.2px solid #383838' }}>
                <Box
                    sx={{
                        width: xs ? 36 : 55,
                        height: xs ? 36 : 55,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    <img
                        src={require(`dataBase/images/logos/${STORE_LOGO}`)}
                        style={{
                            width: xs ? 58 : 78,
                            height: xs ? 58 : 78,
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
                    // borderBottom: '2px double #616161c6',
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
                        textShadow: '#000000 0 0 1.25px',
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
                        textShadow: '#000000 0 0 1.25px',
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
                        textShadow: '#000000 0 0 1.25px',
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
                        textShadow: '#000000 0 0 1.25px',
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
                        textShadow: '#000000 0 0 1.25px',
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
                        textShadow: '#000000 0 0 1.25px',
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
                        textShadow: '#000000 0 0 1.25px',
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
                        textShadow: '#000000 0 0 1.25px',
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
                        textShadow: '#000000 0 0 1.25px',
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
                        boxShadow: '0 0 2px #7c7c7c',
                    }}
                ></Box>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: -3,
                        left: 0,
                        borderBottom: '0.1px solid #6d6d6d',
                        width: '100%',
                        boxShadow: '0 0 1px  #7c7c7c6f',
                    }}
                ></Box>
            </Box>
        </Box>
    );
};

export default CatalogHeaderLogo;
