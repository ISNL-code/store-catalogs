import InfoDialog from 'components/organisms/Modals/InfoDialog';

const SuccessWindow = ({ isOpen, setIsOpen, string, location }) => {
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
                onSubmit={() => {}}
                description={string?.request_sended_successfully}
                closeIcon
                component="success request"
            />
        </>
    );
};

export default SuccessWindow;
