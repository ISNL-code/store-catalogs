import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { useOutletContext } from 'react-router-dom';
import { StoresContextInterface } from 'types';
import { useDevice } from 'hooks/useDevice';

const Hero = ({ setIsOpen, isOpen }) => {
    const { sx } = useDevice();
    const { string }: StoresContextInterface = useOutletContext();
    return (
        <Grid
            py={2}
            px={2}
            container
            xs={12}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                flexDirection: 'column',
                background:
                    'url(https://www.etisalat.ae/content/dam/etisalat/business-images/smb/2023/business-online/business-online-portal/self-registration-desktop.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPositionX: '100%',
                backgroundSize: 'cover',
            }}
        >
            <Grid
                mb={2}
                xs={12}
                sx={{
                    maxWidth: '300px',
                    backgroundColor: 'white',
                    opacity: 0.85,
                    borderRadius: 4,
                    boxShadow: '0 0 5px 3px #fff',
                }}
            >
                <Box
                    p={1}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant={'h1'} sx={{ lineHeight: 1.1, color: '#000' }}>
                        {string?.online_catalog}
                    </Typography>
                </Box>
            </Grid>
            <Grid
                xs={12}
                sx={{
                    maxWidth: '1560px',
                    backgroundColor: 'white',
                    opacity: 0.85,
                    borderRadius: 6,
                    boxShadow: '0 0 5px 3px #fff',
                }}
            >
                <Box
                    p={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant={sx ? 'h3' : 'h2'} sx={{ lineHeight: 1.1, color: '#000' }}>
                        {string?.hero_text}
                    </Typography>
                    <Button
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                        sx={{ mt: 2 }}
                        variant="contained"
                        size="large"
                    >
                        {string?.request}
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Hero;
