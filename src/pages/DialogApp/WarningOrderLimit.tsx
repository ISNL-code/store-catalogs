import InfoDialog from 'components/organisms/Modals/InfoDialog';

const WarningOrderLimit = ({ isOpen, setIsOpen, string }) => {
    if (!isOpen) return null;

    return (
        <>
            <InfoDialog
                variant="error"
                link={null}
                string={string}
                onClose={() => {
                    setIsOpen(null);
                }}
                title={null}
                fullWidth
                onSubmit={() => {
                    setIsOpen(null);
                }}
                description={string?.wholesales_ordering_limitation_message}
                closeAvailable
                component="warning ordering"
                content={null}
            />
        </>
    );
};

export default WarningOrderLimit;
