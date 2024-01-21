import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, TextField } from '@mui/material';
import { useState } from 'react';

const AddButtons = () => {
    const [value, setValue] = useState(1);

    return (
        <Box sx={{ display: 'flex', gap: 1 }} my={1}>
            <Fab
                size="small"
                onClick={() => {
                    setValue(prev => {
                        return prev > 1 ? prev - 1 : prev;
                    });
                }}
            >
                <RemoveIcon />
            </Fab>
            <TextField
                value={value}
                size="small"
                sx={{
                    width: 65,
                }}
                InputProps={{
                    slotProps: {
                        input: { style: { textAlign: 'center' } },
                    },
                }}
            />
            <Fab
                size="small"
                onClick={() => {
                    setValue(prev => prev + 1);
                }}
            >
                <AddIcon />
            </Fab>
        </Box>
    );
};

export default AddButtons;
