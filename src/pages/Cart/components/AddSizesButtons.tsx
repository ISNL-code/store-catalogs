import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, TextField, Typography } from '@mui/material';
import SizesIndicatorButton from 'components/atoms/SizesIndicatorButton/SizesIndicatorButton';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import { OrderDataInterface } from '../Cart';

const AddSizesButtons = ({
    sizes,
    productPrice,
    orderData,
    setOrderData,
    productData,
}: {
    sizes;
    productPrice;
    orderData: OrderDataInterface;
    setOrderData;
    productData;
}) => {
    const { string }: any = useOutletContext();
    const [selectedSize, setSelectedSizes] = useState<any>([]);

    return (
        <>
            <Box sx={{ borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                <Typography my={1} variant="h3">
                    {string?.select_sizes}:
                </Typography>
                <Box mb={1} sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {sizes?.optionValues?.length ? (
                        sizes?.optionValues
                            ?.sort((a, b) => a?.description?.name - b?.description?.name)
                            ?.map(el => (
                                <Box
                                    key={el?.id}
                                    onClick={() => {
                                        if (selectedSize?.find(({ id }) => id === el.id)) {
                                            setSelectedSizes(prev => prev.filter(({ id }) => id !== el.id));
                                            setOrderData(prev => {
                                                return {
                                                    ...prev,
                                                    productsList: prev?.productsList?.filter?.(
                                                        ({ sizeId }) => el?.id !== sizeId
                                                    ),
                                                };
                                            });
                                        } else {
                                            setSelectedSizes(prev => [...prev, { ...el, quantity: 1 }]);
                                            setOrderData(prev => {
                                                return {
                                                    ...prev,
                                                    productsList: [
                                                        ...prev.productsList,
                                                        {
                                                            sizeId: el?.id,
                                                            colorId: productData?.color?.optionValues[0]?.id,
                                                            sku: productData?.productSku,
                                                            quantity: 1,
                                                            price: productPrice,
                                                        },
                                                    ],
                                                };
                                            });
                                        }
                                    }}
                                >
                                    <SizesIndicatorButton
                                        size={35}
                                        label={el?.description?.name}
                                        selected={selectedSize?.find(item => item.id === el.id)}
                                    />
                                </Box>
                            ))
                    ) : (
                        <Typography variant="h4" sx={{ color: 'red' }}>
                            {string?.no_available_sizes}
                        </Typography>
                    )}
                </Box>
            </Box>
            <Box>
                {selectedSize?.length ? (
                    selectedSize
                        ?.sort((a, b) => a.description?.name - b.description?.name)
                        .map(el => (
                            <Box sx={{ display: 'flex', gap: 3, my: 1 }} key={el?.id}>
                                <Box>
                                    <SizesIndicatorButton size={35} label={el?.description?.name} disabled />
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Fab
                                        sx={{ width: 35, height: 35 }}
                                        onClick={() => {
                                            setSelectedSizes(prev => {
                                                return prev?.map(item => {
                                                    if (item.id === el.id && item.quantity > 1)
                                                        return { ...item, quantity: item.quantity - 1 };
                                                    return item;
                                                });
                                            });
                                            setOrderData(prev => {
                                                return {
                                                    ...prev,
                                                    productsList: prev.productsList.map(item => {
                                                        if (item.sizeId === el.id && item.quantity > 1)
                                                            return { ...item, quantity: item.quantity - 1 };
                                                        return item;
                                                    }),
                                                };
                                            });
                                        }}
                                    >
                                        <RemoveIcon />
                                    </Fab>
                                    <TextField
                                        value={el.quantity}
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
                                        sx={{ width: 35, height: 35 }}
                                        onClick={() => {
                                            setSelectedSizes(prev => {
                                                return prev?.map(item => {
                                                    if (item.id === el.id)
                                                        return { ...item, quantity: item.quantity + 1 };
                                                    return item;
                                                });
                                            });
                                            setOrderData(prev => {
                                                return {
                                                    ...prev,
                                                    productsList: prev.productsList.map(item => {
                                                        if (item.sizeId === el.id)
                                                            return { ...item, quantity: item.quantity + 1 };
                                                        return item;
                                                    }),
                                                };
                                            });
                                        }}
                                    >
                                        <AddIcon />
                                    </Fab>
                                </Box>
                            </Box>
                        ))
                ) : (
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Typography py={2} variant="h4" sx={{ color: 'red' }}>
                            {string?.no_sizes_added}
                        </Typography>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default AddSizesButtons;
