import { CatalogContextInterface, StoreInterface } from 'types';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Typography } from '@mui/material';
import CardItem from 'components/atoms/Sections/CardItem';
import Image from 'components/atoms/Media/Image';
import LanguagesView from 'components/molecules/LanguagesView';
import FavoriteStoresButton from 'components/molecules/ToolsButtons/FavoriteStoresButton';
import ShareButton from 'components/molecules/ToolsButtons/ShareButton';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';

interface StoreCardsInterface {
    data: StoreInterface[];
    dataFavorite: StoreInterface[] | null;
    setStoreToApprove;
}

const StoreCards = ({ data, dataFavorite, setStoreToApprove }: StoreCardsInterface) => {
    const { setOpenModalType }: CatalogContextInterface = useOutletContext();
    const { sm, mx, l } = useDevice();
    const navigate = useNavigate();
    const getGridValue = () => {
        if (sm) return 12;
        if (mx) return 6;
        if (l) return 4;
        return 3;
    };

    const checkStoreAuth = store => {
        if (store?.securityStoreSettings?.private) {
            setOpenModalType('enter-store-key');
            setStoreToApprove({ code: store?.code, id: store?.id, name: store?.name });
            return false;
        } else return true;
    };

    return (
        <Grid xs={12} container>
            {data?.map(item => (
                <Grid p={1} key={item.id} xs={getGridValue()}>
                    <CardItem>
                        <Box
                            onClick={() => {
                                const approved = checkStoreAuth(item);
                                if (!approved) return;
                                navigate(`/catalog/${item?.code}/${item?.name.toLowerCase().replaceAll(' ', '-')}`);
                            }}
                            sx={{ display: 'flex', width: '100%', borderBottom: '1px solid #ccc', cursor: 'pointer' }}
                        >
                            <Box sx={{ width: '70%', borderRight: '1px solid #ccc' }}>
                                <Image store={{}} imgUrl={item?.mainImage} ref={{}} />
                            </Box>
                            <Box
                                p={0.5}
                                sx={{ width: '30%', display: 'flex', alignItems: 'center', backgroundColor: 'white' }}
                            >
                                <Image store={{}} imgUrl={item?.logo?.path} ref={{}} />
                            </Box>
                        </Box>
                        <Box onClick={e => e.stopPropagation()}>
                            <Box
                                p={1}
                                sx={{
                                    borderBottom: '1px solid #ccc',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                }}
                            >
                                <Typography variant="h3">{item?.name}</Typography>
                                <Typography variant="h4" sx={{ color: 'gray' }}>
                                    {item?.description?.title}
                                </Typography>
                            </Box>
                            <Box p={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <LanguagesView supportedLanguages={item?.supportedLanguages?.map(el => el.code)} />
                                </Box>
                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                    <FavoriteStoresButton
                                        storeCode={item?.code}
                                        isFavorite={!!dataFavorite?.find(el => el.code === item?.code)}
                                    />

                                    <ShareButton
                                        path={`${item?.webUrl}/catalog/${item?.code}/${item?.name
                                            ?.toLowerCase()
                                            .replaceAll(' ', '-')}`}
                                        text=""
                                        isShown={true}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </CardItem>
                </Grid>
            ))}
        </Grid>
    );
};

export default StoreCards;
