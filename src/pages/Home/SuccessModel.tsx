import { Box, Button } from '@mui/material';
import ModalWindow from 'components/atoms/ModalWindow/ModalWindow';
import { useOutletContext } from 'react-router-dom';
import { StoresContextInterface } from 'types';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SuccessModel = ({ setOpenModal }) => {
    const { string }: StoresContextInterface = useOutletContext();

    return (
        <ModalWindow
            type={'success'}
            title={string?.request_sended_successfully}
            closeAction={() => {
                setOpenModal(false);
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 100 }} color="success" />
            </Box>
            <Box my={1} mt={3} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                <Button variant="contained" onClick={() => setOpenModal(false)}>
                    {string?.close}
                </Button>
            </Box>
        </ModalWindow>
    );
};

export default SuccessModel;
