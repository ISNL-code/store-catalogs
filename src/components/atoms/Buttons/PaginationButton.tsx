import { Box, Button, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import Loader from '../Loader/Loader';

const PaginationButton = ({
    setCurrentPage,
    totalCount,
    loadProducts,
    productsList,
    page,
    totalPages,
    countPerPage,
}) => {
    const { string }: any = useOutletContext();
    const { sx } = useDevice();
    const ref = useRef(null);

    if (productsList?.length < 12) return null;

    return (
        <>
            {loadProducts && <Loader position="fixed" />}

            <Box
                mb={1}
                ref={ref}
                mt={sx ? 0 : 1}
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                <Typography sx={{ color: 'grey' }}>
                    {productsList?.length} {string?.out_of} {totalCount} {string?.shown}
                </Typography>

                <Button
                    sx={{
                        px: 2,
                        py: 1,
                        width: 200,
                        color: loadProducts ? '#ccc' : '',
                        borderColor: loadProducts ? '#ccc' : '',
                        cursor: loadProducts ? 'default' : 'pointer',
                        '&:hover': {
                            color: loadProducts ? '#ccc' : '',
                            borderColor: loadProducts ? '#ccc' : '',
                        },
                        fontSize: '14px',
                        borderRadius: 16,
                        textTransform: 'capitalize',
                    }}
                    variant="contained"
                    onClick={() => setCurrentPage(page + 1)}
                    color="primary"
                    disabled={!productsList?.length || totalPages === page + 1}
                >
                    {loadProducts ? string?.loading + '...' : string?.load_more}
                </Button>
            </Box>
        </>
    );
};

export default PaginationButton;
