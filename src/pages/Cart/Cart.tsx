import { useProductsApi } from 'api/useProductsApi';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import InstrumentalSubHeader from 'components/organisms/InstrumentalSubHeader/InstrumentalSubHeader';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useRef, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { ProductVariantInterface } from 'types/app_models';
import Loader from 'components/atoms/Loader/Loader';
import Grid from '@mui/material/Unstable_Grid2';
import ImageComponent, { EmptyImage } from 'components/atoms/Media/Image';
import { useDevice } from 'hooks/useDevice';
import { Box } from '@mui/material';
import AddSizesButtons from './components/AddSizesButtons';
import AddButtons from './components/AddButtons';
import ConfirmCoupon from './components/ConfirmCoupon';
import ProductDetails from './components/ProductDetails';
import { useCartApi } from 'api/useCartApi';
import SuccessOrderingPage from 'components/atoms/SuccessOrdering/SuccessOrderingPage';
import ClearListButton from 'components/molecules/ToolsButtons/ClearListButton';
import { Colors } from 'colors';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { CatalogContextInterface } from 'types/outlet_context_models';

interface ProductListInterface {
    sizeId: number | null;
    colorId: number;
    productSku: string;
    quantity: number;
    price: string | number;
    sku: string;
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
        company: string;
    };
}

