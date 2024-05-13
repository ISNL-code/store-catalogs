import { Box, Button, Typography } from '@mui/material';
import { Colors } from 'colors';
import { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import Loader from '../Loader/Loader';

const PaginationButton = ({ setCurrentPage, totalCount, loadProducts, productsList, page, totalPages }) => {
    const { string }: any = useOutletContext();
    const ref = useRef(null);

    if (productsList?.length < 12) return null;

    return (
        <>
            {loadProducts && <Loader position="fixed" />}

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
                <Typography sx={{ color: Colors?.TEXT_GRAY, fontSize: 14 }}>
                    {productsList?.length} {string?.out_of} {totalCount} {string?.shown}
                </Typography>
                <Button
                    sx={{
                        width: 200,
                        color: loadProducts ? '#ccc' : '',
                        borderColor: loadProducts ? '#ccc' : '',
                        cursor: loadProducts ? 'default' : 'pointer',
                        '&:hover': {
                            color: loadProducts ? '#ccc' : '',
                            borderColor: loadProducts ? '#ccc' : '',
                        },
                        fontSize: '14px',
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
