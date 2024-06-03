import InfoDialog from 'components/organisms/Modals/InfoDialog';

const AppInformationModal = ({ isOpen, setIsOpen, string }) => {
    if (!isOpen) return null;

    return (
        <>
            <InfoDialog
                variant="info"
                link={null}
                string={string}
                onClose={() => {
                    setIsOpen(null);
                }}
                title={string?.useful_information}
                fullWidth
                onSubmit={() => {
                    setIsOpen(null);
                }}
                description={null}
                closeAvailable
                component="content"
                content={[{ title: string?.save_to_phone, description: string?.save_to_phone_instruction }]}
            />
        </>
    );
};

export default AppInformationModal;
