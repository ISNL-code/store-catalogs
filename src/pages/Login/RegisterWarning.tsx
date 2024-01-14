import { Box, Button } from '@mui/material';
import ModalWindow from 'components/atoms/ModalWindow/ModalWindow';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

const RegisterWarning = ({ string, setOpenModalType, close }) => {
    const { storeCode, storeName } = useParams();
    const navigate = useNavigate();
    return (
        <ModalWindow
            type={'warning'}
            title={string?.you_need_to_login}
            text={string?.in_order_to_use_this_option_you_must_log_in_or_register}
            closeAction={() => {
                navigate(storeCode ? `/catalog/${storeCode}/${storeName}` : '/');
                close();
            }}
        >
            <Box mt={1} pb={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        navigate(storeCode ? `/catalog/${storeCode}/${storeName}` : '/');
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
