import { Box, Button, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { LocalStorageProductInterface } from 'types/app_models';
import Loader from '../Loader/Loader';

const LoadMoreButton = () => {
    const {
        string,
        setPage,
        totalCount,
        currentCount,
        loadProducts,
        productsList,
        page,
        totalPages,
    }: {
        string: any;
        setPage: (prev) => {};
        loadProducts: boolean;
        totalCount: number;
        currentCount: number;
        productsList: LocalStorageProductInterface[];
        page: number;
        footerHeight: number;
        totalPages: number;
    } = useOutletContext();
    const { sx } = useDevice();
    const ref = useRef(null);

    if (!(!productsList?.length || totalPages === page + 1))
        return (
            <>
                {loadProducts && <Loader />}
                <Box
                    ref={ref}
                    my={1.5}
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
                        {currentCount} {string?.out_of} {totalCount} {string?.models}
                    </Typography>
                    <Button
                        sx={{
                            px: 4,
                            py: 1.5,
                            width: 320,
                            color: loadProducts ? '#ccc' : '',
                            borderColor: loadProducts ? '#ccc' : '',
                            cursor: loadProducts ? 'default' : 'pointer',
                            '&:hover': {
                                color: loadProducts ? '#ccc' : '',
                                borderColor: loadProducts ? '#ccc' : '',
                            },
                            fontSize: '16px',
                            borderRadius: 16,
                            textTransform: 'capitalize',
                        }}
                        variant="contained"
                        onClick={() => {
                            setPage(prev => prev + 1);
                        }}
                        color="primary"
                    >
                        {!loadProducts ? string?.load_more : `${string?.loading}...`}
                    </Button>
                </Box>
            </>
        );
    return null;
};

export default LoadMoreButton;
