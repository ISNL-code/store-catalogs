import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useDevice } from 'hooks/useDevice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WelcomePage({ handleRedirect }) {
    const { sx } = useDevice();
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate('/home/alberto_bini_europe');
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, []); // eslint-disable-line

    return (
        <>
            <CssBaseline />

            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    minWidth: '100vw',
                    minHeight: '90vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    className="WelcomeLogo"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        animation: `fadeIn 2200ms linear forwards`,
                        transformOrigin: 'center',
                        '@keyframes fadeIn': {
                            '0%': { transform: 'scaleY(0)' },
                            '30%': { transform: 'scaleY(1)' },
                            '75%': { transform: 'scaleY(1)', opacity: 1 },
                            '100%': { opacity: 0 },
                        },
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '1px solid #fff',
                            width: sx ? 70 : 100,
                            height: sx ? 70 : 100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img src={require('assets/img/logo.webp')} style={{ height: sx ? 70 : 100 }} alt="img" />
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: sx ? 30 : 48, fontWeight: 700, lineHeight: 1 }}>
                            SALES NEST
                        </Typography>
                        <Typography color="secondary" sx={{ fontSize: sx ? 34 : 54, fontWeight: 700, lineHeight: 1 }}>
                            CATALOGS
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
