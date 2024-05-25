import { Box, Typography } from '@mui/material';

interface Props {
    size: number;
    action?: () => void;
    label: string;
    disabled?: boolean;
    selected?: boolean;
    table?: boolean;
}

const SizesIndicatorButton = ({
    size,
    action = () => {},
    label,
    disabled = false,
    selected = false,
    table = false,
}: Props) => {
    return (
        <Box
            sx={{
                width: 'fit-content',
                minWidth: size,
                height: size,
                border: '1px solid #ccc',
                background: selected
                    ? `linear-gradient(135deg, #54a121 60%, #ffffff) padding-box 90%, linear-gradient(90deg, #a7a7a7, #dbdbdb) border-box`
                    : disabled
                    ? `linear-gradient(135deg, #e9e9e9 50%, #ffffff) padding-box 90%, linear-gradient(90deg, #a7a7a7, #dbdbdb) border-box`
                    : `linear-gradient(135deg, #a8d5ff 40%, #ffffff) padding-box 90%, linear-gradient(90deg, #a7a7a7, #dbdbdb) border-box`,
                borderRadius: table ? 0 : 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: disabled ? 'default' : 'pointer',
            }}
            onClick={() => {
                if (disabled) return;
                action();
            }}
        >
            <Typography sx={{ color: selected ? '#fff' : '#4b4b4b', fontWeight: 700 }}>{label}</Typography>
        </Box>
    );
};

export default SizesIndicatorButton;
