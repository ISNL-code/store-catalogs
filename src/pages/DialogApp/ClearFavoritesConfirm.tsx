import ConfirmDialog from 'components/organisms/Modals/ConfirmDialog';

export default function ClearFavoritesConfirm({ isOpen, setIsOpen, string, favorites }) {
    if (!isOpen) return null;

    return (
        <>
            <ConfirmDialog
                variant="warning"
                string={string}
                onClose={() => {
                    setIsOpen(null);
                }}
                title={string?.clear_favorites}
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
                    setIsOpen(null);
                    favorites?.handleClearFavorites();
                }}
                description={null}
                closeAvailable
            />
        </>
    );
}
