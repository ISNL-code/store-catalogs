import TableSizeDialog from 'components/organisms/Modals/TableSizeDialog';

const TableSizeWindow = ({ isOpen, setIsOpen, string }) => {
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
            />
        </>
    );
};

export default TableSizeWindow;
