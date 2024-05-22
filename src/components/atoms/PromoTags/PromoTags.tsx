import { Box, Typography } from '@mui/material';
import { Colors } from 'colors';
import { useOutletContext } from 'react-router-dom';
import { ViewModeType } from 'store_constants/types';
import { CatalogContextInterface } from 'types';

const PromoTags = ({ value, action = () => {}, disabled = false, code, adaptive = false }) => {
    const { viewMode }: CatalogContextInterface = useOutletContext();

    const generateBorderStyle = (
        color,
        gradientColor1,
        gradientColor2,
        borderGradientColor1,
        borderGradientColor2
    ) => ({
        border: viewMode === ViewModeType?.grid_m && adaptive ? `1px solid ${color}` : `2px solid ${color}`,
        background: `linear-gradient(135deg, ${gradientColor1} 60%, ${gradientColor2}) padding-box, 
                     linear-gradient(90deg, ${borderGradientColor1} 70%, ${borderGradientColor2}) border-box`,
        fontSize: code.includes('%') ? 12 : undefined,
    });

    const getStyles = () => {
        switch (code.toLowerCase()) {
            case 'new':
                return generateBorderStyle('#35b60d', '#268609', '#baddb0', '#0d6e0ddc', '#87ce7d');
            case 'top':
                return generateBorderStyle('#b6590d', '#f08710', '#e9ddcf', '#df7127dc', '#f5d3b8');
            case 'winter':
                return generateBorderStyle('#0084d1', '#3975f7', '#e9cfcf', '#084c99dc', '#b8d0f5');
            case 'autumn':
                return generateBorderStyle('#dbd06d', '#e2ad1a', '#f5b8b8', '#997e08dc', '#eaf5b8');
            case 'spring':
                return generateBorderStyle('#46b406', '#53bb17', '#b0dba1', '#216606dc', '#8ee079');
            default:
                return generateBorderStyle('#b60dae', '#b60dae', '#cfd2e9', '#b60dae', '#b8bcf5');
        }
    };

    return (
        <Box
            px={0.5}
            py={1.15}
            sx={{
                height: viewMode === ViewModeType?.grid_m && adaptive ? 18 : 25,
                maxWidth: viewMode === ViewModeType?.grid_m && adaptive ? 55 : 75,
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
                cursor: disabled ? 'default' : 'pointer',
                ...getStyles(),
            }}
            onClick={!disabled ? action : undefined}
        >
            <Typography
                sx={{
                    color: Colors?.WHITE,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: viewMode === ViewModeType?.grid_m && adaptive ? 9 : 11,
                    cursor: 'default',
                    fontWeight: 700,
                    lineHeight: 1,
                }}
            >
                {value || '----'}
            </Typography>
        </Box>
    );
};

export default PromoTags;
