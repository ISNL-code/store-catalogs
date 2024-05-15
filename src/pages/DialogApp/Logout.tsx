import { useNavigate } from 'react-router-dom';
import { STORE_CONFIG } from 'store_constants/stores_config';
import ConfirmDialog from 'components/organisms/Modals/ConfirmDialog';

export default function Logout({ isOpen, setIsOpen, string, location, setAuth }) {
    const { ACCESS_TOKEN_KEY } = STORE_CONFIG;
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <>
            <ConfirmDialog
                variant="warning"
                string={string}
                onClose={() => {
                    setIsOpen(null);
                }}
                title={string?.logout}
                fullWidth
                buttons={[
                    {
                        type: 'close',
                        action: () => {
                            setIsOpen(null);
                        },
                    },
                    { type: 'submit' },
                ]}
                onSubmit={() => {
                    localStorage.removeItem(ACCESS_TOKEN_KEY);
                    navigate(location);
                    setAuth(false);
                    setIsOpen(null);
                }}
                description={string?.do_want_to_logout}
                closeIcon
            />
        </>
    );
}
