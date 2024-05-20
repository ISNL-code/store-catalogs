import InfoDialog from 'components/organisms/Modals/InfoDialog';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';

const SuccessMailSent = ({ isOpen, setIsOpen, string, location }) => {
    if (!isOpen) return null;

    return (
        <>
            <InfoDialog
                variant="success"
                link={null}
                string={string}
                onClose={() => {
                    setIsOpen(DialogWindowType?.LOGIN);
                }}
                title={null}
                fullWidth
                onSubmit={() => {}}
                description={string?.an_email_with_a_link_has_been_sent_to_your_email}
                closeAvailable
                component="success request"
            />
        </>
    );
};

export default SuccessMailSent;
