import TableSizeDialog from 'components/organisms/Modals/TableSizeDialog';
import { Dispatch, SetStateAction } from 'react';
import { DialogStateInterface } from 'types/app_models';

interface Props {
    isOpen: boolean;
    setIsOpen;
    string;
    dialogState?: DialogStateInterface | null;
    handleSetDialogState: Dispatch<SetStateAction<DialogStateInterface | null>>;
}

const TableSizeWindow = ({ isOpen, setIsOpen, string, dialogState, handleSetDialogState }: Props) => {
    if (!isOpen) return null;

    return (
        <>
            <TableSizeDialog
                string={string}
                onClose={() => {
                    setIsOpen(null);
                    handleSetDialogState(null);
                }}
                onSubmit={() => {
                    setIsOpen(null);
                    handleSetDialogState(null);
                }}
                closeAvailable
                dialogState={dialogState}
            />
        </>
    );
};

export default TableSizeWindow;
