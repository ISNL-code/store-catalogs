import InfoDialog from 'components/organisms/Modals/InfoDialog';

const SuccessRequest = ({ isOpen, setIsOpen, string }) => {
    if (!isOpen) return null;

    return (
        <>
            <InfoDialog
                variant="success"
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
                description={string?.request_sended_successfully}
                closeAvailable
                component="success request"
            />
        </>
    );
};

export default SuccessRequest;
