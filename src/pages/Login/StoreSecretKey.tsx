import { Box, TextField, Typography } from '@mui/material';
import { useStoresApi } from 'api/useStoresApi';
import ModalWindow from 'components/atoms/ModalWindow/ModalWindow';
import { useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

const StoreSecretKey = ({ string, setOpenModalType, close, storeToApprove }) => {
    const [storeKey, setStoreKey] = useState('');
    const [validate, setValidate] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const enterStoreKey = useStoresApi().useEnterStoreKey;

    return (
        <ModalWindow
            type={''}
            title={string?.enter_store_key}
            text={string?.this_catalog_is_private_in_order_to_enter_you_must_enter_the_key}
            actionTitle={string?.approve}
            secondaryTitle={string?.close}
            secondaryAction={() => {
                close();
            }}
            closeAction={() => {
                close();
            }}
            primaryAction={() => {
                setValidate(true);

                if (!storeKey.length) return;
                const valid = enterStoreKey({ storeKey, storeCode: storeToApprove.code });

                if (!valid) return setError(string?.wrong_key);

                navigate(`/catalog/${storeToApprove.code}/${storeToApprove.name.toLowerCase().replaceAll(' ', '-')}`);
            }}
        >
            <Box mt={1}>
                {error && (
                    <Box mt={1} sx={{ width: '100%', textAlign: 'center' }}>
                        <Typography variant="body1" sx={{ color: 'red' }}>
                            {error}
                        </Typography>
                    </Box>
                )}
                <TextField
                    size="small"
                    onChange={e => {
                        setStoreKey(e.target.value);
                    }}
                    value={storeKey}
                    margin="dense"
                    id="name"
                    label={string?.store_key}
                    fullWidth
                    variant="outlined"
                    sx={{
                        '& label': {
                            color: '#898B9B',
                        },
                    }}
                    error={validate && !storeKey.length}
                    helperText={validate && (storeKey.length < 1 ? string?.enter_email : '')}
                />
            </Box>
        </ModalWindow>
    );
};

export default StoreSecretKey;
