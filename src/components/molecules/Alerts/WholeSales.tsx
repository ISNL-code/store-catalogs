import { Alert, Box, Collapse } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { CatalogContextInterface } from 'types/outlet_context_models';

export default function WholeSalesAlert() {
    const { OPTIONS } = STORE_CONFIG;
    const [open, setOpen] = useState(true); //eslint-disable-line
    const { sx } = useDevice();
    const { string }: CatalogContextInterface = useOutletContext();

    if (OPTIONS?.MIN_ITEMS_TO_BUY <= 1) return null;

    return (
        <Collapse in={open}>
            <Box mb={2}>
                <Alert variant="standard" severity="info" color="warning" sx={{ fontSize: sx ? 14 : 18 }}>
                    {string?.wholesales_ordering_limitation_message}
                </Alert>
            </Box>
        </Collapse>
    );
}
