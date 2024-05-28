import TableSizeDialog from 'components/organisms/Modals/TableSizeDialog';
import { DialogStateInterface } from 'types';

interface Props {
    isOpen: boolean;
    setIsOpen;
    string;
    dialogState?: DialogStateInterface | null;
}

const TableSizeWindow = ({ isOpen, setIsOpen, string, dialogState }: Props) => {
    if (!isOpen) return null;

    return (
        <>
            <TableSizeDialog
                string={string}
                onClose={() => {
                    setIsOpen(null);
                }}
                onSubmit={() => {
                    setIsOpen(null);
                }}
                closeAvailable
                dialogState={dialogState}
            />
        </>
    );
};

export default TableSizeWindow;
