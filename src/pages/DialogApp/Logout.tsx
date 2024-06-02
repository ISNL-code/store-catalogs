import { useNavigate } from 'react-router-dom';
import ConfirmDialog from 'components/organisms/Modals/ConfirmDialog';
import { STORAGE_KEYS } from 'constants/local_storage_keys';
import { removeStorageItem } from 'utils/storageUtils';

export default function Logout({ isOpen, setIsOpen, string, location, setAuth }) {
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
                    removeStorageItem(STORAGE_KEYS?.ACCESS_TOKEN_KEY, () => {});
                    navigate(location);
                    setAuth(false);
                    setIsOpen(null);
                }}
                description={string?.do_want_to_logout}
                closeAvailable
            />
        </>
    );
}
