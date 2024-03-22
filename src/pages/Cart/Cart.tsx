import { useProductsApi } from 'api/useProductsApi';
import BackButton from 'components/atoms/Buttons/BackButton';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useRef, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { CatalogContextInterface, ProductVariantInterface } from 'types';
import Loader from 'components/atoms/Loader/Loader';
import Grid from '@mui/material/Unstable_Grid2';
import Image, { EmptyImage } from 'components/atoms/Media/Image';
import { useDevice } from 'hooks/useDevice';
import { Box, Button } from '@mui/material';
import AddSizesButtons from './components/AddSizesButtons';
import AddButtons from './components/AddButtons';
import DeleteModal from 'components/organisms/Modals/DeleteModal';
import ConfirmCoupon from './components/ConfirmCoupon';
import ProductDetails from './components/ProductDetails';
import { useCartApi } from 'api/useCartApi';
import SuccessOrderingPage from 'components/atoms/SuccessOrdering/SuccessOrderingPage';

interface ProductListInterface {
    sizeId: number | null;
    colorId: string;
    sku: string;
    quantity: string;
    price: string | number;
}

export interface OrderDataInterface {
    final_price: string | number;
    productsList: ProductListInterface[];
    delivery: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
        zone: string;
        firstName: string;
        lastName: string;
        phone: string;
    };
}

const Cart = () => {
    const ref = useRef<HTMLInputElement>(null);
    const { sx, xs } = useDevice();
    const { storeCode } = useParams();
    const mount = useIsMount();
    const { cart, supportedLanguage, store, string }: CatalogContextInterface = useOutletContext();
    const [productIds, setProductIds] = useState<string[] | any[]>([]);
    const [cartProducts, setCartProducts] = useState<ProductVariantInterface[] | any[]>([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [finalPrice, setFinalPrice] = useState(0);
    const [successOrdering, setSuccessOrdering] = useState(false);
    const [orderData, setOrderData] = useState({
        final_price: 0,
        productsList: [] as ProductListInterface[],
        delivery: {
            address: '',
            city: '',
            postalCode: '',
            country: '',
            zone: '',
            firstName: '',
            lastName: '',
            phone: '',
        },
    });

    const { isFetching: loadProducts, refetch: updateCartProductsRes } = useProductsApi().useGetProductByIDForCart({
        id: productIds,
        lang: supportedLanguage,
        storeCode,
    });

    const { mutateAsync: createOrder, isLoading: loadCreateOrder } = useCartApi().useCreateOrder();

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
                    productSku: products.find(el => el.variants.map(({ sku }) => sku).includes(sku))?.sku,
                    sizes: {
                        ...products
                            .find(el => el.variants.map(({ sku }) => sku).includes(sku))

                            ?.options?.find(el => el.code === 'SIZE'),
                    },
                    color: {
                        ...products
                            .find(el => el.variants.map(({ sku }) => sku).includes(sku))

                            ?.options?.find(el => el.code === 'COLOR'),
                    },
                    name: products.find(el => el.variants.map(({ sku }) => sku).includes(sku))?.description?.name,
                };
            });
            setCartProducts(data);
        }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productIds, supportedLanguage]);

    useEffect(() => {
        if (!orderData.productsList.length) return setFinalPrice(0);
        setFinalPrice(
            orderData?.productsList.reduce(
                (acc, el) => Number((el.price as string).replaceAll(',', '')) * Number(el.quantity) + acc,
                0
            )
        );
    }, [orderData.productsList]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loadProducts) return;

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [loadProducts, loading]);

    if (successOrdering)
        return (
            <>
                <InstrumentalSubHeader StartSlot={() => <BackButton nav={-1} action={() => {}} />} />
                <SuccessOrderingPage />
            </>
        );

    return (
        <>
            {(loadCreateOrder || loading || loadProducts) && <Loader />}
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
                        disabled={!cartProducts?.length}
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
                <Grid xs={12} container sx={{ position: 'relative' }}>
                    <Grid xs={sx ? 12 : 8} sx={{ rowGap: !xs ? 0 : 2 }} container>
                        {cartProducts.map(el => {
                            return (
                                <Grid
                                    container
                                    xs={12}
                                    sx={{
                                        ml: 'auto',
                                        border: xs ? '1px solid #ccc' : '',
                                        borderRadius: xs ? 6 : 0,
                                        overflow: 'hidden',
                                        boxShadow: xs ? '0 0 3px 1px #00000037' : '',
                                    }}
                                    key={el.id}
                                    p={xs ? 0 : 1}
                                >
                                    <Grid
                                        ref={ref}
                                        xs={xs ? 12 : 6}
                                        sx={{
                                            maxWidth: 450,
                                            ml: 'auto',
                                            border: !xs ? '1px solid #ccc' : '',
                                            boxShadow: '0 0 2px 1.5px #00000037',
                                            borderTopLeftRadius: xs ? '' : 24,
                                            borderBottomLeftRadius: xs ? '' : 24,
                                            overflow: 'hidden',
                                            borderRight: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {el?.images?.length ? (
                                            <Image
                                                store={store}
                                                imgUrl={el?.images ? el?.images[0]?.imageUrl : ''}
                                                ref={ref}
                                            />
                                        ) : (
                                            <EmptyImage />
                                        )}
                                    </Grid>
                                    <Grid
                                        px={sx ? 1 : 4}
                                        py={1}
                                        xs={xs ? 12 : 6}
                                        sx={{
                                            border: !xs ? '1px solid #ccc' : '',
                                            borderLeft: 'none',
                                            maxWidth: 450,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: sx ? 1 : 2,
                                            backgroundColor: '#fafafa',
                                            boxShadow: '0 0 2px 1.5px #00000037',
                                            borderTopRightRadius: xs ? '' : 24,
                                            borderBottomRightRadius: xs ? '' : 24,
                                        }}
                                    >
                                        <ProductDetails data={el} />
                                        {store?.mainStoreSettings?.sizes ? (
                                            <AddSizesButtons
                                                sizes={el?.sizes}
                                                orderData={orderData}
                                                setOrderData={setOrderData}
                                                productPrice={el?.inventory ? el?.inventory[0]?.price : '0'}
                                                productData={el}
                                            />
                                        ) : (
                                            <AddButtons
                                                orderData={orderData}
                                                setOrderData={setOrderData}
                                                productPrice={el?.inventory ? el?.inventory[0]?.price : '0'}
                                                productData={el}
                                            />
                                        )}
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Grid mb={2} mt={xs ? 2 : 0} p={xs ? 0 : 1} xs={sx ? 12 : 4}>
                        <Box sx={{ position: 'sticky', top: 100 }}>
                            <ConfirmCoupon
                                createOrder={createOrder}
                                orderData={orderData}
                                finalPrice={finalPrice}
                                setSuccessOrdering={setSuccessOrdering}
                            />
                        </Box>
                    </Grid>
                </Grid>
            ) : (
                <>{!(loading || loadProducts) && <EmptyPage />}</>
            )}
        </>
    );
};

export default Cart;
