import { Box, Button, Typography } from '@mui/material';
import { useNavigate, useOutletContext } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CatalogContextInterface } from 'types/outlet_context_models';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { STORE_ROUTE } from 'router/routes';
import { useDevice } from 'hooks/useDevice';
import { Colors } from 'constants/colors';

const SuccessOrderingPage = ({ isShown = true, setSuccessOrdering }) => {
    const { sx } = useDevice();
    const { STORE_CODE } = STORE_CONFIG;
    const navigate = useNavigate();
    const { headerHeight, footerMenuHeight, string, cart, instrumentalBarHeight }: CatalogContextInterface =
        useOutletContext();

    if (isShown)
        return (
            <Box
                sx={{
                    height: sx
                        ? `calc(100vh - ${footerMenuHeight + headerHeight}px)`
                        : `calc(100vh  - ${headerHeight + instrumentalBarHeight}px)`,
                    width: '100vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: sx
                        ? `url(${require('assets/img/success_order_mob.webp')})`
                        : `url(${require('assets/img/success_order.webp')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    left: 0,
                    top: 0,
                }}
            >
                <Box
                    p={2}
                    sx={{
                        position: 'relative',
                        width: 400,
                        maxWidth: '80%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        backgroundColor: Colors?.WHITE,
                        borderRadius: 4,
                        boxShadow: Colors?.SHADOW,
                        opacity: 0.97,
                    }}
                >
                    <CheckCircleOutlineIcon sx={{ fontSize: 100 }} color="success" />
                    <Typography variant="h3" sx={{ mt: 1 }}>
                        {string?.order_sent_successfully}
                    </Typography>
                    <Typography variant="h4" sx={{ textAlign: 'center', mt: 1 }}>
                        {string?.manger_will_contact_message}
                    </Typography>
                    <Button
                        sx={{ mt: 2 }}
                        onClick={() => {
                            if (cart?.cartItems?.length) {
                                setSuccessOrdering(false);
                            } else {
                                navigate(STORE_ROUTE?.root(STORE_CODE));
                            }
                        }}
                    >
                        {string?.back_to_shopping}
                    </Button>
                </Box>
            </Box>
        );
    return null;
};

export default SuccessOrderingPage;
