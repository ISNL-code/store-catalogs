import ConfirmDialog from 'components/organisms/Modals/ConfirmDialog';

export default function ClearCartConfirm({ isOpen, setIsOpen, string, cart }) {
    if (!isOpen) return null;

    return (
        <>
            <ConfirmDialog
                variant="warning"
                string={string}
                onClose={() => {
                    setIsOpen(null);
                }}
                title={string?.clear_cart}
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
                    cart?.handleClearCart();
                }}
                description={null}
                closeAvailable
            />
        </>
    );
}
