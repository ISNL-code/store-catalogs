import { useRef, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';

interface PaginationButtonProps {
    setCurrentPage: any;
    totalCount: number;
    loading: boolean;
    productsList: any[] | null;
    page: number;
    totalPages: number;
    activateAutomatically: boolean;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
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
    const ref = useRef<HTMLDivElement | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const timeoutRef = useRef<number | null>(null); // Ref to store the setTimeout id

    useEffect(() => {
        if (loading || !totalPages || !sx || page + 1 >= totalPages) return;
        const currentRef = ref.current;

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries;
            if (
                entry.isIntersecting &&
                activateAutomatically &&
                !loading &&
                productsList?.length &&
                page + 1 < totalPages &&
                totalPages &&
                totalCount
            ) {
                // Store the setTimeout id in the ref
                timeoutRef.current = window.setTimeout(() => {
                    setCurrentPage(page => page + 1);
                }, 300);
            }
        };

        if (currentRef) {
            observerRef.current = new IntersectionObserver(handleIntersection, {
                rootMargin: '1200px',
                threshold: 1,
            });
            observerRef.current.observe(currentRef);
        }

        return () => {
            if (observerRef.current && currentRef) {
                observerRef.current.unobserve(currentRef);
                observerRef.current.disconnect();
                observerRef.current = null;
            }
            // Clear the timeout when component is unmounted
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [setCurrentPage, totalCount, loading, productsList, page, totalPages, activateAutomatically]); // eslint-disable-line

    if (!totalCount) return null;

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
                    opacity: page + 1 >= totalPages ? 0.2 : 1,
                }}
                variant="contained"
                onClick={() => setCurrentPage(page + 1)}
                color="secondary"
                disabled={!productsList?.length || page + 1 >= totalPages || loading}
            >
                {loading ? string?.loading + '...' : string?.load_more}
            </Button>
        </Box>
    );
};

export default PaginationButton;
