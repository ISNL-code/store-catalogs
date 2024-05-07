import { Box, Typography } from '@mui/material';

const PromoTags = ({ value, size, selected = false, action = () => {}, disabled = false, code }) => {
    const getStyles = label => {
        if (selected) {
            if (code.toLowerCase() === 'new')
                return {
                    border: '2px solid #35b60d',
                    background: `linear-gradient(135deg, #268609 60%, #baddb0) padding-box, linear-gradient(90deg, #0d6e0ddc 70%, #87ce7d) border-box`,
                    color: 'white',
                    fontWeight: 700,
                };
            if (code.toLowerCase() === 'top')
                return {
                    border: '2px solid #b6590d',
                    background: `linear-gradient(135deg, #f08710 60%, #e9ddcf) padding-box, linear-gradient(90deg, #df7127dc 70%, #f5d3b8) border-box`,
                    color: 'white',
                    fontWeight: 700,
                };
            if (code.includes('%'))
                return {
                    border: '2px solid #d1000a',
                    background: `linear-gradient(135deg, #f73939 60%, #e9cfcf) padding-box, linear-gradient(90deg, #990808dc 70%, #f5b8b8) border-box`,
                    color: 'white',
                    fontWeight: 700,
                    fontSize: 12,
                };
            if (code.toLowerCase() === 'winter')
                return {
                    border: '2px solid #0084d1',
                    background: `linear-gradient(135deg, #3975f7 60%, #e9cfcf) padding-box, linear-gradient(90deg, #084c99dc 70%, #b8d0f5) border-box`,
                    color: 'white',
                    fontWeight: 700,
                };
            if (code.toLowerCase() === 'autumn')
                return {
                    border: '2px solid #867901',
                    background: `linear-gradient(135deg, #e2ad1a 60%, #e9cfcf) padding-box, linear-gradient(90deg, #997e08dc 70%, #eaf5b8) border-box`,
                    color: 'white',
                    fontWeight: 700,
                };
            if (code.toLowerCase() === 'spring')
                return {
                    border: '2px solid #46b406',
                    background: `linear-gradient(135deg, #53bb17 60%, #b0dba1) padding-box, linear-gradient(90deg, #216606dc 70%, #8ee079) border-box`,
                    color: 'white',
                    fontWeight: 700,
                };
            return {
                border: '2px solid #b60dae',
                background: `linear-gradient(135deg, #b60dae 60%, #cfd2e9) padding-box, linear-gradient(90deg, #b60dae 70%, #b8bcf5) border-box`,
                color: 'white',
                fontWeight: 700,
            };
        } else {
            return {
                border: '1.5px solid #626660',
                background: `linear-gradient(135deg, #d3d3d3 60%, #8b8b8b) padding-box, linear-gradient(90deg, #c2c2c2dc 70%, #a1a1a1) border-box`,
                color: 'white',
                fontWeight: 700,
            };
        }
    };

    return (
        <Box
            px={0.5}
            py={1.15}
            sx={{
                height: size,
                width: value ? 'auto' : 60,
                minWidth: 60,
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: disabled ? 'default' : 'pointer',
                ...getStyles(value),
            }}
            onClick={() => {
                if (disabled) return;
                action();
            }}
        >
            <Typography sx={{ color: selected ? 'inherit' : '#000', fontSize: 12, fontWeight: 700 }}>
                {value ? value : '----'}
            </Typography>
        </Box>
    );
};

export default PromoTags;
