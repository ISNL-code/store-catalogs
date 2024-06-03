import { Fab, Modal, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { AppleIcon } from 'assets/svg/apple_icon';
import { useDevice } from 'hooks/useDevice';

const SaveToHomeScreen = () => {
    const { sx } = useDevice();
    const [modalOpen, setModalOpen] = useState(false);

    function addToHomeScreen() {
        if (navigator && navigator['standalone']) {
            alert('Это приложение уже добавлено на главный экран.');
        } else if (window.matchMedia('(display-mode: standalone)').matches) {
            alert('Это приложение уже открыто в полноэкранном режиме.');
        } else if (window.navigator['standalone'] === undefined) {
            alert('Пожалуйста, добавьте это приложение на главный экран вашего устройства.');
        } else {
            setModalOpen(true);
        }
    }

    return (
        <>
            <Fab
                size="medium"
                sx={{
                    zIndex: 50,
                    position: 'fixed',
                    left: sx ? '80px' : '40px',
                    bottom: sx ? 80 : 16,
                    backgroundColor: '#ffffffbe',
                }}
                onClick={addToHomeScreen}
            >
                <AppleIcon />
            </Fab>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="instruction-modal"
                aria-describedby="instruction-modal-description"
            >
                <div>
                    <Typography id="instruction-modal" variant="h6">
                        Как добавить приложение на главный экран
                    </Typography>
                    <Typography id="instruction-modal-description" sx={{ mt: 2 }}>
                        Инструкции по добавлению вашего приложения на главный экран могут различаться в зависимости от
                        браузера и операционной системы вашего устройства. Пожалуйста, следуйте инструкциям, чтобы
                        добавить это приложение на главный экран вашего устройства.
                    </Typography>
                    <Button sx={{ mt: 2 }} onClick={() => setModalOpen(false)}>
                        Закрыть
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default SaveToHomeScreen;
