import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface ExtraColorsButtonInterface {
    action;
    size;
    button?: boolean;
    sum: number;
}

const ExtraColorsButton = ({ action, size, button = false, sum }: ExtraColorsButtonInterface) => {
    return (
        <Box
            onClick={e => {
                if (!button) e.stopPropagation();
                action(e);
            }}
            sx={{
                cursor: 'pointer',
                border: `1px solid #474747`,
                background: `linear-gradient(135deg,  #464646 55%, #ffffff) padding-box, linear-gradient(90deg, #a3a3a3, #b8b8b8) border-box`,
                borderRadius: '50px',
                width: size,
                height: size,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography sx={{ color: '#ffffff', fontSize: '14px' }}>+{sum}</Typography>
        </Box>
    );
};

export default ExtraColorsButton;
