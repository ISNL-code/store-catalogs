import { Box, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const EmptyPage = ({ isShown = true }) => {
    const {
        instrumentalBarHeight,
        headerHeight,
        footerHeight,
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

    if (isShown)
        return (
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    height: `calc(100vh - ${headerHeight}px - ${instrumentalBarHeight}px - ${footerHeight}px - 200px)`,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    gap: 1,
                }}
            >
                <SearchIcon sx={{ fontSize: 100 }} />
                <Typography variant="h3">{string?.nothing_was_found}</Typography>
            </Box>
        );
    return null;
};

export default EmptyPage;
