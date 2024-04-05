import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import { StoresContextInterface } from 'types';
import { useOutletContext } from 'react-router-dom';
import Stores from 'pages/Stores/Stores';
import Marquee from 'react-fast-marquee';
import { useState } from 'react';

const Examples = () => {
    const [storesDetails, setStoresDetails] = useState(false);
    const { string }: StoresContextInterface = useOutletContext();
    const { sx } = useDevice();

    return (
        <>
            <Grid
                xs={12}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: sx ? 'flex-start' : 'center',
                    borderTop: '1px solid #ccc',
                    backgroundColor: '#f5f5f5',
                }}
            >
                <Box
                    px={2}
                    sx={{
                        width: '100%',
                        maxWidth: 1600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box px={2} py={0.5} sx={{ width: 'fit-content', border: '1px dashed #ccc', borderTop: 'none' }}>
                        <Typography sx={{ fontSize: 22, fontWeight: 500 }}>{string?.examples}</Typography>
                    </Box>
                    <Button
                        size="medium"
                        onClick={() => setStoresDetails(!storesDetails)}
                        variant="contained"
                        sx={{ ml: 'auto' }}
                    >
                        {string?.show_all}
                    </Button>
                </Box>
            </Grid>
            <Grid
                pb={2}
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f5f5f5' }}
                md={12}
                container
            >
                {!storesDetails ? (
                    <Box sx={{ width: '100%', backgroundColor: '#f5f5f5', minHeight: 275 }}>
                        <Marquee style={{ display: 'flex' }} loop={0} speed={75}>
                            <Stores details={false} />
                        </Marquee>
                    </Box>
                ) : (
                    <Grid p={1} container xs={12} sx={{ width: '100%', maxWidth: 1600, backgroundColor: '#f5f5f5' }}>
                        <Stores details />
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default Examples;
