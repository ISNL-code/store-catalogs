import InfoDialog from 'components/organisms/Modals/InfoDialog';
import { HOME_ROUTE, LOGIN_ROUTE, STORE_ROUTE } from 'constants/routes';
import { useNavigate } from 'react-router-dom';
import { STORE_CONFIG } from 'store_constants/stores_config';

const SuccessPasswordChange = ({ isOpen, string }) => {
    const navigate = useNavigate();
    const { REQUIRED_REGISTRATION, OPTIONS, STORE_CODE } = STORE_CONFIG;
    if (!isOpen) return null;

    return (
        <>
            <InfoDialog
                variant="success"
                link={null}
                string={string}
                onClose={() => {
                    if (REQUIRED_REGISTRATION) {
                        navigate(LOGIN_ROUTE?.root(STORE_CODE, 'login'));
                    } else if (OPTIONS?.HOME_PAGE_ACTIVE) {
                        navigate(HOME_ROUTE?.root(STORE_CODE));
                    } else navigate(STORE_ROUTE?.root(STORE_CODE));
                }}
                title={null}
                fullWidth
                onSubmit={() => {
                    if (REQUIRED_REGISTRATION) {
                        navigate(LOGIN_ROUTE?.root(STORE_CODE, 'login'));
                    } else if (OPTIONS?.HOME_PAGE_ACTIVE) {
                        navigate(HOME_ROUTE?.root(STORE_CODE));
                    } else navigate(STORE_ROUTE?.root(STORE_CODE));
                }}
                description={string?.password_changed}
                closeAvailable
                component="success request"
            />
        </>
    );
};

export default SuccessPasswordChange;
