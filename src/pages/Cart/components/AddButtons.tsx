import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useIsMount } from 'hooks/useIsMount';
import { ProductVariantInterface } from 'types';
import { OrderDataInterface } from '../Cart';

interface Props {
    productPrice;
    setOrderData: Dispatch<SetStateAction<OrderDataInterface>>;
    productData: ProductVariantInterface;
}

const AddButtons = ({ productPrice, setOrderData, productData }: Props) => {
    const mount = useIsMount();
    const [value, setValue] = useState(1);

    useEffect(() => {
        if (mount) return;
        setOrderData(prev => {
            return {
                ...prev,
                productsList: [
                    ...prev.productsList,
                    {
                        sizeId: null,
                        colorId: productData?.id,
                        productSku: productData?.variantSku,
                        quantity: 1,
                        price: productPrice,
                        sku: productData?.sku,
                    },
                ],
            };
        }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mount]);

    return (
        <Box sx={{ display: 'flex', gap: 1 }} my={1}>
            <Fab
                size="small"
                onClick={() => {
                    setValue(prev => {
                        return prev > 1 ? prev - 1 : prev;
                    });
                    setOrderData(prev => {
                        return {
                            ...prev,
                            productsList: prev.productsList.map(item => {
                                if (item.productSku === productData?.variantSku && Number(item.quantity) > 1)
                                    return { ...item, quantity: Number(item.quantity) - 1 };
                                return item;
                            }),
                        };
                    });
                }}
            >
                <RemoveIcon />
            </Fab>
            <TextField
                value={value}
                size="small"
                sx={{
                    width: 65,
                }}
                InputProps={{
                    slotProps: {
                        input: { style: { textAlign: 'center' } },
                    },
                }}
            />
            <Fab
                size="small"
                onClick={() => {
                    setValue(prev => prev + 1);
                    setOrderData(prev => {
                        return {
                            ...prev,
                            productsList: prev.productsList.map(item => {
                                if (item?.colorId === productData?.id)
                                    return { ...item, quantity: Number(item.quantity) + 1 };
                                return item;
                            }),
                        };
                    });
                }}
            >
                <AddIcon />
            </Fab>
        </Box>
    );
};

export default AddButtons;
