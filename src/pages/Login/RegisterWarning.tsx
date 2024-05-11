import { Box, Button } from '@mui/material';
import ModalWindow from 'components/atoms/ModalWindow/ModalWindow';
import { STORE_CONFIG } from 'constants/stores_config';
import { useNavigate, useParams } from 'react-router-dom';

const RegisterWarning = ({ string, setOpenModalType, close }) => {
    const { STORE_NAME, STORE_CODE } = STORE_CONFIG;
    const { modelSku } = useParams();
    const navigate = useNavigate();
    return (
        <ModalWindow
            type={'warning'}
            title={string?.you_need_to_login}
            text={string?.in_order_to_use_this_option_you_must_log_in_or_register}
            closeAction={() => {
                if (modelSku) return close();
                navigate(STORE_CODE ? `/catalog/${STORE_CODE}/${STORE_NAME}` : '/');
                close();
            }}
        >
            <Box mt={1} pb={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        if (modelSku) return close();
                        navigate(STORE_CODE ? `/catalog/${STORE_CODE}/${STORE_NAME}` : '/');
                        close();
                    }}
                >
                    {string?.cancel}
                </Button>

                <Button variant="contained" onClick={() => setOpenModalType('login')}>
                    {string?.login}
                </Button>
            </Box>
        </ModalWindow>
    );
};

export default RegisterWarning;
