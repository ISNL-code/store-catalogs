import { ACCESS_TOKEN_KEY } from 'constants/constants';
import ModalWindow from 'components/atoms/ModalWindow/ModalWindow';
import { Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function Logout({ setAuth, string, close }) {
    const navigate = useNavigate();
    const { storeCode, storeName } = useParams();

    return (
        <>
            <ModalWindow
                type={'warning'}
                title={string?.logout}
                text={string?.do_want_to_logout}
                closeAction={() => close()}
            >
                <Box mt={3} pb={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            close();
                        }}
                    >
                        {string?.cancel}
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => {
                            localStorage.removeItem(ACCESS_TOKEN_KEY);
                            setAuth(false);
                            close();
                            navigate(`/catalog/${storeCode}/${storeName}`);
                        }}
                    >
                        {string?.logout}
                    </Button>
                </Box>
            </ModalWindow>
        </>
    );
}
