import { useProductsApi } from 'api/useProductsApi';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { StoreType } from 'store_constants/types';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { ProductDataInterface, ProductVariantInterface } from 'types/app_models';
import { useDevice } from 'hooks/useDevice';

interface Props {
    store: string;
    lang: string | null;
}

export const useProducts = ({ store, lang }: Props) => {
    const { sx } = useDevice();
    const { OPTIONS } = STORE_CONFIG;
    const { STORE_TYPE } = OPTIONS;
    const mount = useIsMount();
    const count = sx ? 28 : 35;

    const [queryCategories, setQueryCategories] = useState<string[] | []>([]);
    const [currentProductsPage, setCurrentProductsPage] = useState(0);
    const [productsList, setProductsList] = useState<ProductDataInterface[] | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [currentCount, setCurrentCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const {
        data: productGetData,
        isFetching: isLoadingProducts,
        isLoading: isLoadingMoreProducts,
        refetch: refetchProducts,
        remove: removeProductsData,
    } = useProductsApi().useGetAllProducts({
        store,
        lang: lang || 'en',
        count,
        page: currentProductsPage,
        categories: queryCategories,
    });

    useEffect(() => {
        if (!productGetData || isLoadingMoreProducts) return;

        const newData = productGetData?.data?.products?.map(product => {
            const originalPrice =
                STORE_TYPE === StoreType.sales
                    ? Math.max(...product.variants?.map(el => Number(el.inventory[0]?.price)))
                    : Number(product.price);

            return {
                id: product.id,
                name: product?.description.name,
                description: product?.description.description,
                productSku: product?.sku,
                table_size_img: product?.image,
                variants: product.variants
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .filter(el => (STORE_TYPE === StoreType.sales ? el.images.length : true))
                    .map((variant, idx) => ({
                        variantId: variant.id,
                        productId: variant.productId,
                        productSku: product?.sku,
                        variantSku: variant.sku,
                        images: variant.images,
                        originalPrice: originalPrice,
                        price: variant.inventory[0]?.price,
                        quantity: variant.inventory[0]?.quantity,
                        selected: idx === 0,
                        colorCode: variant.variation.optionValue.code,
                        colorName: variant.variation.optionValue.name,
                    })),
                originalPrice,
                promoTags:
                    product.options
                        .find(({ code }) => code === 'PROMO')
                        ?.optionValues.map(({ code, id, description }) => ({
                            code,
                            id,
                            name: description?.name,
                        })) || [],
                productSizes:
                    product?.options
                        .find(({ code }) => code === 'SIZE')
                        ?.optionValues.map(({ code, id, description }) => {
                            return { code, id, name: description?.name };
                        })
                        .sort((a, b) => Number(a.code) - Number(b.code)) || [],
            };
        });
        if (currentProductsPage)
            setProductsList(prevData => {
                if (prevData) {
                    return [...prevData, ...newData];
                } else return newData;
            });
        if (!currentProductsPage) {
            setProductsList(newData);
        }
        setTotalCount(productGetData?.data?.recordsTotal);
        setCurrentCount(productGetData?.data?.number);
        setTotalPages(productGetData?.data?.totalPages);
    }, [productGetData]); // eslint-disable-line

    const handleSkipData = () => {
        setCurrentProductsPage(0);
        setProductsList(null);
        setTotalCount(0);
        setCurrentCount(0);
        setTotalPages(0);
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
        removeProductsData();
        setTimeout(() => {
            refetchProducts();
        }, 200);
    };

    useEffect(() => {
        if (mount) return;
        handleSkipData();
    }, [queryCategories]); // eslint-disable-line

    useEffect(() => {
        if (mount) return;
        handleSkipData();
    }, [lang]); // eslint-disable-line

    useEffect(() => {
        if (mount) return;
        if (currentProductsPage === 0) return;
        refetchProducts();
    }, [currentProductsPage]); // eslint-disable-line

    const handleSetProductsPage = (val: number) => {
        if (totalPages <= currentProductsPage) return;
        setCurrentProductsPage(val);
    };

    return {
        isLoadingProducts,
        isLoadingMoreProducts,
        currentProductsPage,
        handleSetProductsPage,
        productsList,
        totalProductsCount: totalCount,
        productCountPerPage: currentCount,
        totalProductsPages: totalPages,
        setProductsList,
        queryCategories,
        setQueryCategories,
    };
};
