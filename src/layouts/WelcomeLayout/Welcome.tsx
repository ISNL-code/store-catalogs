import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import WelcomeLogo from 'components/atoms/Logo/WelcomeLogo';
import { useNavigate } from 'react-router-dom';

export default function WelcomePage({ handleRedirect }) {
    const navigate = useNavigate();

    const redirectToStartPath = () => {
        const startPath = handleRedirect();
        navigate(startPath);
    };

    setTimeout(redirectToStartPath, 3000);

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
                <WelcomeLogo />
            </Box>
        </>
    );
}
