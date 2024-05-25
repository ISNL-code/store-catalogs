import { useRef, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';

const PaginationButton = ({
    setCurrentPage,
    totalCount,
    loading,
    productsList,
    page,
    totalPages,
    activateAutomatically,
}) => {
    const { sx } = useDevice();
    const { string }: any = useOutletContext();
    const ref = useRef(null);

    useEffect(() => {
        if (!sx) return;
        const timer = setTimeout(() => {
            if (ref.current) {
                const observer = new IntersectionObserver(
                    entries => {
                        const [entry] = entries;
                        if (
                            entry.isIntersecting &&
                            activateAutomatically &&
                            !loading &&
                            productsList?.length &&
                            page < totalPages
                        ) {
                            setCurrentPage(page + 1);
                        }
                    },
                    {
                        rootMargin: '1000px',
                        threshold: 1,
                    }
                );
                observer.observe(ref.current);

                return () => {
                    observer.unobserve(ref?.current as any);
                };
            }
        }, 250);

        return () => clearTimeout(timer);
    }, [activateAutomatically, loading, productsList, page, totalPages, sx]); // eslint-disable-line

    if (productsList?.length < 12) return null;

    return (
        <Box
            ref={ref}
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 0.5,
            }}
        >
            <Typography sx={{ color: '#999', fontSize: 14 }}>
                {productsList?.length} {string?.out_of} {totalCount} {string?.shown}
            </Typography>
            <Button
                sx={{
                    width: 200,
                    color: loading ? '#ccc' : '#fff',
                    borderColor: loading ? '#ccc' : '',
                    cursor: loading ? 'default' : 'pointer',
                    '&:hover': {
                        color: loading ? '#ccc' : '',
                        borderColor: loading ? '#ccc' : '',
                    },
                    fontSize: '14px',
                    textTransform: 'capitalize',
                }}
                variant="contained"
                onClick={() => setCurrentPage(page + 1)}
                color="secondary"
                disabled={!productsList?.length || totalPages === page + 1}
            >
                {loading ? string?.loading + '...' : string?.load_more}
            </Button>
        </Box>
    );
};

export default PaginationButton;
