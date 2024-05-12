import { Box, Button } from '@mui/material';
import ModalWindow from 'components/atoms/ModalWindow/ModalWindow';
import { useOutletContext } from 'react-router-dom';

export default function ConfirmOrderModal({ close = () => {}, text = '', action = () => {}, title = '' }) {
    const { string }: any = useOutletContext();
    return (
        <>
            <ModalWindow type={'warning'} title={title} text={text} closeAction={() => close()}>
                <Box mt={2} px={2} pb={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            action();
                            close();
                        }}
                    >
                        {string?.retail_catalog}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            close();
                        }}
                    >
                        {string?.add_more}
                    </Button>
                </Box>
            </ModalWindow>
        </>
    );
}
