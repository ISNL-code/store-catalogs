import { Box, Divider, Tooltip, Typography } from '@mui/material';
import Card from 'components/atoms/Sections/Card';
import Image from 'components/atoms/Media/Image';
import FavoriteStoresButton from 'components/molecules/ToolsButtons/FavoriteStoresButton';
import ShareButton from 'components/molecules/ToolsButtons/ShareButton';
import { WEB_URL } from 'constants/constants';

import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import { CatalogContextInterface } from 'types';

const StoreCard = ({
    logo,
    imgUrl,
    name,
    description,
    storeId,
    locked,
    setStoreToApprove,
    storeCode,
    isFavorite,
    supportedLanguages,
}) => {
    const { xs, m, mx, ls } = useDevice();
    const navigate = useNavigate();
    const { string, setOpenModalType }: CatalogContextInterface = useOutletContext();
    const checkStoreAuth = () => {
        if (locked) {
            setOpenModalType('enter-store-key');
            setStoreToApprove({ code: storeCode, id: storeId, name });
            return false;
        } else return true;
    };

    const getWidth = () => {
        if (xs) return '100%'; //475
        if (m) return '49%'; //900
        if (mx) return '32.5%'; //1080
        if (ls) return '32.5%'; //1240
        return '24.5%';
    };

    return (
        <Card
            bottomButtons={[
                <FavoriteStoresButton storeCode={storeCode} isFavorite={isFavorite} />,
                <ShareButton
                    path={`${WEB_URL}/catalog/${storeCode}/${name?.toLowerCase().replaceAll(' ', '-')}`}
                    text=""
                    isShown={true}
                />,
            ]}
            topRightButtons={[]}
            bottomLeftButtons={[]}
            getWidth={getWidth}
        >
            <Box
                sx={{ display: 'flex', cursor: 'pointer', backgroundColor: '#fff' }}
                onClick={() => {
                    const approved = checkStoreAuth();
                    if (!approved) return;
                    navigate(`/catalog/${storeCode}/${name.toLowerCase().replaceAll(' ', '-')}`);
                }}
            >
                <Box sx={{ width: '70%' }}>
                    <Image width={4} height={3} imgUrl={imgUrl} padding="0" />
                </Box>

                <Box
                    sx={{
                        width: '30%',
                        borderLeft: '1px solid #00000013',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                    }}
                >
                    <Image width={1} height={1} imgUrl={logo} padding="0" />
                </Box>
            </Box>

            <Box p={1.25} pt={1} sx={{ backgroundColor: '#f8f8f8', borderTop: '1px solid #00000013' }}>
                <Typography
                    variant="h4"
                    sx={{
                        height: '25px',
                        fontWeight: 600,
                    }}
                >
                    {name}
                </Typography>

                <Typography variant="h4" sx={{ color: 'grey', height: '25px' }}>
                    {description}
                </Typography>
                <Divider sx={{ mx: -2, mb: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
                    <Typography variant="h4" sx={{ color: 'grey' }}>
                        {string?.languages}:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {supportedLanguages
                            .sort((a, b) => b.localeCompare(a))
                            .map(el => (
                                <Tooltip key={el} title={el}>
                                    <Box
                                        sx={{
                                            borderRadius: '50%',
                                            boxShadow: '0 0 3px 0.5px #00000045',
                                            height: 26,
                                            width: 26,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#ccc',
                                        }}
                                    >
                                        <>
                                            {el === 'ua' && (
                                                <img
                                                    style={{ height: 28 }}
                                                    src={require(`assets/img/flags/ua.png`)}
                                                    alt="Broken Img"
                                                />
                                            )}
                                            {el === 'pl' && (
                                                <img
                                                    style={{ height: 28 }}
                                                    src={require(`assets/img/flags/pl.png`)}
                                                    alt="Broken Img"
                                                />
                                            )}
                                            {el === 'cz' && (
                                                <img
                                                    style={{ height: 28 }}
                                                    src={require(`assets/img/flags/cz.png`)}
                                                    alt="Broken Img"
                                                />
                                            )}
                                            {el === 'en' && (
                                                <img
                                                    style={{ height: 28 }}
                                                    src={require(`assets/img/flags/en.png`)}
                                                    alt="Broken Img"
                                                />
                                            )}
                                            {el === 'ru' && (
                                                <img
                                                    style={{ height: 28 }}
                                                    src={require(`assets/img/flags/ru.png`)}
                                                    alt="Broken Img"
                                                />
                                            )}
                                        </>
                                    </Box>
                                </Tooltip>
                            ))}
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

export default StoreCard;
