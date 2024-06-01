import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useDevice } from 'hooks/useDevice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
    const { sx } = useDevice();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/home');
        }, 2000);
    }, []); //eslint-disable-line

    return (
        <>
            <CssBaseline />

            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    minWidth: '100vw',
                    minHeight: '100vh',
                    backgroundImage: sx
                        ? `url(${require('assets/img/login_img_mob.webp')})`
                        : `url(${require('assets/img/login_img.webp')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></Box>
        </>
    );
}
