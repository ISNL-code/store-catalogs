import ModalWindow from 'components/atoms/ModalWindow/ModalWindow';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { STORE_CONFIG } from 'constants/stores_config';

export default function Logout({ setAuth, string, close }) {
    const { ACCESS_TOKEN_KEY, STORE_NAME, STORE_CODE } = STORE_CONFIG;
    const navigate = useNavigate();

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
                            navigate(`/catalog/${STORE_CODE}/${STORE_NAME}`);
                        }}
                    >
                        {string?.logout}
                    </Button>
                </Box>
            </ModalWindow>
        </>
    );
}
