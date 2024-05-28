import { useRef, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';

interface PaginationButtonProps {
    setCurrentPage: (page: number) => void;
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

    useEffect(() => {
        if (!totalPages) return;
        if (!sx) return;

        const currentRef = ref.current; // Capture the current reference

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
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
        };

        if (currentRef) {
            observerRef.current = new IntersectionObserver(handleIntersection, {
                rootMargin: '1000px',
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
        };
    }, [activateAutomatically, loading, productsList, page, totalPages, sx, setCurrentPage]);

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
