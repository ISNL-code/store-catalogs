import { IoBagRemove } from 'react-icons/io5';
import { IoBagAdd } from 'react-icons/io5';
import { IoBag } from 'react-icons/io5';

import { Box, IconButton } from '@mui/material';
import { useStoresApi } from 'api/useStoresApi';
import { useOutletContext } from 'react-router-dom';
import { StoresContextInterface } from 'types';
import { STORES_DATA } from 'dataBase/STORES';

interface FavoriteStoresButtonInterface {
    storeCode: string;
    isFavorite: boolean;
}

const FavoriteStoresButton = ({ storeCode, isFavorite }: FavoriteStoresButtonInterface) => {
    const { auth, setOpenModalType, setFavoriteStores, updateFavoritesRes, lang }: StoresContextInterface =
        useOutletContext();
    const { mutateAsync: addStoreToFavorites } = useStoresApi().useAddStoreToFavorite();
    const { mutateAsync: deleteStoreToFavorites } = useStoresApi().useDeleteStoreToFavorite();

    if (!auth)
        return (
            <Box>
                <Box>
                    <IconButton
                        size="small"
                        sx={{ border: '1px solid #ccc', width: '33px', height: '33px' }}
                        onClick={() => setOpenModalType('register-warning')}
                    >
                        <IoBag style={{ fontSize: 30, color: '#ccc' }} />
                    </IconButton>
                </Box>
            </Box>
        );
    return (
        <Box>
            <Box>
                {isFavorite ? (
                    <IconButton
                        size="small"
                        sx={{ border: '1px solid red', backgroundColor: '#fff', width: '33px', height: '33px' }}
                        onClick={() =>
                            deleteStoreToFavorites({ storeCode }).then(() =>
                                updateFavoritesRes().then(res => {
                                    if (!res) return;
                                    setFavoriteStores([
                                        ...res?.data?.data.map(item => {
                                            const addStoreData = STORES_DATA?.find(el => el.code === item.code);
                                            const description =
                                                addStoreData?.descriptions.find(el => el.language === lang) ||
                                                addStoreData?.descriptions.find(el => el.language === 'en');

                                            return { ...item, ...addStoreData, description };
                                        }),
                                    ]);
                                })
                            )
                        }
                    >
                        <IoBagRemove color="red" style={{ fontSize: 30 }} />
                    </IconButton>
                ) : (
                    <IconButton
                        size="small"
                        sx={{ border: '1px solid #1976d2', backgroundColor: '#fff', width: '33px', height: '33px' }}
                        onClick={() =>
                            addStoreToFavorites({ storeCode }).then(() =>
                                updateFavoritesRes().then(res => {
                                    if (!res) return;
                                    setFavoriteStores([
                                        ...res?.data?.data.map(item => {
                                            const addStoreData = STORES_DATA?.find(el => el.code === item.code);
                                            const description =
                                                addStoreData?.descriptions.find(el => el.language === lang) ||
                                                addStoreData?.descriptions.find(el => el.language === 'en');

                                            return { ...item, ...addStoreData, description };
                                        }),
                                    ]);
                                })
                            )
                        }
                    >
                        <IoBagAdd color="primary" style={{ fontSize: 30, color: '#1976d2' }} />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
};

export default FavoriteStoresButton;
