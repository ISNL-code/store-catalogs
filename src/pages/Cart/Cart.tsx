import { useProductsApi } from 'api/useProductsApi';
import BackButton from 'components/atoms/Buttons/BackButton';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import { useIsMount } from 'hooks/useIsMount';
import { Fragment, useEffect, useState } from 'react';
import { scrollToTopNewPage } from 'helpers/scroll';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { CatalogContextInterface, ProductVariantInterface } from 'types';
import Loader from 'components/atoms/Loader/Loader';
import TransitionBox from 'components/atoms/Transitions/TransitionBox';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'components/atoms/Media/Image';
import { useDevice } from 'hooks/useDevice';
import { Box, Button, Fab, TextField, Typography } from '@mui/material';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import AddSizesButtons from './components/AddSizesButtons';
import AddButtons from './components/AddButtons';
import CardItem from 'components/atoms/Sections/CardItem';
import DeleteModal from 'components/organisms/Modals/DeleteModal';

const Cart = () => {
    const { sx, xs } = useDevice();
    const { storeCode, storeName } = useParams();
    const mount = useIsMount();
    const navigate = useNavigate();
    const { auth, cart, supportedLanguage, store, string }: CatalogContextInterface = useOutletContext();
    const [productIds, setProductIds] = useState<string[] | any[]>([]);
    const [cartProducts, setCartProducts] = useState<ProductVariantInterface[] | any[]>([]);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const { isFetching: loadProducts, refetch: updateCartProductsRes } = useProductsApi().useGetProductByIDForCart({
        id: productIds,
        lang: supportedLanguage,
        storeCode,
    });

    useEffect(() => {
        if (!cart?.cartItems.length) return setCartProducts([]);
        setProductIds(cart?.cartItems.map(el => el.productId));
    }, [cart.cartItems]);

    useEffect(() => {
        if (mount) return;
        if (!productIds.length) return;
        updateCartProductsRes().then(res => {
            const products = res.data?.data.products;

            const data = cart.cartItems.map(({ sku }) => {
                return {
                    ...products
                        .find(el => el.variants.map(({ sku }) => sku).includes(sku))
                        ?.variants?.filter(el => el.sku === sku)[0],
                    sizes: products
                        .find(el => el.variants.map(({ sku }) => sku).includes(sku))
                        ?.options?.find(el => el.code === 'SIZE'),
                    name: products.find(el => el.variants.map(({ sku }) => sku).includes(sku))?.description?.name,
                };
            });
            setCartProducts(data);
        });
    }, [productIds, supportedLanguage]);

    useEffect(() => {
        if (mount) return;
        if (!auth) navigate(`/catalog/${storeCode}/${storeName}`);
    }, [auth]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loadProducts) return;

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [loadProducts, loading]);

    if (loading) return <Loader />;

    return (
        <>
            {isOpenModal && (
                <DeleteModal
                    string={string}
                    title={string?.clear_cart}
                    close={() => setIsOpenModal(false)}
                    text={string?.approve_clear_cart}
                    action={() => {
                        cart?.handleClearCart();
                    }}
                />
            )}
            <InstrumentalSubHeader
                StartSlot={() => <BackButton nav={-1} action={() => {}} />}
                EndSlot={() => (
                    <Button
                        variant="outlined"
                        color="error"
                        sx={{ backgroundColor: 'white' }}
                        onClick={() => {
                            setIsOpenModal(true);
                        }}
                    >
                        {string?.clear_cart}
                    </Button>
                )}
            />
            {cartProducts?.length ? (
                <Grid xs={12} container>
                    <Grid xs={sx ? 12 : 8} sx={{ rowGap: 4 }} container>
                        {cartProducts.map(el => {
                            return (
                                <Fragment key={el.id}>
                                    <Grid xs={xs ? 12 : 6} sx={{ maxWidth: 450, ml: 'auto' }}>
                                        <Image
                                            width={store?.productImagesOptions?.width}
                                            height={store?.productImagesOptions?.height}
                                            imgUrl={el?.images[0]?.imageUrl}
                                        />
                                    </Grid>
                                    <Grid
                                        px={sx ? 1 : 4}
                                        py={1}
                                        xs={xs ? 12 : 6}
                                        sx={{
                                            maxWidth: 450,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: sx ? 1 : 2,
                                            border: '1px solid #f1f1f1',
                                        }}
                                    >
                                        <Grid
                                            xs={12}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                borderBottom: '1px solid #ccc',
                                                flexWrap: 'wrap',
                                                gap: 1,
                                            }}
                                            pb={1}
                                        >
                                            <Box sx={{ display: 'flex', gap: 0.25, alignItems: 'center' }}>
                                                <Typography>{string?.vendor_code}:</Typography>
                                                <Typography variant="h3" sx={{ color: 'gray', fontWeight: 700 }}>
                                                    {el?.sku}
                                                </Typography>
                                            </Box>
                                            <Button
                                                color="error"
                                                variant="outlined"
                                                onClick={() => {
                                                    cart?.handleSetCartItems({
                                                        sku: el?.sku,
                                                    });
                                                }}
                                            >
                                                {string?.delete}
                                            </Button>
                                        </Grid>
                                        <Typography variant="h3">{el?.name}</Typography>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Typography>{string?.price}:</Typography>
                                            <Typography variant="h3" sx={{ color: 'gray' }}>
                                                {getCurrencySymbol(store?.currency)}
                                                {el?.inventory[0]?.price}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Typography>{string?.color}:</Typography>
                                            <Typography variant="h3" sx={{ color: 'gray' }}>
                                                {el?.variation?.optionValue?.name}
                                            </Typography>
                                        </Box>
                                        {store?.mainStoreSettings?.sizes ? (
                                            <AddSizesButtons sizes={el?.sizes} />
                                        ) : (
                                            <AddButtons />
                                        )}
                                    </Grid>
                                </Fragment>
                            );
                        })}
                    </Grid>
                    <Grid my={2} p={1} xs={sx ? 12 : 4}>
                        <CardItem withHover={false}>
                            <Box p={2} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Grid mb={1} xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                                    <Typography variant="h3">{string?.delivery_information}</Typography>
                                    <Typography variant="h6" sx={{ color: 'gray', textTransform: 'lowercase' }}>
                                        ({string?.not_required})
                                    </Typography>
                                </Grid>
                                <Grid xs={12}>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        size="small"
                                        label={string?.first_name}
                                        sx={{
                                            '& label': {
                                                color: '#898B9B',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        size="small"
                                        label={string?.last_name}
                                        sx={{
                                            '& label': {
                                                color: '#898B9B',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        size="small"
                                        label={string?.phone_number}
                                        sx={{
                                            '& label': {
                                                color: '#898B9B',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        size="small"
                                        label={string?.city}
                                        sx={{
                                            '& label': {
                                                color: '#898B9B',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        size="small"
                                        label={string?.delivery_address}
                                        sx={{
                                            '& label': {
                                                color: '#898B9B',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        my: 2,
                                    }}
                                >
                                    <Box>
                                        <Typography variant="h2">{string?.total}:</Typography>
                                        <Typography variant="h6" sx={{ color: 'gray', textTransform: 'lowercase' }}>
                                            ({string?.excluding_delivery})
                                        </Typography>
                                    </Box>
                                    <Typography variant="h2" sx={{ color: 'gray' }}>
                                        $1234
                                    </Typography>
                                </Grid>
                                <Grid xs={12}>
                                    <Button variant="contained" sx={{ width: '100%' }}>
                                        {string?.confirm_order}
                                    </Button>
                                </Grid>
                            </Box>
                        </CardItem>
                    </Grid>
                </Grid>
            ) : (
                <EmptyPage />
            )}
        </>
    );
};

export default Cart;
