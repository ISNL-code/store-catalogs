import { Box } from '@mui/material';
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
            primaryAction={() => {
                setOpenModalType('login');
            }}
            actionTitle={string?.login}
            secondaryTitle={string?.cancel}
            secondaryAction={() => {
                navigate(storeCode ? `/catalog/${storeCode}/${storeName}` : '/');
                close();
            }}
            closeAction={() => {
                navigate(storeCode ? `/catalog/${storeCode}/${storeName}` : '/');
                close();
            }}
        >
            <></>
        </ModalWindow>
    );
};

export default RegisterWarning;
