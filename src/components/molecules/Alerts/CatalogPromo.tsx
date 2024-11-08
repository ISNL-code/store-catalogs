import { Alert, Box, Collapse, IconButton } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { Login as LoginIcon } from '@mui/icons-material';

import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { CatalogContextInterface } from 'types/outlet_context_models';
import { DialogWindowType } from 'layouts/hooks/useFormsApp';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { Color } from 'constants/colors';
import { AppAlertNameType } from 'store_constants/types';

const CatalogPromoAlert = () => {
    const { ALERTS } = STORE_CONFIG;
    const [open, setOpen] = useState(true); //eslint-disable-line
    const { sx } = useDevice();
    const { string, handleOpenDialog, auth }: CatalogContextInterface = useOutletContext();

    if (!ALERTS?.some(alert => alert?.name === AppAlertNameType?.REGISTRATION) || auth) return null;

    return (
        <Collapse in={open}>
            <Box
                mb={2}
                sx={{
                    animation: `filter 1000ms linear infinite`,
                    '@keyframes filter': {
                        '0%': { filter: 'sepia(0%)' },
                        '20%': { filter: 'sepia(20%)' },
                        '40%': { filter: 'sepia(50%)' },
                        '60%': { filter: 'sepia(30%)' },
                        '80%': { filter: 'sepia(10%)' },
                        '100%': { filter: 'sepia(0%)' },
                    },
                }}
            >
                <Alert
                    variant="filled"
                    severity="info"
                    sx={{
                        fontSize: sx ? 14 : 18,
                        background: Color?.SUCCESS,
                    }}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                handleOpenDialog(DialogWindowType.REGISTER);
                            }}
                        >
                            <LoginIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {string?.registration_promo}
                </Alert>
            </Box>
        </Collapse>
    );
};

export default CatalogPromoAlert;
