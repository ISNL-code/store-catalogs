import InfoDialog from 'components/organisms/Modals/InfoDialog';
import { LOGIN_ROUTE, STORE_ROUTE } from 'constants/routes';
import { useNavigate } from 'react-router-dom';
import { STORE_CONFIG } from 'store_constants/stores_config';

const SomethingWentWrong = ({ isOpen, setIsOpen, string, location }) => {
    const { STORE_CODE } = STORE_CONFIG;
    const navigate = useNavigate();
    if (!isOpen) return null;

    return (
        <>
            <InfoDialog
                variant="error"
                link={null}
                string={string}
                onClose={() => {
                    setIsOpen(null);
                    navigate(LOGIN_ROUTE?.root(STORE_CODE, 'login'));
                }}
                title={null}
                fullWidth
                onSubmit={() => {}}
                description={string?.something_went_wrong}
                closeAvailable
                component="bad request"
            />
        </>
    );
};

export default SomethingWentWrong;
