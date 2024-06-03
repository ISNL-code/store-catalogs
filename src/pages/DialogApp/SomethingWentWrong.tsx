import InfoDialog from 'components/organisms/Modals/InfoDialog';
import { LOGIN_ROUTE } from 'router/routes';
import { useNavigate } from 'react-router-dom';
import { STORE_CONFIG } from 'store_constants/stores_config';

const SomethingWentWrong = ({ isOpen, setIsOpen, string }) => {
    const { STORE_CODE, REQUIRED_REGISTRATION } = STORE_CONFIG;
    const navigate = useNavigate();
    if (!isOpen) return null;

    return (
        <>
            <InfoDialog
                variant="error"
                link={null}
                string={string}
                onClose={() => {
                    if (REQUIRED_REGISTRATION) {
                        navigate(LOGIN_ROUTE?.root(STORE_CODE, 'login'));
                    } else {
                        setIsOpen(null);
                        navigate('/');
                    }
                }}
                title={null}
                fullWidth
                onSubmit={() => {
                    if (REQUIRED_REGISTRATION) {
                        navigate(LOGIN_ROUTE?.root(STORE_CODE, 'login'));
                    } else {
                        setIsOpen(null);
                        navigate('/');
                    }
                }}
                description={string?.something_went_wrong}
                closeAvailable
                component="bad request"
                content={null}
            />
        </>
    );
};

export default SomethingWentWrong;
