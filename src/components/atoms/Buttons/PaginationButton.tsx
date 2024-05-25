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
        const observer = new IntersectionObserver(
            entries => {
                const [entry] = entries;

                if (
                    entry.isIntersecting &&
                    activateAutomatically &&
                    sx &&
                    !loading &&
                    productsList?.length &&
                    page < totalPages
                ) {
                    setCurrentPage(page + 1);
                }
            },
            {
                rootMargin: '1000px 0px 0px',
                threshold: 0,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current); // eslint-disable-line
            }
        };
    }, [activateAutomatically]); // eslint-disable-line

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
