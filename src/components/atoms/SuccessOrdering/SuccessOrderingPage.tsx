import { Box, Button, Typography } from '@mui/material';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CatalogContextInterface } from 'types';

const SuccessOrderingPage = ({ isShown = true }) => {
    const { storeCode, storeName } = useParams();
    const navigate = useNavigate();
    const { instrumentalBarHeight, headerHeight, footerMenuHeight, string }: CatalogContextInterface =
        useOutletContext();

    if (isShown)
        return (
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    height: `calc(100vh - ${headerHeight}px - ${instrumentalBarHeight}px - ${footerMenuHeight}px - 200px)`,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    gap: 1,
                }}
            >
                <CheckCircleOutlineIcon sx={{ fontSize: 100 }} color="success" />
                <Typography variant="h3">{string?.order_sent_successfully}</Typography>
                <Button
                    onClick={() => {
                        navigate(`catalog/${storeCode}/${storeName}`);
                    }}
                >
                    {string?.back_to_shopping}
                </Button>
            </Box>
        );
    return null;
};

export default SuccessOrderingPage;
