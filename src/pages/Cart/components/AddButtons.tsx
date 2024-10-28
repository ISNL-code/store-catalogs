import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CartProductInterface, OrderDataInterface } from '../Cart';

interface Props {
    setOrderData: Dispatch<SetStateAction<OrderDataInterface>>;
    data: CartProductInterface;
}

const AddButtons = ({ setOrderData, data }: Props) => {
    const [value, setValue] = useState(1);

    useEffect(() => {
        setOrderData(prev => {
            return {
                ...prev,
                productsList: [
                    ...prev.productsList,
                    {
                        sizeId: null,
                        colorId: data?.variant.variantId,
                        productSku: data?.variant.variantSku,
                        quantity: 1,
                        price: data?.variant?.price,
                        sku: data?.variant.productSku,
                    },
                ],
            };
        }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                                if (item.productSku === data?.variant?.variantSku && Number(item.quantity) > 1)
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
                                if (item?.colorId === data?.variant?.variantId)
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
