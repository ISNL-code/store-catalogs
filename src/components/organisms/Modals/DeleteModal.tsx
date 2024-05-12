import { Box, Button } from '@mui/material';
import ModalWindow from 'components/atoms/ModalWindow/ModalWindow';

export default function DeleteModal({ string, close, text, action, title }) {
    return (
        <>
            <ModalWindow type={'warning'} title={title} text={text} closeAction={() => close()}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            action();
                            close();
                        }}
                    >
                        {string?.clear}
                    </Button>
                </Box>
            </ModalWindow>
        </>
    );
}
