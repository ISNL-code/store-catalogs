import { STORE_CONFIG } from 'store_constants/stores_config';
import { StoreType } from 'store_constants/types';
import { LocalStorageProductInterface, ProductDataInterface, ProductVariantInterface } from 'types/app_models';
import { Product_Data_Response_Interface } from 'types/response_models';

const { OPTIONS } = STORE_CONFIG;
const { STORE_TYPE } = OPTIONS;

export const map_product_card = {
    catalog_card: (data?: Product_Data_Response_Interface[] | null) => getCatalogCard(data),
    favorite_card: (
        data?: Product_Data_Response_Interface[] | null,
        favoriteList?: LocalStorageProductInterface[] | null,
        clearBroken?: (val) => void
    ) => getFavoriteCard(data, favoriteList, clearBroken),
    details_card: (data?: Product_Data_Response_Interface[] | null) => getDetailsCard(data),
    cart_card: (
        data?: Product_Data_Response_Interface[] | null,
        favoriteList?: LocalStorageProductInterface[] | null,
        clearBroken?: (val) => void
    ) => getCartCard(data, favoriteList, clearBroken),
};

const mapDataArray = (data: Product_Data_Response_Interface[]) => {
    const newData: ProductDataInterface[] = data?.map(product => {
        const originalPrice =
            STORE_TYPE === StoreType.sales
                ? Math.max(...product.variants?.map(el => Number(el.inventory[0]?.price.replace(/[^0-9.]/g, ''))))
                : product.price;

        return {
            id: product.id,
            name: product?.description.name,
            description: product?.description.description,
            productSku: product?.sku,
            table_size_img: product?.image,
            options: product?.options,
            discounted: product.variants?.some(el => el?.sku === '0-ORIGINAL_PRICE'),
            variants: product.variants
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .filter(el => (STORE_TYPE === StoreType.sales ? el.images.length : true))
                .map(
                    (variant, idx): ProductVariantInterface => ({
                        variantId: variant.id,
                        productId: variant.productId,
                        productSku: product?.sku,
                        variantSku: variant.sku,
                        images: variant.images,
                        originalPrice: originalPrice,
                        price: parseFloat(variant.inventory[0]?.price.replace(/[^0-9.]/g, '')),
                        quantity: variant.inventory[0]?.quantity,
                        selected: idx === 0,
                        colorCode: variant.variation.optionValue.code,
                        colorName: variant.variation.optionValue.name,
                    })
                ),
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

    return newData;
};

const mapVariantsArray = (
    data: ProductDataInterface[],
    selectedData: LocalStorageProductInterface[],
    clearBroken?: (val) => void
) => {
    const variants: ProductDataInterface[] | [] = selectedData
        ?.map(({ variantSku }) => {
            const newVariant = data?.find(product =>
                product?.variants?.some(variant => variant?.variantSku === variantSku)
            );

            if (newVariant) {
                return {
                    ...newVariant,
                    variants: newVariant?.variants
                        ?.filter(el => el?.variantSku === variantSku)
                        .map(el => {
                            return { ...el, selected: true };
                        }),
                };
            } else {
                if (clearBroken) clearBroken(variantSku);
                return null;
            }
        })
        .filter((product): product is ProductDataInterface => Boolean(product));

    return variants;
};

const getCatalogCard = (data?: Product_Data_Response_Interface[] | null) => {
    if (!data) return [];
    const newData: ProductDataInterface[] = mapDataArray(data);
    return newData;
};

const getFavoriteCard = (
    data?: Product_Data_Response_Interface[] | null,
    favoriteList?: LocalStorageProductInterface[] | null,
    clearBroken?: (val) => void
) => {
    if (!data) return [];
    const newData: ProductDataInterface[] = mapDataArray(data);
    if (!favoriteList) return [];
    const newFavoritesData: ProductDataInterface[] = mapVariantsArray(newData, favoriteList, clearBroken);
    return newFavoritesData;
};

const getCartCard = (
    data?: Product_Data_Response_Interface[] | null,
    favoriteList?: LocalStorageProductInterface[] | null,
    clearBroken?: (val) => void
) => {
    if (!data) return [];
    const newData: ProductDataInterface[] = mapDataArray(data);
    if (!favoriteList) return [];
    const newFavoritesData: ProductDataInterface[] = mapVariantsArray(newData, favoriteList, clearBroken);
    return newFavoritesData;
};

const getDetailsCard = (data?: Product_Data_Response_Interface[] | null) => {
    if (!data) return null;
    const newData: ProductDataInterface[] = mapDataArray(data);
    return newData[0]; // cause get by id api method return array
};
