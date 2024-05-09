import { Box, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { Colors } from 'colors';

const EmptyPage = ({ isShown = true }) => {
    const {
        string,
    }: {
        sortedStores: string;
        string: any;
        setScrollPosition;
        scrollPosition: number;
        instrumentalBarHeight: number;
        headerHeight: number;
        footerHeight: number;
        loadProducts;
    } = useOutletContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, []);

    if (loading) return <></>;

    if (isShown)
        return (
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    gap: 1,
                    flexGrow: 1,
                    height: 'calc(100vh  - 250px)',
                }}
            >
                <SearchIcon sx={{ fontSize: 100, color: Colors?.TEXT_GRAY }} />
                <Typography variant="h3" sx={{ color: Colors?.TEXT_GRAY }}>
                    {string?.nothing_was_found}
                </Typography>
            </Box>
        );
    return null;
};

export default EmptyPage;