const Cart = () => {
    const { OPTIONS } = STORE_CONFIG;
    const { PLAN_OPTIONS } = OPTIONS;
    const sliderRef = useRef<HTMLImageElement>(null);
    const { sx, xs } = useDevice();
    const { storeCode } = useParams();
    const mount = useIsMount();

    const {
        cart,
        lang,
        string,
        footerMenuHeight,
        appXPadding,
        headerHeight,
        instrumentalBarHeight,
        handleOpenDialog,
    }: CatalogContextInterface = useOutletContext();
    const [productIds, setProductIds] = useState<string[] | any[]>([]);
    const [cartProducts, setCartProducts] = useState<ProductVariantInterface[] | any[]>([]);
    const [finalPrice, setFinalPrice] = useState<number>(0);
    const [successOrdering, setSuccessOrdering] = useState<boolean>(false);
    const [orderData, setOrderData] = useState<OrderDataInterface>({
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
            company: '',
        },
    });

    const { isFetching: loadProducts, refetch: updateCartProductsRes } = useProductsApi().useGetProductByIDForCart({
        id: productIds,
        lang: lang,
        storeCode,
    });

    const { mutateAsync: createOrder, isLoading: loadCreateOrder } = useCartApi().useCreateOrder();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    }, []);

    useEffect(() => {
        if (!cart?.cartItems.length) return setCartProducts([]);
        setProductIds(cart?.cartItems.map(el => el.productId));
    }, [cart.cartItems]);

    useEffect(() => {
        if (mount) return;
        if (!productIds.length) return;
        updateCartProductsRes().then(res => {
            const products = res.data?.data.products;

            //clear invalid items
            cart?.cartItems.forEach(({ variantSku }) => {
                if (!products.find(el => el.variants.map(({ variantSku }) => variantSku).includes(variantSku))) {
                    cart?.handleSetCartItems({
                        variantSku,
                    });
                }
            });

            const data = cart?.cartItems?.map(({ variantSku }) => {
                return {
                    ...products
                        .find(el => el.variants.map(({ variantSku }) => variantSku).includes(variantSku))
                        ?.variants?.filter(el => el.variantSku === variantSku)[0],
                    variantSku: products.find(el =>
                        el.variants.map(({ variantSku }) => variantSku).includes(variantSku)
                    )?.variantSku,
                    sizes: {
                        ...products
                            .find(el => el.variants.map(({ variantSku }) => variantSku).includes(variantSku))

                            ?.options?.find(el => el.code === 'SIZE'),
                    },
                    color: {
                        ...products
                            .find(el => el.variants.map(({ variantSku }) => variantSku).includes(variantSku))

                            ?.options?.find(el => el.code === 'COLOR'),
                    },
                    name: products.find(el => el.variants.map(({ variantSku }) => variantSku).includes(variantSku))
                        ?.description?.name,
                };
            });
            setCartProducts(data);
        }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productIds, lang]);

    useEffect(() => {
        if (!orderData.productsList.length) return setFinalPrice(0);

        setFinalPrice(
            orderData?.productsList.reduce(
                (acc, el) => Number((el.price as string).replaceAll(',', '')) * Number(el.quantity) + acc,
                0
            )
        );
    }, [orderData.productsList, cartProducts?.length]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loadProducts) return;

        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, [loadProducts, loading]);

    if (successOrdering)
        return (
            <>
                <InstrumentalSubHeader StartSlot={() => <></>} />
                <SuccessOrderingPage setSuccessOrdering={setSuccessOrdering} />
            </>
        );

    return (
        <Box className="CartPageContainer" p={sx ? 2 : appXPadding} sx={{ pb: `calc(${footerMenuHeight}px + 16px)` }}>
            {(loadCreateOrder || loading || loadProducts) && <Loader position="fixed" />}

            <InstrumentalSubHeader
                StartSlot={() => <></>}
                EndSlot={() => (
                    <ClearListButton
                        action={() => {
                            handleOpenDialog(DialogWindowType?.CLEAR_CART);
                        }}
                        isShown
                        title={string?.clear_cart}
                        disabled={!cartProducts?.length}
                    />
                )}
            />
            {cartProducts?.length ? (
                <Grid className="CartContainer" xs={12} container>
                    <Grid
                        xs={sx ? 12 : 8}
                        sx={{
                            rowGap: 2,
                        }}
                        container
                    >
                        {cartProducts.map(el => {
                            return (
                                <Grid
                                    ref={sliderRef}
                                    container
                                    xs={12}
                                    sx={{
                                        ml: 'auto',
                                        border: xs ? '1px solid #ccc' : '',
                                        overflow: 'hidden',
                                    }}
                                    key={el.id}
                                >
                                    <Grid
                                        xs={xs ? 12 : 6}
                                        sx={{
                                            maxWidth: 450,
                                            ml: 'auto',
                                            border: !xs ? '1px solid #ccc' : '',
                                            overflow: 'hidden',
                                            borderRight: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            backgroundColor: Colors?.GRAY_100,
                                            alignItems: 'center',
                                        }}
                                        p={2}
                                    >
                                        {el?.images?.length ? (
                                            <ImageComponent
                                                imgUrl={el?.images ? el?.images[0]?.imageUrl : ''}
                                                ref={null}
                                            />
                                        ) : (
                                            <EmptyImage />
                                        )}
                                    </Grid>
                                    <Grid
                                        p={2}
                                        xs={xs ? 12 : 6}
                                        sx={{
                                            border: !xs ? '1px solid #ccc' : '',
                                            borderLeft: 'none',
                                            maxWidth: 450,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: sx ? 1 : 2,
                                            backgroundColor: '#fafafa',
                                        }}
                                    >
                                        <ProductDetails data={el} setOrderData={setOrderData} />
                                        {PLAN_OPTIONS?.sizes ? (
                                            <AddSizesButtons
                                                sizes={el?.sizes}
                                                orderData={orderData}
                                                setOrderData={setOrderData}
                                                productPrice={el?.inventory ? el?.inventory[0]?.price : '0'}
                                                productData={el}
                                            />
                                        ) : (
                                            <AddButtons
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
                    <Grid
                        className="CouponContainer"
                        xs={sx ? 12 : 4}
                        my={sx ? 2 : 0}
                        sx={{
                            position: sx ? 'static' : 'sticky',
                            top: `${headerHeight + instrumentalBarHeight + 24}px`,
                            zIndex: 100,
                            height: 'fit-content',
                        }}
                    >
                        <Box sx={{ pl: sx ? 0 : 2 }}>
                            <ConfirmCoupon
                                createOrder={createOrder}
                                orderData={orderData}
                                finalPrice={finalPrice}
                                setSuccessOrdering={setSuccessOrdering}
                                setOrderData={setOrderData}
                                loadCreateOrder={loadCreateOrder}
                            />
                        </Box>
                    </Grid>
                </Grid>
            ) : (
                <>{!(loading || loadProducts) && <EmptyPage />}</>
            )}
        </Box>
    );
};

export default Cart;
