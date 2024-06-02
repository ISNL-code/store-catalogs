import ConfirmDialog from 'components/organisms/Modals/ConfirmDialog';
import { STORAGE_KEYS } from 'constants/local_storage_keys';
import { removeStorageItem } from 'utils/storageUtils';

interface Props {
    setApiToken?: (token: string | null) => void;
    isOpen;
    setIsOpen;
    string;
    setAuth;
}

export default function Logout({ isOpen, setIsOpen, string, setAuth, setApiToken }: Props) {
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
                    removeStorageItem(STORAGE_KEYS?.ACCESS_TOKEN_KEY)
                        .then(() => {
                            setAuth(false);
                            setApiToken && setApiToken(null);
                            setIsOpen(null);
                        })
                        .catch(error => {
                            console.error('Error removing access token:', error);
                        });
                }}
                description={string?.do_want_to_logout}
                closeAvailable
            />
        </>
    );
}
